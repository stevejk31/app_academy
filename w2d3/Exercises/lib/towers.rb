class Tower
  attr_accessor :board

  def initialize
    @board = [[3, 2, 1],[],[]]
  end


  def move (int_pt, end_pt)
    if !@board[end_pt].empty?
      raise "errorrrr" unless @board[int_pt].last < @board[end_pt].last
    end
    @board[end_pt] << @board[int_pt].pop
    puts board
  end

  def render
    puts
  end
  WIN_COND = [[[], [3,2,1], []], [[], [], [3,2,1]]]
  def won?
    WIN_COND.include?(board)
  end
end
