Rails.application.routes.draw do

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/api/users', to: 'users#index'
  get '/api/locations', to: 'locations#index'
  post '/api/locations', to: 'locations#create'
  get '/api/instructors', to: 'instructors#index'
  post '/api/instructors', to: 'instructors#create'

  resources :activities, only: [:index, :create, :update, :destroy]
  resources :profiles, only: [:show, :create, :update, :destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
