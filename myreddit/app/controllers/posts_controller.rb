class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    fail
    if @post.save
      redirect_to posts_url
    else
      redirect_to new_post_url
    end

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
  def post_params
    params.require(:post)
      .permit(:title, :url, :content, :sub_id, :author_id)
  end
end
