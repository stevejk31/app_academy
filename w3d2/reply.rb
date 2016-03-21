require_relative 'questions_database'

class Reply
  def self.all
    results = QuestionsDatabase.instance.execute('SELECT * FROM replies')
    results.map { |result| Reply.new(result) }
  end

  attr_accessor :id, :question_id, :parent_reply_id, :user_id, :body

  def initialize(options = {})
    @id = options['id']
    @question_id = options['question_id']
    @parent_reply_id = options['parent_reply_id']
    @user_id = options['user_id']
    @body = options['body']
  end

  def create
    raise 'already saved!' unless self.id.nil?
    QuestionsDatabase.instance.execute(<<-SQL, @question_id, @parent_reply_id, @user_id, @body)
      INSERT INTO
        replies (question_id, parent_reply_id, user_id, body)
      VALUES
        (?, ?, ?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  def self.find_by_id(input_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, input_id)
      SELECT
        *
      FROM
        replies
      WHERE
        id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    Reply.new(reply_hash[0])
  end

  def self.find_by_user_id(input_user_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, input_user_id)
      SELECT
        *
      FROM
        replies
      WHERE
        user_id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    reply_hash.map { |result| Reply.new(result) }
  end

  def author
    User.find_by_id(@user_id)
  end

  def questions
    Question.find_by_question_id(@question_id)
  end

  def parent_reply
    return nil if @parent_reply_id.nil?
    Reply.find_by_id(@parent_reply_id)
  end

  def child_reply
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, @id)
      SELECT
        *
      FROM
        replies
      WHERE
        parent_reply_id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    reply_hash.map { |result| Reply.new(result) }
  end

  def self.find_by_question_id(input_question_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, input_question_id)
      SELECT
        *
      FROM
        replies
      WHERE
        question_id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    reply_hash.map { |result| Reply.new(result) }
  end
end
