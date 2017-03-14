Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :main, only: :index
  resources :orders
  resources :products do
    member do
      post :generate
    end
  end
  root 'main#index'
end
