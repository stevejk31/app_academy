class CreateCreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |t|
      t.string :birth_date, null: false
      t.string :color, null: false
      t.string :name, null: false
      t.string :sex, { limit: 1, null: false }
      t.text :description, null: false
      t.timestamps null: false
    end

  end
  
end
