class MainController < ApplicationController
  def index
    @products = Product.all
    @categories = Category.all.includes(products: :pictures)
  end
end
