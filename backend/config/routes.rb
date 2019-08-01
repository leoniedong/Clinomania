Rails.application.routes.draw do
  resources :categories
  resources :interests
  resources :tickets
  resources :events
  resources :organisations
  resources :students
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post "/students/login", to: "students#login"
  post "/orgs/login", to: "organisations#login"
  get "/events/:id/students", to: "events#students"

end
