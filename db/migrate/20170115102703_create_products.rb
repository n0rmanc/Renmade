class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.string :short_description, null: false
      t.string :sku, null: false
      t.boolean :visible, null: false, default: true
      t.integer :price
      t.integer :original_price
      t.string :type
      t.belongs_to :category
      t.timestamps
    end
  end
end
