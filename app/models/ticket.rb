class Ticket < ActiveRecord::Base
  belongs_to :user
  has_many :comments

  validates_presence_of :subject
  validates_presence_of :description
  validates_presence_of :user

  class State
    NEW = 0
    ACCEPTED = 1
    CLOSED = 2
  end
end
