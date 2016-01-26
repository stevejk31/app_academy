# == Schema Information
#
# Table name: cats
#
#  id          :integer          not null, primary key
#  birth_date  :string           not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class CatsController < ApplicationController
  def index
    @cats = Cat.all
    render :index
  end

  def show
    @cat = Cat.find_by(id: params[:id])
    if @cat
      render :show
    else
      fail 'oh no dead cat'
    end
  end

  def new
    @colors = Cat.all_colors
    render :new
  end

  def create
    @cat = Cat.new(cat_params)
    if @cat.save
      redirect_to cat_url(@cat.id)
    else
      fail 'no cat'
    end
  end

  def edit
    @cat = Cat.find_by(id: params[:id])
    @colors = Cat.all_colors
    if @cat
      render :edit
    else
      fail 'oh no dead cat'
    end
  end

  def update
    if @cat.update(cat_params)
      redirect_to cat_url(@cat.id)
    else
      fail 'no cat'
    end
  end



  private

  def cat_params
    params.require(:cat).permit(:birth_date, :color, :name, :sex, :description)
  end
end
