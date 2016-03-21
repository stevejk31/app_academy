class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login_in?
    current_user.session_token == session[:session_token]
  end

  def current_user_id
    current_user ? current_user.id : nil
  end


  def require_user!
    redirect_to new_session_url if current_user.nil?
  end

end
