class DefaultCategories < SeedMigration::Migration
  def up
    5.times do
      Category.create(name: Faker::Commerce.department)
    end
  end

  def down
    Category.destroy_all
  end
end
