class Product < ApplicationRecord
  belongs_to :category
  has_many :pictures
  has_and_belongs_to_many :sizes
  has_many :colors, dependent: :destroy
  belongs_to :dynamic_parent, class_name: 'Product'
  has_many :static_products, foreign_key: 'parent_id'
end
