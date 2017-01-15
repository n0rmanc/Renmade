class DefaultProducts < SeedMigration::Migration
  def up
    Category.all.each do |category|
      20.times do
        price = Faker::Commerce.price
        DynamicProduct.create(title: Faker::Commerce.product_name,
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
    DynamicProduct.destroy_all
  end
end
