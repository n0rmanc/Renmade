class AddParentIdToProduct < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :parent_id, :integer
  end
end
