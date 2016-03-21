class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:session_token] = @user.session_token
      redirect_to goals_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :password)
  end
end
