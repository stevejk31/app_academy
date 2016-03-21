# == Schema Information
#
# Table name: benches
#
#  id          :integer          not null, primary key
#  description :text             not null
#  lat         :float            not null
#  lon         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Bench < ActiveRecord::Base
  validates(
  :description,
  :lat,
  :lon,
  presence: true
  )
  
end
