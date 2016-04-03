require 'test_helper'

describe API::V1::TicketsController do
  let(:new_ticket) { tickets(:new) }

  it 'should get all tickets json on index' do
    get :index
    tickets = JSON.parse(response.body)
    assert_response :success
    assert_equal tickets.length, Ticket.count
    assert tickets[0]['id']
    assert tickets[0]['subject']
    assert tickets[0]['description']
    assert tickets[0]['user_id']
    assert tickets[0]['state']
  end

  it 'should get ticket json on show' do
    id = new_ticket.id
    get :show, id: id
    ticket = JSON.parse(response.body)
    assert_response :success
    assert_equal ticket['id'], id
    assert_equal ticket['subject'], new_ticket.subject
    assert_equal ticket['description'], new_ticket.description
    assert_equal ticket['user_id'], new_ticket.user_id
    assert_equal ticket['state'], new_ticket.state
  end

  it 'should create new ticket' do
    count = Ticket.count
    post :create, subject: 'Problem', description: 'Solve it please', user_id: users(:jane).id
    assert_response :success
    assert JSON.parse(response.body)['ok']
    assert_equal count + 1, Ticket.count
  end

  it 'should not create ticket without subject, description, user' do
    post :create, subject: '', description: 'Solve it please', user_id: users(:jane).id
    assert_bad_request 'subject'
    post :create, subject: 'Problem', description: '', user_id: users(:jane).id
    assert_bad_request 'description'
    post :create, subject: 'Problem', description: 'Solve it please', user_id: ''
    assert_bad_request 'user'
  end

  it 'should update ticket description' do
    new_description = 'New description'
    put :update, id: new_ticket.id, description: new_description
    assert_response :success
    assert JSON.parse(response.body)['ok']
    assert_equal new_description, Ticket.find(new_ticket.id).description
  end

  it 'should not update ticket to empty subject, description, user' do
    put :update, id: new_ticket.id, subject: ''
    assert_bad_request 'subject'
    put :update, id: new_ticket.id, description: ''
    assert_bad_request 'description'
    put :update, id: new_ticket.id, user_id: ''
    assert_bad_request 'user'
  end

  it 'should destroy ticket' do
    count = Ticket.count
    delete :destroy, id: new_ticket.id
    assert_response :success
    assert JSON.parse(response.body)['ok']
    assert_equal count - 1, Ticket.count
  end
end
