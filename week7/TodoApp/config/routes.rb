# == Route Map
#
#    Prefix Verb   URI Pattern              Controller#Action
#      root GET    /                        static_pages#root
# api_todos GET    /api/todos(.:format)     api/todos#index
#           POST   /api/todos(.:format)     api/todos#create
#  api_todo GET    /api/todos/:id(.:format) api/todos#show
#           PATCH  /api/todos/:id(.:format) api/todos#update
#           PUT    /api/todos/:id(.:format) api/todos#update
#           DELETE /api/todos/:id(.:format) api/todos#destroy
#

Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api do
    resources :todos, only: [:index, :show, :create, :destroy, :update]
  end

end
