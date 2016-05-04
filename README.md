## Install

In project root execute:

    bundle install && npm install
    
Seed data:

    bundle exec rake db:migrate
    bundle exec rake db:fixtures:load

## Run tests

    bundle exec rake test && npm run test
    
## Run application

### Rails 

    bundle exec rails s
    
### Webpack for React asset building

    npm run start
    
### Webpack dev server for hot reloading of react assets

    npm run start-hot-dev
