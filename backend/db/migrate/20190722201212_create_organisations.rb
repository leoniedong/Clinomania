class CreateOrganisations < ActiveRecord::Migration[5.2]
  def change
    create_table :organisations do |t|
      t.string :email
      t.string :name
      t.string :description
      t.string :password_digest

      t.timestamps
    end
  end
end
