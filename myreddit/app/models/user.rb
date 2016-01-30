# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  password_digest :string           not null
#  user_name       :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password
  validates(
    :password_digest,
    :user_name,
    :session_token,
    presence: true
  )

  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  def self.find_by_credentials(user_name, password)
    @user = User.find_by(user_name: user_name)
    return nil if @user.nil?
    (@user.is_password?(password)) ? @user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password  = password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
end
