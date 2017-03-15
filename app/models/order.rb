class Order < ApplicationRecord
  has_many :line_items
  accepts_nested_attributes_for :line_items
  def total_quantity
    line_items.map(&:sum_of_quantity).sum
  end

  def total_price
    line_items.map(&:sub_total).sum
  end
end
