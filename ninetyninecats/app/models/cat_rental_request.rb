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

class CatRentalRequest < ActiveRecord::Base
  validates :cat_id, :start_date, :end_date, presence: true
  validates :status, inclusion: { in: %w(PENDING APPROVED DENIED) }
  validate :correct_end_date
  validate :overlapping_approved_requests


  belongs_to :cat

  def same_cat_requests
    self.cat.cat_rental_requests
    .where(
    "cat_rental_requests.id != :id", id: self.id
    ).includes(:cat)
  end

  def overlapping_requests
    same_cat_requests.select {|request|
      (self.start_date..self.end_date)
      .overlaps?(request.start_date..request.end_date)}
  end

  def correct_end_date
    if end_date < start_date
      errors[:date] << "end date is before start date"
    end
  end

  def overlapping_approved_requests
    if overlapping_requests.any? do |request|
      request.status == "APPROVED" && self.status == "APPROVED"
    end
      errors[:date] << "Overlapping requests!"
    end
  end

  def approve!
    self.status = "APPROVED"
    CatRentalRequest.transaction do
      self.save!
      overlapping_requests.each{ |request| request.deny! }
    end
  end

  def deny!
    self.status = "DENIED"
    self.save!
  end
end
