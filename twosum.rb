def two_sum?(arr, target_sum)
  arr.each do |num|
    arr.each do |num2|
      return true if num + num2 == target_sum && num != num2
    end
  end
  false
end

def okay_two_sum?(array, target_sum)
  sorted = array.sort
  btrue = false
  i = 0
  until i == array.length || btrue
    num = array[i]
    target_difference = target_sum - num
    b_index = bsearch(sorted, target_difference)
    btrue = true if !b_index.nil? && b_index != i


    i += 1
  end

  btrue
end
#big 0 nlog(n)




def pair_sum?(array, target_sum)
  sum = Hash.new { |hash, key| hash[key] = 0 }
  array.each do |num|
    sum[num] += 1
  end
  array.each do |num|
    target_difference = target_sum - num
    num_nums = sum[num]
    bool = sum.has_key?(target_difference)
    if num == target_difference && num_nums == 1
      bool = false
    end
    return bool if bool
  end
  false
end

# big O is n




def bsearch(nums, target)
  return nil if nums.empty?

  probe_index = nums.length / 2
  case target <=> nums[probe_index]
  when -1
    bsearch(nums.take(probe_index), target)
  when 0
    probe_index
  when 1

    sub_answer = bsearch(nums.drop(probe_index + 1), target)
    (sub_answer.nil?) ? nil : (probe_index + 1) + sub_answer
  end

end
