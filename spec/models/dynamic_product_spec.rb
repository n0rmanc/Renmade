require 'rails_helper'

RSpec.describe DynamicProduct, type: :model do
  let(:product) { create(:dynamic_product) }
  describe '#generate' do
    subject(:generate) { product.generate }
    it 'deeps clone and generate a new static product' do
      expect(subject.title).to eq product.title
      expect(subject.short_description).to eq product.short_description
      expect(subject.sku).to eq product.sku
      expect(subject.visible).to eq product.visible
      expect(subject.price).to eq product.price
      expect(subject.original_price).to eq product.original_price
      expect(subject.type).to eq StaticProduct.name
      expect(subject.category_id).to eq product.category_id
      expect(subject.parent_id).to eq product.id
    end
  end
end
