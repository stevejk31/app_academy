class SessionsController < ApplicationController
  before_action :logged_in, only: [:create, :new]

  def create
    login_user!
  end

  def new
    render :new
  end

  def destroy
    if current_user
      current_user.reset_session_token!
      session[:session_token] = nil
    end

    redirect_to new_session_url
  end



end
