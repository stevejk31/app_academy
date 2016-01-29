# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  name       :string
#  album_id   :integer          not null
#  type_track :string           not null
#  lyrics     :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  track_num  :integer          not null
#

class Track < ActiveRecord::Base
  belongs_to :album

  validates(
    :name,
    :album_id,
    :album,
    :lyrics,
    :type_track,
    presence: true
  )
  validates :type_track, inclusion: { in: ["regular", "bonus"] }
end
