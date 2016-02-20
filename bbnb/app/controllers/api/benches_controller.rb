class Api::BenchesController < ApplicationController
  def index
    @benches = Bench.all
  end

  def show
    @bench = Bench.find_by(id: id)
  end
end
