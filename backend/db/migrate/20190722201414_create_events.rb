class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :date
      t.string :location
      t.string :dress_code
      t.references :student, foreign_key: true
      t.references :organisation, foreign_key: true

      t.timestamps
    end
  end
end
