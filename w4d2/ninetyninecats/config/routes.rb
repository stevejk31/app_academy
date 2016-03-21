Rails.application.routes.draw do
  resources :cats
  resources :cat_rental_requests
  #any exclusions? [:index, :create, :destroy, :show, :update]
end
