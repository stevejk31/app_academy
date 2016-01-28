# == Schema Information
#
# Table name: cats
#
#  id          :integer          not null, primary key
#  birth_date  :date             not null
#  color       :string(255)      not null
#  name        :string(255)      not null
#  sex         :string(1)        not null
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#  user_id     :string(255)      not null
#

require 'action_view'

class Cat < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  CAT_COLORS = %w(black white orange brown)
  belongs_to :owner,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: 'User'

  has_many(
    :rental_requests,
    class_name: "CatRentalRequest",
    dependent: :destroy
  )

  validates(
    :birth_date,
    :color,
    :name,
    :sex,
    :user_id,
    presence: true
  )

  validates :color, inclusion: CAT_COLORS
  validates :sex, inclusion: %w(M F)
  validate :user_id_exists

  def user_id_exists
    return false if User.find_by_id(self.user_id).nil?
  end

  def age
    time_ago_in_words(birth_date)
  end
end
