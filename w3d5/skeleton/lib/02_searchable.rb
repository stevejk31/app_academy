require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
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
end

class SQLObject
  # Mixin Searchable here...
end
