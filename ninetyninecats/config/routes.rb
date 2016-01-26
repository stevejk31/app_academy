Rails.application.routes.draw do
  resources :cats
  #any exclusions? [:index, :create, :destroy, :show, :update]
end
