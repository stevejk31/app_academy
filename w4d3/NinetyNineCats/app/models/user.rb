# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#
require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessor :password
  include BCrypt
  has_many :cats,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: 'Cat'

  has_many :requests,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: 'CatRentalRequest'

  validates(
    :username,
    :password_digest,
    :session_token,
    presence: true
  )
  validates :password, length:{minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token


  def self.find_by_credentials(user_name, password)
    login_user = User.find_by(username: user_name)

    if login_user && login_user.is_password?(password)
      login_user
    else
      nil
    end

  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
