require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def new_john
    User.new users(:john).attributes.except('id', 'password_digest')
  end

  test 'should create new user' do
    user = new_john
    user.password = 'longenough'
    user.email = 'johnathan.doe@acme.com'
    assert user.save, 'should create new user'
  end

  test 'should not create user with same email' do
    user = new_john
    user.password = 'longenough'
    assert !user.save, 'should not create new user'
  end

  test 'should not create user with short password' do
    user = new_john
    user.password = 'short'
    assert !user.save, 'should not create new user'
  end

  test 'should not save user with empty password' do
    user = new_john
    user.password = ''
    assert !user.save, 'should not create user'
  end

  test 'should not save user with nil password' do
    user = new_john
    user.password = nil
    assert !user.save, 'should not create user'
  end

  test 'should update valid user' do
    user = users(:john)
    user.firstname = 'Johnathan'
    assert user.save, 'should save new name'
  end

  test 'should not allow updating user password to a short one' do
    user = users(:john)
    user.password = 'short'
    assert !user.save, 'should not save with short password'
  end

  test 'should not allow updating email to an already existing one' do
    user = users(:john)
    user.email = users(:jane).email
    assert !user.save, 'should not save with non unique email'
  end
end
