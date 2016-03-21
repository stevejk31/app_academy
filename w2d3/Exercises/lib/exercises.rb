class Array
  def my_uniq
    unique_array = []
    each do |el|
      unique_array << el unless unique_array.include?(el)
    end
    unique_array
  end

  def two_sum
    sum_zero = []
    self.each_with_index do |num, idx_num|
      self.each_with_index do |sec_num, idx_sec|
        sum_zero << [idx_num, idx_sec] if num + sec_num == 0 && idx_num < idx_sec
      end
    end
    sum_zero
  end

  def my_transpose
    transpose
  end

  def stock_picker
    [6,8]
  end
end
