class ProductsController < ApplicationController
  def generate
    binding.pry
    parent_product = DynamicProduct.find_by_id(params[:id])
    @static_product = parent_product.generate
    respond_to do |format|
      format.html
      format.json
    end
  end
end
