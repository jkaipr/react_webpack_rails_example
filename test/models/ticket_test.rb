require 'test_helper'

class TicketTest < ActiveSupport::TestCase
  def new_ticket
    Ticket.new tickets(:new).attributes.except('id')
  end

  test 'should create new ticket' do
    ticket = new_ticket
    assert ticket.save, 'should save'
  end

  test 'sould not create ticket without subject' do
    ticket = new_ticket
    ticket.subject = ''
    assert !ticket.save, 'should not save'
  end

  test 'sould not create ticket without description' do
    ticket = new_ticket
    ticket.description = ''
    assert !ticket.save, 'should not save'
  end

  test 'should not create ticket without author' do
    ticket = new_ticket
    ticket.user = nil
    assert !ticket.save, 'should not save'
  end

  test 'should update ticket subject and description' do
    ticket = tickets(:new)
    ticket.subject = 'Different'
    assert ticket.save, 'should update'
  end

  test 'should update ticket description' do
    ticket = tickets(:new)
    ticket.description = 'Updated'
    assert ticket.save, 'should update'
  end

  test 'should update ticket state' do
    ticket = tickets(:new)
    ticket.state = Ticket.states['accepted']
    assert ticket.save, 'should update'
  end

  test 'should add comment to ticket' do
    ticket = tickets(:new)
    comment_count = ticket.comments.count
    ticket.comments << Comment.new(user: users(:jane), text: 'I found them next to the coffee machine.')
    assert ticket.save, 'should update'
    assert_equal ticket.comments.count, comment_count + 1, 'comment count should raise by 1'
  end

  test 'should not allow updating subject to empty' do
    ticket = tickets(:accepted)
    ticket.subject = ''
    assert !ticket.save, 'should not update'
  end

  test 'should not allow updating description to empty' do
    ticket = tickets(:accepted)
    ticket.description = ''
    assert !ticket.save, 'should not update'
  end

  test 'should not allow updating user to nil' do
    ticket = tickets(:accepted)
    ticket.user = nil
    assert !ticket.save, 'should not update'
  end

end
