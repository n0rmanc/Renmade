require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  let(:product) { create(:dynamic_product) }
  describe '#generate' do
    # headers = {
    #   'ACCEPT' => 'application/json',     # This is what Rails 4 accepts
    #   'HTTP_ACCEPT' => 'application/json' # This is what Rails 3 accepts
    # }
    # /products/:id/generate
    subject(:generate) { post :generate, params: { id: product.id, format: :json } }
    it 'expects to duplicate a static product' do
      expect { subject }.to change { StaticProduct.count }.from(0).to(1)
    end
    it 'response static product attriubtes same as its parent' do
      expect(assigns(:static_product).title).to eq product.title
      expect(assigns(:static_product).short_description).to eq product.short_description
      expect(assigns(:static_product).sku).to eq product.sku
      expect(assigns(:static_product).visible).to eq product.visible
      expect(assigns(:static_product).price).to eq product.price
      expect(assigns(:static_product).original_price).to eq product.original_price
      expect(assigns(:static_product).type).to eq StaticProduct.name
      expect(assigns(:static_product).category_id).to eq product.category_id
      expect(assigns(:static_product).parent_id).to eq product.id
    end
  end
end
