require_relative 'questions_database'

class Question
  def self.all
    results = QuestionsDatabase.instance.execute('SELECT * FROM questions')
    results.map { |result| Question.new(result) }
  end

  def self.find_by_author_id(input_author_id)
    question_hash = QuestionsDatabase.instance.execute(<<-SQL, input_author_id)
      SELECT
        *
      FROM
        questions
      WHERE
        user_id = ?
    SQL

    question_hash.map { |result| Question.new(result) }
  end

  def self.find_by_id(input_id)
    question_hash = QuestionsDatabase.instance.execute(<<-SQL, input_id: input_id )
      SELECT
        *
      FROM
        questions
      WHERE
        id = :input_id
    SQL

    Question.new(question_hash[0])
  end

  def self.most_followed(n)
    QuestionFollows.most_followed_question(n)
  end

  attr_accessor :id, :title, :body, :user_id

  def initialize(options = {})
    @id = options['id']
    @title = options['title']
    @body = options['body']
    @user_id = options['user_id']
    # @id, @title = options.values_at('id', 'title')
  end

  def create
    raise 'already saved!' unless self.id.nil?
    QuestionsDatabase.instance.execute(<<-SQL, @title, @body, @user_id)
      INSERT INTO
        questions (title, body, user_id)
      VALUES
        (?, ?, ?)
    SQL

    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  def author
    User.find_by_id(@user_id)
  end
  def likers
    QuestionLikes.likers_for_question_id(@id)
  end
  def num_likes
    QuestionLikes.num_likes_for_question_id(@id)
  end
  

  def replies
    Reply.find_by_question_id(@id)
  end

  def followers
    QuestionFollows.followers_for_question_id(@id)
  end
end
