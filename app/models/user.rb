class User < ActiveRecord::Base
  has_secure_password

  validates :password, length: { minimum: 8 }, allow_nil: true
  validates_uniqueness_of :email
end
