require 'test_helper'

describe API::V1::CommentsController do
  let(:new_ticket) { tickets(:new) }
  let(:user_id) { users(:jane).id }

  it 'should get all ticket comments on index' do
    get :index, ticket_id: tickets(:closed).id
    assert_response :success
    assert_equal JSON.parse(response.body).length, tickets(:closed).comments.count
  end

  it 'should create new comment on create' do
    comment_count = new_ticket.comments.count
    post :create, text: 'I found them.', ticket_id: new_ticket.id, user_id: user_id
    assert_response :success
    assert JSON.parse(response.body)['ok']
    assert_equal comment_count + 1, Ticket.find(new_ticket.id).comments.count
  end

  it 'should not create comment with empty text, ticket, user' do
    post :create, text: '', ticket_id: new_ticket.id, user_id: user_id
    assert_bad_request 'text'
    post :create, text: 'I found them.', ticket_id: '', user_id: user_id
    assert_bad_request 'ticket'
    post :create, text: 'I found them.', ticket_id: new_ticket.id, user_id: ''
    assert_bad_request 'user'
  end

end
