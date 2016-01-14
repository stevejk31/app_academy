require 'rspec'
require 'card.rb'

describe Card do
  SUITS = [:spade, :heart, :diamond, :club]
  let(:suit) { SUITS.sample }
  let(:number) { rand(13)+1 }
  subject(:card) { Card.new(suit, number) }

  it "holds suit" do
    expect(card.suit).to eq(suit)
  end

  it "holds a number" do
    expect(card.number).to eq(number)
  end

  describe "#to_s" do
    it "returns a string" do
      expect(card.to_s.class).to eq(String)
    end
  end

  describe "#reveal" do
    it "card is initialized as !reaveled" do
      expect(card.revealed?).to be false
    end
    it "reveals the card" do
      card.reveal
      expect(card.revealed?).to be true
    end
  end


end

#fdsafehiaw
