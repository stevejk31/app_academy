require_relative "card"
class Deck
  SUITS = [:spade, :heart, :diamond, :club]

  attr_reader :cards

  def initialize
    @cards = []
    generate_cards
  end

  def generate_cards
    SUITS.each do |suit|
      (1..13).each do |num|
        cards << Card.new(suit, num)
      end
    end
  end

  def shuffle!
    @cards.shuffle!
  end

  def draw_card
    @cards.pop
  end
end

if $PROGRAM_NAME == __FILE__
  d = Deck.new
  d.cards.shuffle.each {|card| print card.to_s}
end
