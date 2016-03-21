class ApplicationController < ActionController::Base
  helper_method :current_user


  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in
    #TODO make this go somewhere useful
    redirect_to user_url if current_user
    #if current_user
  end

  def login_user!
   @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

   if @user
     @user.reset_session_token!
     session[:session_token] = @user.session_token
     logged_in
   else
     flash[:errors] = "Invalid Credentials!"
     redirect_to new_session_url
   end
 end

  def log_in_user!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

end
