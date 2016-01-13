require 'rspec'
require 'card.rb'

describe Card do

  let(:suit) { double("suit") }
  let(:number) { double("number") }
  subject(:card) { Card.new(suit, number) }

  it "holds suit" do
  end

  it "holds a number" do
  end

  describe "#to_s" do
    it "returns a string" do
    end
  end

  describe "#reveal" do
    it "reveals the card" do
    end
  end
end

#fdsafehiaw
