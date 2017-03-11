class AddColors < SeedMigration::Migration
  def up
    rand = Random.new
    StaticProduct.all.each do |product|
      rand.rand(1..5).times do
        product.colors.create(name: Faker::Color.color_name,
                              value: Faker::Number.hexadecimal(6))
      end
    end
  end

  def down
    Color.destroy_all
  end
end
