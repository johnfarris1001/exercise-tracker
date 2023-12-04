class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.string :category
      t.integer :intensity
      t.datetime :start_time
      t.integer :duration
      t.integer :user_rating
      t.references :user, null: false, foreign_key: true
      t.references :instructor, null: false, foreign_key: true
      t.references :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
