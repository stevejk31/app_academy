# == Schema Information
#
# Table name: subs
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  moderator_id :integer          not null
#  description  :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Sub < ActiveRecord::Base
  validates :title, :moderator, :description, presence: true

  belongs_to :moderator,
    foreign_key: :moderator_id,
    class_name: 'User'

  has_many :posts
end
