# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class UsersController < ApplicationController

  def show
    render :show
  end

  def new
    render :new
  end

  def create
    @user = User.new(user_params)
    succesful_save = @user.save
    if succesful_save
      login_user!
    else
      flash[:error] = "Not Valid Username or Password"
      redirect_to new_user_url
    end
  end

  private

  def user_params
    params.require(:user)
      .permit(:email, :password)
  end
end
