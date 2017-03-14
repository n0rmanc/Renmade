class CreateVariants < ActiveRecord::Migration[5.0]
  def change
    create_table :variants do |t|
      t.belongs_to :line_item
      t.string  :size, null: false
      t.string  :color, null: false
      t.integer :quantity, null: false, default: 1
      t.timestamps
    end
  end
end
