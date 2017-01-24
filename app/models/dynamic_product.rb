class DynamicProduct < Product

  def generate
    static_product = deep_clone include: :pictures
    static_product.type = StaticProduct.name
    static_product.parent_id = id
    static_product.save
    static_product.becomes(StaticProduct)
  end
end
