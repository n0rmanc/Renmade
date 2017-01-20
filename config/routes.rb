Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :main, only: :index
  resources :products do
    member do
      get :random
    end
  end
  root 'main#index'
end
