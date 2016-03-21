require_relative 'questions_database'
require_relative 'user'
class QuestionLikes
  def self.all
    results = QuestionsDatabase.instance.execute('SELECT * FROM question_likes')
    results.map { |result| QuestionLikes.new(result) }
  end

  def self.find_by_id(input_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, input_id)
      SELECT
        *
      FROM
        question_likes
      WHERE
        id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    QuestionLikes.new(reply_hash[0])
  end

  def self.likers_for_question_id(question_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        *
      FROM
        question_likes
      JOIN
        users ON user_id = users.id
      WHERE
        question_id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    reply_hash.map { |result| User.new(result) }
  end

  def self.num_likes_for_question_id(question_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        COUNT(*) AS num_of_likes
      FROM
        question_likes
      JOIN
        users ON user_id = users.id
      WHERE
        question_id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    reply_hash[0]['num_of_likes']
  end

  def self.liked_questions_for_user_id(user_id)
    reply_hash = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        question_likes
      JOIN
        questions ON question_id = questions.id
      WHERE
        question_likes.user_id = ?
    SQL

    if reply_hash.empty?
      return nil
    end

    reply_hash.map { |result| Question.new(result) }

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
        question_likes (question_id, user_id)
      VALUES
        (?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end
end
