require 'test_helper'

class CommentTest < ActiveSupport::TestCase

  test 'should create new comment' do
    comment = Comment.new user: users(:john), text: 'Will look into it.', ticket: tickets(:accepted)
    assert comment.save, 'should save'
  end

  test 'should not create comment without user' do
    comment = Comment.new text: 'Will look into it.', ticket: tickets(:accepted)
    assert !comment.save, 'should not save'
  end

  test 'should not create comment without text' do
    comment = Comment.new user: users(:john), ticket: tickets(:accepted)
    assert !comment.save, 'should not save'
  end

  test 'should not create comment without ticket' do
    comment = Comment.new user: users(:john), text: 'Will look into it.'
    assert !comment.save, 'should not save'
  end
end
