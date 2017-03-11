class CreateColors < ActiveRecord::Migration[5.0]
  def change
    create_table :colors do |t|
      t.belongs_to :product
      t.string :name, nil: false
      t.string :value, nil: false
      t.timestamps
    end
  end
end
