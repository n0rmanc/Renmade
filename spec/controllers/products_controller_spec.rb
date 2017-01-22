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
      expect { subject }.to_not change { StaticProduct.count }.from(0).to(1)
    end
    it 'response static product attriubtes same as its parent' do
      subject
      JSON.parse(response.body)
    end
  end
end
