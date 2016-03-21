# == Schema Information
#
# Table name: albums
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  band_id        :integer          not null
#  type_recording :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Album < ActiveRecord::Base

  belongs_to :band

  has_many :tracks, dependent: :destroy

  validates :name, presence: true
  validates :band_id, presence: true
  validates :band, presence: true
  validates :type_recording, presence: true, inclusion: { in: ["live", "studio"] }

end
