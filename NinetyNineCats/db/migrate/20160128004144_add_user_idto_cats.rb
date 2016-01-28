class AddUserIdtoCats < ActiveRecord::Migration
  def change
    add_column :cats, :user_id, :string, null: false
    add_index :cats, :user_id, unique: true
  end
end
