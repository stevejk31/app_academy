class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create

  end

  def show
    @post = Post.find_by(id: params[:id])
    if @post.nil?
      redirect_to new_session_url
    else
      render :show
    end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def posts_params
    params.require(:posts)
      .permit(:title, :url, :content)
  end
end
