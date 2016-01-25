class UsersController < ApplicationController
  def index
    render text: "I'm in the index action!"
  end
  def create
    render text: "tried to create"
  end
end
