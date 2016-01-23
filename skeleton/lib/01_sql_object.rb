require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    if @columns.nil?
      result = DBConnection.execute2(<<-SQL)
        SELECT
          *
        FROM
          #{self.table_name}
        LIMIT
          0
      SQL
      @columns = result[0].map {|column| column.to_sym}
    end
    @columns
  end


  def self.finalize!
    self.columns.each do |column|
      define_method("#{column}") do
        attributes[column]
      end
      define_method("#{column}=") do |variable|
        attributes[column] = variable
      end
    end
  end

  def self.table_name=(table_name)
    instance_variable_set("@table_name", table_name)
  end

  def self.table_name
    # name = self.to_s.split("").drop(2)
    # end_name = name.find_index(":")
    # name = name.take(end_name).push("s").join("").downcase
    # table_name ||= name
    if instance_variable_get("@table_name").nil?
      instance_variable_set("@table_name", self.to_s.tableize)
    end
    instance_variable_get("@table_name")
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT
        #{self.table_name}.*
      FROM
        #{self.table_name}
    SQL
    results
    self.parse_all(results)
  end

  def self.parse_all(results)
    results.map {|result| self.new(result)}
  end

  def self.find(id)
    return_obj = nil
    self.all.each do |obj|
      return_obj = obj if obj.id == id
    end
    return_obj
  end

  def initialize(params = {})
    @columns = self.class.columns
    params.each do |method, value|
      raise "unknown attribute '#{method}'" unless @columns.include?(method.to_sym)
      self.send("#{method}=", value)
    end
  end

  def attributes
    @attributes ||= {}
    @attributes
  end

  def attribute_values
    attributes.values
  end

  def insert
    temp_keys = attributes.keys.join(", ")
    value_id = ":" + attributes.keys.join(", :")
    DBConnection.execute(<<-SQL, attributes.values)
      INSERT INTO
        #{self.class.table_name} (#{temp_keys})
      VALUES
        (#{value_id})
    SQL
    attributes[:id] = DBConnection.last_insert_row_id
  end

  def update
    temp_keys = []
    attributes.keys.each do |key|
      temp_keys << "#{key} = :#{key}" unless key == :id
    end
    temp_keys = temp_keys.join(", ")
    DBConnection.execute(<<-SQL, attributes)
      UPDATE
        #{self.class.table_name}
      SET
      -- title = :title, body = :body, author_id = :author_id
        #{temp_keys}
      WHERE
        id = :id
    SQL
  end

  def save
    # unless self.id.nil?
    #   results = DBConnection.execute(<<-SQL)
    #     SELECT
    #       *
    #     FROM
    #       #{self.class.table_name}
    #     WHERE
    #       id = #{self.id}
    #   SQL
    # end
    if self.id.nil?
      insert
    else
      update
    end
  end
end
