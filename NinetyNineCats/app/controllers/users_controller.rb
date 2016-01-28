class UsersController < ApplicationController
  before_action :logged_in
  def new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!
    else
      flash.now[:errors] = "not valide alot of stuff including password we haven't writtent his yet"
      render :new
    end
  end

  private

  def user_params
    params.require(:user)
      .permit(:username, :password)
  end

end
