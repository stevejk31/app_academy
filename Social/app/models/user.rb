class User < ActiveRecord::Base
  validates(
    :name,
    :password_digest,
    :session_token,
    presence: true
  )
  validates :name, uniqueness: true
end
