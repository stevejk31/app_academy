require 'rspec'
require 'exercises.rb'

describe Array do

  describe "#my_uniq" do
    subject(:array) { [3, 1, 3, 2, 1] }
    let(:uniq_array) { array.my_uniq }

    it "returns a new array" do
      expect(array.my_uniq).to_not be(array)
    end

    it "removes duplicates, and returns in order of original" do
      expect(uniq_array.sort).to eq(array.uniq.sort)
    end

    it "returns elements in order in which they first appeared" do
      expect(uniq_array).to eq([3, 1, 2])
    end
  end

  describe "#two_sum" do
    subject(:array) {[-1, 0, 2, -2, 1]}

    it "finds positions where elements sum to zero" do
      expect(array.two_sum).to include([0, 4], [2, 3])
    end

    it "pairs to be sorted smaller index before bigger index" do
      expect(array.two_sum).not_to include([4,0],[3,2])
    end

    it "pairs to be sorted dictionary-wise" do
      expect(array.two_sum).to eq([[0, 4], [2, 3]])
    end
  end

  describe "my_transpose" do
    subject(:matrix) {[
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8]
                    ]}

    it "does it transpose" do
      expect(matrix.my_transpose).to eq(matrix.transpose)
    end

    it "does not call #transpose" do
      expect(matrix).not_to receive :transpose
      matrix.my_transpose
    end
  end

  describe "#stock_picker" do
    subject{[10, 5, 3, 7, 2, 4, 16, 8, 1]}
    let(:picked_stock) {subject.stock_picker}

    it "finds positions where elements have the greatest difference" do
      expect(picked_stock).to eq([4, 6])
    end

    it "sorted smaller index before bigger index" do
      expect(picked_stock.sort).to eq(picked)
    end
  end



end
