class AddDescriptionToProducts < SeedMigration::Migration
  def up
    Product.all.each do |product|
      product.update(description: Faker::Lorem.paragraph)
    end
  end

  def down
    Product.update_all(description: nil)
  end
end
