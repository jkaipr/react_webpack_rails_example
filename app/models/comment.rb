class Comment < ActiveRecord::Base
  belongs_to :ticket
  belongs_to :user

  validates_presence_of :text
  validates_presence_of :ticket
  validates_presence_of :user
end
