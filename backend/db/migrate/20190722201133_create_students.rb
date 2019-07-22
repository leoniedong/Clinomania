class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :email
      t.integer :year
      t.string :major
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
