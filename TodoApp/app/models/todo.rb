# == Schema Information
#
# Table name: todos
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  body       :text             not null
#  done       :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Todo < ActiveRecord::Base
  validates :title, :body, presence: true
  validates_inclusion_of :done, in: [true, false]
  after_initialize :default_values


  def default_values
    self.done = false;

  end

end
