def max_window_niave(array, w)
  current_max_range = nil
  best_max_range = 0

  (0..array.length - w).each do |start|       #n-w
    # sub_array = array[start..-1].take(w)
    sub_array = array[start...start+w]          #how much does this cost
    p sub_array
    current_max_range = sub_array.max - sub_array.min     #w
    #min and max might be 2 * w each?

    if start == 0 || current_max_range > best_max_range
      best_max_range = current_max_range
    end

  end

  best_max_range
end
#big O is so weird!!!!    (n-w)*w  = nw - w^2 w < n
#w => n w max W = n
#n => large n
#n
#????????????????????????????????????????????????????????????????????????????????????????????????

def max_window_stack_queues(array, w)
  num_times = array.length
  que = array.shift(w)
  current_max_range = 0
  best_max_range = 0
  until array.empty?
    p que
    # shift to get rid of first, push to add to end
    first_num = que.shift
    last_num = que.last
    current_max_range = last_num - first_num
    if current_max_range > best_max_range
      best_max_range = current_max_range
    end
    que << array.shift unless array.empty?
  end

  best_max_range
end


#
puts "naive"
p max_window_niave([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
p max_window_niave([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
p max_window_niave([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
p max_window_niave([1, 3, 2, 5, 4, 8], 5) == 6

puts "stack_queue"
p max_window_stack_queues([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
p max_window_stack_queues([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
p max_window_stack_queues([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
p max_window_stack_queues([1, 3, 2, 5, 4, 8], 5) == 6
