require "byebug"
class Replies < SuperModel
  attr_accessor :id, :subject_question, :parent_reply_id, :reply_author_id, :body

  def initialize(options)
    @id,
    @subject_question,
    @parent_reply_id,
    @reply_author_id,
    @body = options.values_at('id',
                              'subject_question',
                              'parent_reply',
                              'reply_author_id',
                              'body')
  end

  def self.find_by_question_id(subject_question)
    db = QuestionsDatabase.instance
    all = db.execute(<<-SQL, subject_question: subject_question)
      SELECT
        *
      FROM
        replies
      WHERE
        subject_question = :subject_question
    SQL

    all.map { |reply| Replies.new(reply) }
  end

  def self.find_by_reply_author_id(reply_author_id)
    db = QuestionsDatabase.instance
    all = db.execute(<<-SQL, reply_author_id: reply_author_id)
      SELECT
        *
      FROM
        replies
      WHERE
        reply_author_id = :reply_author_id
    SQL

    all.map { |reply| Replies.new(reply) }
  end

  def author
    Users.find_by_id(self.reply_author_id)
  end

  def question
    Question.find_by_id(self.subject_question)
  end

  def parent_reply
    Replies.find_by_id(self.parent_reply_id)
  end

  def child_replies
    db = QuestionsDatabase.instance
    all = db.execute(<<-SQL, id: self.id)
      SELECT
        *
      FROM
        replies
      WHERE
        parent_reply = :id
    SQL
    all.map { |reply| Replies.new(reply) }
  end


end
