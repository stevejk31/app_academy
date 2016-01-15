def my_min_phase_i(array)
  smallest_el = nil

  array.each do |el1| #zn
    compared_array = array.dup    #yn
    compared_array.delete(el1)

    if compared_array.all? {|el2| el2 > el1}   #rn
      smallest_el = el1
    end

  end

  smallest_el
end
#big O is n^2     n(n+n)

def my_min_phase_ii(array)
  smallest_el = array[0]

  array.drop(1).each do |el1|
    smallest_el = el1 if el1 < smallest_el
  end

  smallest_el
end

def largest_cont_sum_i(array)
  subsets = []

  (0...array.length).each do |i|
    (i+1...array.length).each do |i2|         #n
      subsets << array[i..i2]                 #n
    end
  end

  current_largest_sum = 0

  subsets.each do |subset|                                  #n
    temp_sum = subset.inject {|sum, num| sum + num}          #n
    current_largest_sum = temp_sum if current_largest_sum < temp_sum
  end

  current_largest_sum
end
#big O is n^2

def largest_cont_sum_ii(array)
  previous_sum = 0
  previous_current_sum = 0
  best_sum = -50
  previous_branch_sum = 0

  array.each do |num|
    current_branch_sum = previous_sum + num

    if previous_sum == 0 && (previous_branch_sum + num) > current_branch_sum
      current_branch_sum = previous_branch_sum + num
    end

    if current_branch_sum >= previous_sum
      previous_sum = current_branch_sum
    elsif current_branch_sum < previous_sum # if we hit a negative
      previous_sum = 0
      previous_branch_sum = current_branch_sum
    end

    if current_branch_sum > best_sum
      best_sum = current_branch_sum
    end

  end

  best_sum
end
