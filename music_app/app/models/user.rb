# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'bcrypt'
class User < ActiveRecord::Base
  attr_accessor :password
  validates(
    :email,
    :session_token,
    :password_digest,
    presence: true
  )
  validates :password, length: {minimum: 6, allow_nil: true}
  validate :is_email
  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(input_email, input_password)
    new_user = User.find_by(email: input_email)
    new_user if new_user && new_user.is_password?(input_password) 
  end

  def self.find_by_session_token(session_token)
    User.find_by(session_token: session_token)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def is_email
    self.email.include?("@") && self.email.include?(".")
  end
end
