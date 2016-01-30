class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:user_name], params[:user][:password])
    if @user
      session[:session_token] = @user.reset_session_token!
      #TODO redirect somewher useful
      redirect_to new_session_url
    else
      redirect_to new_session_url
    end
  end

  def destroy
    session[:session_token] = nil
    current_user.reset_session_token!
  end
end
