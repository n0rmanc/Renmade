class AddDefaultSize < SeedMigration::Migration
  def up
    %w(XS S M L XL XXL).each do |size|
      Size.create(value: size)
    end
    sizes = Size.all
    StaticProduct.all.each do |product|
      product.sizes << sizes
    end
  end

  def down
    Product.all.each do |product|
      product.sizes.destroy_all
    end
    Size.destroy_all
  end
end
