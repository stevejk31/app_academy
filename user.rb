require_relative 'questions_database'

class User
  def self.all
    results = QuestionsDatabase.instance.execute('SELECT * FROM users')
    results.map { |result| User.new(result) }
  end

  def self.find_by_id(input_id)
    user_hash = QuestionsDatabase.instance.execute(<<-SQL, input_id)
      SELECT
        *
      FROM
        users
      WHERE
        id = ?
    SQL

    User.new(user_hash[0])
  end

  def self.find_by_name(input_fname = nil, input_lname = nil )
    input_fname ||= '%'
    input_lname ||= '%'
    user_hash = QuestionsDatabase.instance.execute(<<-SQL, :fname => input_fname, :lname => input_lname)
      SELECT
        *
      FROM
        users
      WHERE
        fname LIKE :fname AND lname LIKE :lname
    SQL
    user_hash.map { |result| User.new(result) }
  end

  attr_accessor :id, :fname, :lname

  def initialize(options = {})
    @id = options['id']
    @fname = options['fname']
    @lname = options['lname']
  end

  def create
    raise 'already saved!' unless self.id.nil?

    QuestionsDatabase.instance.execute(<<-SQL, @fname, @lname)
      INSERT INTO
        users (fname, lname)
      VALUES
        (?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  def authored_questions
    Question.find_by_author_id(@id)
  end

  def liked_questions
    QuestionLikes.liked_questions_for_user_id(@id)
  end
  

  def authored_replies
    Reply.find_by_user_id(@id)
  end

  def followed_questions
    QuestionFollows.followed_questions_for_user_id(@id)
  end
end
