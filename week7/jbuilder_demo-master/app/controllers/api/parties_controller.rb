class Api::PartiesController < ApplicationController
  def index
    @parties = Party.all
    render :index
  end

  def show
    @party = Party.includes(guests: :gift).find(params[:id])
    render :show
  end
end
