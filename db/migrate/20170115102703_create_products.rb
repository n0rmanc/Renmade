class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.string :shor_description, null: false
      t.string :category, null: false
      t.string :sku, null: false
      t.boolean :visible, null: false, default: true
      t.integer :price
      t.integer :original_price
      t.timestamps
    end
  end
end
