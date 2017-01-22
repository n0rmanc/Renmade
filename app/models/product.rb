class Product < ApplicationRecord
  belongs_to :category
  has_many :pictures
  belongs_to :dynamic_parent, class_name: 'Product'
  has_many :static_products, foreign_key: 'parent_id'
end
