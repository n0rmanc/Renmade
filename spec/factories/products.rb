FactoryGirl.define do
  factory :product do
    title Faker::Commerce.product_name
    short_description Faker::Hipster.sentence
    sku Faker::Commerce.product_name
    visible true
    price Faker::Commerce.price
    original_price Faker::Commerce.price
    category { build(:category) }
    pictures { [build(:picture)] }
  end
  factory :dynamic_product, class: DynamicProduct do
    title Faker::Commerce.product_name
    short_description Faker::Hipster.sentence
    sku Faker::Commerce.product_name
    visible true
    price Faker::Commerce.price
    original_price Faker::Commerce.price
    category { build(:category) }
    pictures { [build(:picture)] }
  end
end
