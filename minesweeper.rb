

class Tile
  def initialize(has_bomb = false)
    @has_bomb = has_bomb
    @flagged = false
    @revealed = false
  end

  def put_flag
    @flagged = true
  end

  def remove_flag
    @flagged = false
  end

  def reveal
    raise "already_revealed" if @revealed
    @revealed = true
  end

  def inspect
    @has_bomb ? 'B' : '*'
  end

end

class Board
  attr_reader :grid
  def initialize(col = 9, row = 9, num_bombs=10)
    @grid = Array.new(col) {Array.new(row){0}}
    @num_bombs = num_bombs
  end

  def populate
    safe_spots = @grid.flatten.length - @num_bombs
    all_tiles = []
    @num_bombs.times { all_tiles << Tile.new(true) }
    safe_spots.times { all_tiles << Tile.new(false) }
    all_tiles.shuffle!
    @grid.each_index do |col|
      @grid[col].each_index do |row|
        self[col,row] = all_tiles.pop
      end
    end
  end

  def [] row, col
    @grid[row][col]
  end

  def []= row, col, value
    @grid[row][col] = value
  end

end

class Game
  def initialization

  end
end
