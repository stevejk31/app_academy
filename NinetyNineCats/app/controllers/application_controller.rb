class ApplicationController < ActionController::Base
  helper_method :current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  # sesssion[authentication_token] =
  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login_user!
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      @user.reset_session_token!
      session[:session_token] = @user.session_token
      redirect_to cats_url
    else
      flash.now[:errors] = "Invalid Credentials!"
      render :new
    end
  end

  def logged_in
    redirect_to cats_url if current_user
  end


  def not_owner
    @cat = Cat.find(params[:id])
    if current_user.id.to_s == @cat.user_id
      nil
    else
      flash.now[:errors] = "NOT YOUR CAT B*TCH"
      redirect_to cats_url
    end
  end

end
