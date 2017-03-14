class OrdersController < ApplicationController
  def new
    @order = Order.new
    params[:data].values.each do |product_params|
      product = Product.find_by_id product_params[:id]
      line_item = @order.line_items.new(product_id: product.id,
                                        title: product.title,
                                        short_description: product.short_description,
                                        sku: product.sku,
                                        price: product.price,
                                        original_price: product.original_price)
      next if product.nil?
      product_params[:type].values.each do |type_params|
        color = Color.find_by_value(type_params[:color])
        line_item.variants.new(color: color.name,
                               size: type_params[:size],
                               quantity: type_params[:quantity])
      end
    end
  end
end
