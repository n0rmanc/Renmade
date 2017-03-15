class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  has_many :variants
  accepts_nested_attributes_for :variants
  def sum_of_quantity
    variants.map(&:quantity).sum
  end

  def sub_total
    sum_of_quantity * price
  end
end
