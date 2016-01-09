require 'byebug'
require 'yaml'

class Tile
  attr_reader :revealed, :flagged, :has_bomb
  attr_accessor :neighbor, :neighbor_bombs

  def initialize(has_bomb = false)
    @has_bomb = has_bomb
    @flagged = false
    @revealed = false
    @neighbor_bombs = 0  #num of neighbors who are bombs
    @neighbor = []  #empty array that will be filled with it's neighbors
  end

  def put_flag
    @flagged = true
  end

  def remove_flag
    @flagged = false
  end

  def switch_flag
    @flagged ? remove_flag : put_flag
  end

  def reveal_tile
    #raise "already_revealed" if @revealed
    @revealed = true
  end

  def to_s
    if @revealed
      @has_bomb ? 'B' : @neighbor_bombs
    elsif @flagged
      'F'
    else
      '*'
    end
  end

  def recursive_reveal
    self.reveal_tile
    return if self.neighbor_bombs > 0
    @neighbor.each do |neigh|
      neigh.recursive_reveal unless neigh.has_bomb || neigh.revealed
    end
  end

end

class Board
  attr_reader :grid
  def initialize(col = 9, row = 9, num_bombs=10)
    @grid = Array.new(col) {Array.new(row){0}}
    @num_bombs = num_bombs
  end


  def render_board
    header = "   "
    width_board = @grid[0].length
    header_num = (0...width_board).to_a
    header << header_num.join(" ")
    puts header
    puts "---"+"-"*width_board*2

    @grid.each_index do |col|
      col_print = "#{col} |"
      @grid[col].each_index do |row|
        col_print << "#{self[[col, row]].to_s} "
      end
      puts col_print
    end
  end

  def populate
    safe_spots = @grid.flatten.length - @num_bombs
    all_tiles = []
    @num_bombs.times { all_tiles << Tile.new(true) }
    safe_spots.times { all_tiles << Tile.new(false) }
    all_tiles.shuffle!
    @grid.each_index do |col|
      @grid[col].each_index do |row|
        self[[col,row]] = all_tiles.pop
      end
    end
    link_tiles
    @grid
  end

  def link_tiles
    relative_positions = [
      [-1,-1],
      [0,-1],
      [1,-1],
      [1,0],
      [1,1],
      [0,1],
      [-1,1],
      [-1,0]
    ]
                          #10.5,   12,    1.5,    3    4.5,
    @grid.each_index do |col|
      @grid[col].each_index do |row|
        tile = self[[col,row]]
        relative_positions.each do |relative_position|
          new_col = col + relative_position[0]
          new_row = row + relative_position[1]
          if new_col.between?(0, @grid.length-1) &&
             new_row.between?(0, @grid[0].length-1)

            neighbor_tile = self[[new_col, new_row]]
            tile.neighbor << neighbor_tile
            (tile.neighbor_bombs += 1) if neighbor_tile.has_bomb
          end
        end
      end
    end
  end

  def valid_move?(pos, action) #action: {r: "reveal", f: "flag"}
    target_tile = self[pos]
    return !target_tile.revealed if action == 'f'
    return !target_tile.revealed && !target_tile.flagged if action == 'r'
    false
  end

  def make_move(pos, action)
    #raise "Not a valid move" unless valid_move?(pos, action)
    target_tile = self[pos]
    if action == 'f'
      target_tile.switch_flag
    elsif action == 'r'
      #raise "BOMB!" if target_tile.has_bomb
      self.reveal(pos)
    end
  end

  def reveal(pos)
    self[pos].recursive_reveal
  end

  def [] pos
    x,y = pos
    @grid[x][y]
  end

  def []= pos, value
    x,y = pos
    @grid[x][y] = value
  end

  def win?
    @grid.flatten.all? {|tile| tile.has_bomb || tile.revealed}
  end
end

class Game
  attr_accessor :board
  def initialize(col = 9, row = 9, num_bombs=10)
    @board = Board.new(col, row, num_bombs)
    @board.populate
    @lose = false
  end

  def save_board
    @saved_game = self.board.to_yaml
  end

  def load_board
    self.board = YAML::load(@saved_game)
  end

  def play
    until won? || lost?
      turn
    end
    @board.render_board
    puts "you won minsweeper" if won?
    puts "you lost HA HA" if lost?
  end

  def turn
    @board.render_board
    puts "please make a move #,# then 'f' for flag 'r' for reveal (ex. 1,0 f)"
    our_input = gets.chomp
    if our_input == 'load'
      self.load_board
      puts "please make a move #,# then 'f' for flag 'r' for reveal (ex. 1,0 f)"
      our_input = gets.chomp
    end
    if our_input == 'save'
      self.save_board
      puts "please make a move #,# then 'f' for flag 'r' for reveal (ex. 1,0 f)"
      our_input = gets.chomp
    end
    pos, move = our_input.split
    pos = pos.split(",").map(&:to_i)
    until @board.valid_move?(pos, move)
      puts "Not a valid move!" unless pos.nil?
      pos, move = gets.chomp.split
      pos = pos.split(",").map(&:to_i)
    end
    @board.make_move(pos, move)
    @lose = true if @board[pos].has_bomb
  end

  def won?
    @board.win?
  end

  def lost?
    @lose
  end
end


game = Game.new()
#p game.to_yaml
 game.play


# board = Board.new
# board.populate
# board.render_board
# board.reveal(0,0)
# board.render_board

# puts "lcation 0,0"
# p board[0,0].neighbor
#
#
# puts "lcation 1,1"
# p board[1,1].neighbor
#
# puts "lcation 8,5"
# p board[8,5].neighbor
#
# puts "lcation 2,8"
# p board[2,8].neighbor
