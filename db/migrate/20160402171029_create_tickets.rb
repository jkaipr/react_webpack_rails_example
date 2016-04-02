class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :subject
      t.text :description
      t.integer :state
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
