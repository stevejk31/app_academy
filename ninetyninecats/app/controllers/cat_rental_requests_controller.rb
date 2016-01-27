# == Schema Information
#
# Table name: cat_rental_requests
#
#  id         :integer          not null, primary key
#  cat_id     :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  status     :string           default("PENDING"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#



class CatRentalRequestsController < ApplicationController

  def index
    redirect_to new_cat_rental_request_url
  end

  def new
    @cat_rr = CatRentalRequest.new
    @cats = Cat.all
    render :new
  end

  def create
    @cat_rr = CatRentalRequest.new(cat_rr_params)
    if @cat_rr.save
      redirect_to cat_url(@cat_rr.cat_id)
    else
      fail 'no cat'
    end
  end




  private

  def cat_rr_params
    params.require(:cat_rr).permit(:cat_id, :start_date, :end_date)
  end
end
