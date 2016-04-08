Rails.application.routes.draw do
  # root 'react#root', as: :component
  root 'page#home', as: :component

  namespace :api, :defaults => {:format => :json} do
    namespace :v1 do
      resources :tickets
      get 'comments/:ticket_id', to: 'comments#index'
      post 'comments/', to: 'comments#create'

      # JWT auth
      put 'refresh' => 'authentication#refresh'
      post 'login' => 'authentication#create'

      # Not found route
      get '*unmatched_route', to: '/api#raise_not_found'
    end
  end
end
