class AddTrackNumberTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :track_num, :integer, null: false
  end
end
