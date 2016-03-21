class SessionsController < ApplicationController
  # before_action :logged_in, only: [:create, :new]

  def new
    render :new
  end

  def create
    login_user!
  end

  def destroy
    self.current_user.reset_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end

end
