class Ticket < ActiveRecord::Base
  belongs_to :user
  has_many :comments
  enum state: [:open, :in_progress, :closed]

  validates_presence_of :subject
  validates_presence_of :description
  validates_presence_of :user
end
