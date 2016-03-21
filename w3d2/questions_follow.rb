require_relative 'questions_database'
require_relative 'user'
class QuestionFollows
  def self.all
    results = QuestionsDatabase.instance.execute('SELECT * FROM question_follows')
    results.map { |result| QuestionFollows.new(result) }
  end

  def self.most_followed_question(n=1)
    followers_hash = QuestionsDatabase.instance.execute(<<-SQL, n)

      SELECT
        id, title, body, user_id
      FROM
      (
        SELECT
          COUNT(*), question_id
        FROM
          question_follows
        JOIN
          questions ON question_id = questions.id
        GROUP BY
          question_id
        ORDER BY
          COUNT(*) DESC
      ) AS question_count
      JOIN
        questions ON question_count.question_id = questions.id
      LIMIT
        ?

    SQL

    if followers_hash.empty?
      return nil
    end

    followers_hash.map { |result| Question.new(result) }
  end

  def self.find_by_id(input_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, input_id)
      SELECT
        *
      FROM
        question_follows
      WHERE
        id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    QuestionFollows.new(reply_hash[0])
  end

  def self.followers_for_question_id(question_id)
    followers_hash = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        *
      FROM
        question_follows
      JOIN users ON user_id = users.id
      WHERE
        question_id = ?
    SQL

    if followers_hash.empty?
      return nil
    end

    followers_hash.map { |result| User.new(result) }
  end

  def self.followed_questions_for_user_id(user_id)
    followers_hash = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        question_follows
      JOIN questions ON question_id = questions.id
      WHERE
        question_follows.user_id = ?
    SQL

    if followers_hash.empty?
      return nil
    end

    followers_hash.map { |result| Question.new(result) }
  end

  attr_accessor :id, :question_id, :user_id

  def initialize(options = {})
    @id = options['id']
    @question_id = options['question_id']
    @user_id = options['user_id']
  end

  def create
    raise 'already saved!' unless self.id.nil?
    QuestionsDatabase.instance.execute(<<-SQL, @question_id, @user_id)
      INSERT INTO
        question_follows(question_id, user_id)
      VALUES
        (?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end
end
