require 'rspec'
require 'deck.rb'

describe Deck do
  subject(:deck) {Deck.new}

  it "holds cards" do
    expect( deck.cards ).to all( be_a(Card) )
  end

  describe "#initialize" do
    it "initializes with 52 cards" do                   #jokers are stupid
      expect(deck.cards.length).to be(52)
    end

    it "generated 52 unique cards" do
      expect(deck.cards).to eq(deck.cards.uniq)
    end
  end

  describe "#shuffle!" do
    it "shuffles" do
      original_cards = deck.cards.dup
      deck.shuffle!
      expect(deck.cards).to_not eq (original_cards)
    end
  end

  describe "#draw_card" do
    let(:drawn_card) { deck.draw_card }

    it "returns the drawn card" do
      expect(drawn_card).to be_a(Card)
    end

    it "removes the drawn card from the deck" do
      deck.draw_card
      expect(deck.cards).not_to include(drawn_card)
    end
  end
end
