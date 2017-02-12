class ProductsController < ApplicationController
  def generate
    parent_product = DynamicProduct.find_by_id(params[:id])
    @static_product = parent_product.generate
  end

  def show
    @product = Product.find(params[:id])
  end
end
