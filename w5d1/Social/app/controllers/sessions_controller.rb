class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:name], params[:user][:password])
    if @user
      session[:session_token] = @user.reset_session_token!
      redirect_to goals_url
    else
      @user
      flash[:errors] = ["Incorrect Name and/or Password"]
      redirect_to new_session_url
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end
end
