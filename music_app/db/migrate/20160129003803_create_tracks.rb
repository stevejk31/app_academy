class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :name
      t.integer :album_id, null: false
      t.string :type_track, null: false
      t.text :lyrics, null: false
      t.timestamps null: false
    end

    add_index :tracks, :album_id
  end
end
