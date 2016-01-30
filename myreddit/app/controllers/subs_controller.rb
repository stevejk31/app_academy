class SubsController < ApplicationController
  before_filter :require_user!, only:[:edit, :destroy]

  def index
    @subs = Sub.all
  end

  def new
    @sub = Sub.new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.save!
    #TODO redirect somewher useful
    redirect_to new_sub_url
  end

  def edit
    @sub = Sub.find(params[:id])
    if current_user.id != @sub.moderator_id
      redirect_to subs_url
    else
      render :edit
    end
  end

  def update
    @sub = Sub.update(sub_params)
    #TODO redirect somewher useful
    redirect_to subs_url
  end

  def destroy
    @sub = Sub.find(params[:id])
    @sub.destroy!
    #TODO redirect somewher useful
    redirect_to subs_url
  end

  def show
    @sub = Sub.find_by(id: params[:id])
    @posts = @sub.posts
  end

  private

  def sub_params
    params.require(:sub)
      .permit(:description, :title, :moderator_id)
  end
end
