require_relative "card"
require_relative "deck"

class Hand
  attr_accessor :cards, :hand
  def initialize
    @cards = Array.new
  end
  def full_hand?
    @cards.length == 5
  end

  def best_hand(opponent_hand)

  end
  all_hands_we_beat = ALL_HANDS.drop(ALL_HANDS.index(our_hand)+1)
  ALL_HANDS = [ :royal_flush,
                :straight_flush,
                :four_kind,
                :full_house,
                :flush,
                :straight,
                :three_kind,
                :two_pair,
                :one_pair,
                :high_card]
  def what_hand
    @card.sort!
    @hand = :royal_flush if royal_flush?
    @hand = :straight_flush if straight_flush?
    @hand = :four_kind if four_kind?
    @hand = :full_house if full_house?
    @hand = :flush if flush?
    @hand = :straight if straight?
    @hand = :three_kind if three_kind?
    @hand = :two_pair if two_pair?
    @hand = :one_pair if one_pair?
    @hand = :high_card if high_card?
    #search through hands and find out whcih hand we have in all_hands order
    #b/c if you have a royal_flush you have a straight_flush, but if you ahve a striaght_flush you dont' have a royal flush
  end
  def royal_flush?

  end

  def straight_flush?
    flush? && straight?

  end

  def four_kind?
  end

  def full_house?

  end

  def flush?
    cards_suit = @cards[0].suit
    @cards.all? {|card| card.suit == cards_suit}
  end

  def straight?
    @cards.sort!{|a,b| a.number <=> b.number}
    int_card_num = @cards[0].number
    @cards.all? do |card|
      if card.number == int_card_num
        int_card_num +=1
        return true
      end
      false
    end

  end

  def three_kind?

  end

  def two_pair?

  end

  def one_pair?

  end

  def high_card?
    @cards.max
  end
end

if $PROGRAM_NAME == __FILE__
  d = Hand.new
  d.cards = [Card.new(:diamond,3),Card.new(:club,2),Card.new(:diamond,1),Card.new(:diamond,4),Card.new(:diamond,5),]
  p d.flush?
end
