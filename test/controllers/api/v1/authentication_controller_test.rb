require 'test_helper'

describe API::V1::AuthenticationController do
  it 'signin should fail when user is not found' do
    post(:create, auth:
        {
            email: 'some-invalid-mail@acme.com',
            password: 'invalid_password'
        })

    data = JSON.parse(response.body)

    assert data['errors'].any? { |e| e['code'] == 'unregistered' }, 'wrong error message'
    assert_response :bad_request
  end

  it 'signin should fail when user entered invalid password' do
    post(:create, auth:
        {
            email: 'john.doe@acme.com',
            password: 'invalid_password'
        })

    data = JSON.parse(response.body)

    assert data['errors'].any? { |e| e['code'] == 'wrong-password' }, 'wrong error message'
    assert_response :bad_request
  end

  it 'should sign in successfully' do
    post(:create, auth:
        {
            email: 'john.doe@acme.com',
            password: 'doe@ACME'
        })

    data = JSON.parse(response.body)

    assert data['jwt'].length > 0, 'no JWT in response body'
    assert_response :success
  end

  it 'should fail refreshing JWT if no user logged in' do
    put(:refresh)

    assert_response :unauthorized
  end

  it 'should refresh JWT successfully for logged in user' do
    authenticate users(:jane)
    put(:refresh)

    data = JSON.parse(response.body)

    assert data['jwt'].length > 0, 'no JWT in response body'
    assert_response :success
  end
end
