require 'singleton'
require 'sqlite3'
require_relative 'question_like'
require_relative 'questions_follow'
require_relative 'reply'
require_relative 'user'
require_relative 'question'

class QuestionsDatabase < SQLite3::Database

  include Singleton

  def initialize
    super('questions.db')
    self.results_as_hash = true
    self.type_translation = true
  end
end
