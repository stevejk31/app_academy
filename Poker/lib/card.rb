class Card
  attr_reader :suit, :number
  attr_accessor :revealed

  def initialize(suit, number)
    @suit = suit
    @number = number
    @reveal = false
  end

  def reveal
    @revealed = true
  end

  def inspect
    [@suit, @number]
  end

  def to_s
    p_suit = "♠" if suit == :spade
    p_suit = "♥" if suit == :heart
    p_suit = "♦" if suit == :diamond
    p_suit = "♣" if suit == :club
    p_number = @number.to_s if @number.between?(2, 10)
    p_number = "J" if number == 11
    p_number = "Q" if number == 12
    p_number = "K" if number == 13
    p_number = "A" if number == 1
    "#{p_number}#{p_suit}"
  end
end

#comments comments
