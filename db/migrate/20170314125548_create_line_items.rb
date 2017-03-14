class CreateLineItems < ActiveRecord::Migration[5.0]
  def change
    create_table :line_items do |t|
      t.belongs_to :order
      t.belongs_to :product
      t.string   "title",                            null: false
      t.string   "short_description",                null: false
      t.string   "sku",                              null: false
      t.integer  "price"
      t.integer  "original_price"
      t.timestamps
    end
  end
end
