NinetyNineCatsDay1::Application.routes.draw do
  resources :cats, except: :destroy
  resource :user, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  resources :cat_rental_requests, only: [:create, :new] do
    post "approve", on: :member
    post "deny", on: :member
  end

  root to: redirect("/cats")
end
