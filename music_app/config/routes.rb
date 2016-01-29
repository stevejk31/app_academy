Rails.application.routes.draw do
  resource :user
  resource :session
  resources :albums
  resources :tracks
  resources :bands
end
