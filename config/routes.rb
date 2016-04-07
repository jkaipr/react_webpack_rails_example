Rails.application.routes.draw do
  get 'react_examples/component', to: 'react_examples#component', as: :component

  namespace :api, :defaults => {:format => :json} do
    namespace :v1 do
      resources :tickets
      get 'comments/:ticket_id', to: 'comments#index'
      post 'comments/', to: 'comments#create'

      # JWT auth
      put 'refresh' => 'authentication#refresh'
      post 'signin' => 'authentication#create', as: :signin

      # Not found route
      get '*unmatched_route', to: '/api#raise_not_found'
    end
  end
end
