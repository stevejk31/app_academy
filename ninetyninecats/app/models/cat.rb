# == Schema Information
#
# Table name: cats
#
#  id          :integer          not null, primary key
#  birth_date  :string           not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Cat < ActiveRecord::Base
  COLORS = %w(grey brown black white nude)
  validates :birth_date, presence: true
  validates :color, inclusion: { in: COLORS }
  validates :name, presence: true
  validates :sex, inclusion: { in: %w(M F) }
  validates :description, presence: true

  has_many :cat_rental_requests, dependent: :destroy


  def self.all_colors
    COLORS
  end

  def age
    Date.today.year.to_i - self.birth_date[0,4].to_i
  end
end
