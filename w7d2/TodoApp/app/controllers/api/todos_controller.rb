# == Route Map
#
#    Prefix Verb   URI Pattern              Controller#Action
# api_todos GET    /api/todos(.:format)     api/todos#index
#           POST   /api/todos(.:format)     api/todos#create
#  api_todo GET    /api/todos/:id(.:format) api/todos#show
#           PATCH  /api/todos/:id(.:format) api/todos#update
#           PUT    /api/todos/:id(.:format) api/todos#update
#           DELETE /api/todos/:id(.:format) api/todos#destroy

class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
    @todo = Todo.find_by(id: params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.create!(todo_params)
    render json: @todo
  end

  def destroy
    @todo = Todo.find_by(id: params[:id])
    @todo.destroy!
    render json: @todo
  end

  def update
    @todo = Todo.find_by(id: params[:id])
    @todo.update!(todo_params)
    render json: @todo
  end

    private
    def todo_params
      params.require(:todo).permit(:title, :body, :done)
    end
end
