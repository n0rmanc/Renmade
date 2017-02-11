class AddProductsToCategory < SeedMigration::Migration
  def up
    Category.all.each do |category|
      price = Faker::Commerce.price
      50.times do |n|
      StaticProduct.create(title: Faker::Commerce.product_name,
                            short_description: Faker::Hipster.sentence,
                            sku: Faker::Commerce.product_name,
                            visible: true,
                            price: price,
                            original_price: price + 100,
                            category: category,
                            pictures: [Picture.create(asset: 'http://fillmurray.com/300/300')])
      end
    end
  end

  def down
    StaticProduct.destroy_all
  end
end
