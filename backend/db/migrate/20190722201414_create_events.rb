class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start
      t.datetime :end
      t.string :location
      t.string :dress_code
      t.string :speakers
      t.string :contact_email
      t.string :category
      t.string :tags
      t.references :organisation, foreign_key: true

      t.timestamps
    end
  end
end
