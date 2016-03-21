class BandsController < ApplicationController
  def index
    @bands = Band.all
    render :index
  end

  def show
    @band = Band.find_by(id: params[:id])
    render :show
  end

  def new
    render :new
  end

  def create
    @band = Band.new(band_params)
    succesful_save = @band.save
    unless succesful_save
      flash[:error] = "Not Valid Band"
    end
    redirect_to bands_url
  end

  def edit
  end

  def update
  end

  def destroy
  end


  private
  def band_params
    params(:band)
      .permit([:name])
  end
end
