require "colorize"
require_relative "cursorable"

class Display
  include Cursorable

  def initialize(board)
    @board = board
    @cursor_pos = [0, 0]
  end

  def build_grid
    @board.rows.map.with_index do |row, i|
      build_row(row, i)
    end
  end

  def build_row(row, i)
    row.map.with_index do |piece, j|
      color_options = colors_for(i, j, piece.color)
      piece.value.colorize(color_options)
    end
  end

  def colors_for(i, j, color)
    if [i, j] == @cursor_pos
      bg = :light_red
    elsif (i + j).odd?
      bg = :light_blue
    else
      bg = :magenta
    end
    { background: bg, color: color}
  end

  def render
    system("clear")
    puts "Use arrow keys to move a piece."
    build_grid.each { |row| puts row.join }
  end
end
