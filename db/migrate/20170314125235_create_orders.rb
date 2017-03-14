class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :name, null: false
      t.string :phone, null: false
      t.string :address, null: false
      t.string :email, null: false
      t.text :message
      t.timestamps
    end
  end
end
