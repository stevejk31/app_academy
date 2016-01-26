# == Schema Information
#
# Table name: contact_shares
#
#  id         :integer          not null, primary key
#  contact_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ContactShare < ActiveRecord::Base
  validates :contact_id, presence: true
  validates :user_id, presence: true, uniqueness: { scope: :contact_id }

  belongs_to :user

  belongs_to :contact
end
