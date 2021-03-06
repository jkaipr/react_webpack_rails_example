ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/rails'
require 'minitest/reporters'

Minitest::Reporters.use!(
    Minitest::Reporters::ProgressReporter.new,
    ENV,
    Minitest.backtrace_filter
)

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def authenticate(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    request.env['HTTP_AUTHORIZATION'] = "Bearer #{token}"
  end

  def assert_model_errors(bad_attributes)
    bad_attributes = Array(bad_attributes)
    response_body = JSON.parse(response.body)

    assert_bad_request response_body
    assert response_body['errors']
    bad_attributes.each_with_index do |attr, idx|
      assert response_body['errors'][idx]['source']['pointer'] == attr, "Should containt error pointer for: #{attr}"
    end
  end

  def assert_bad_request(response_body)
    assert_response :bad_request
    assert !response_body['ok']
  end

  def assert_response_ok
    response_body = JSON.parse(response.body)
    assert_response :success
    assert response_body['ok']
  end
end
