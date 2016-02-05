def func(start, end1)
  result = []
  return result << start  if start == end1
  result.concat(func(start, end1-1) + [end1])
  return result
end

p func(1,5)

def fib(num)
  return [1] if num == 1
  return [1, 1] if num == 2
  result = fib(num-1)
  return result << (result[-1]+result[-2])
end

p fib(5)

def bsearch(array, target)
  # if array.length == 1
  #   return nil if array.first != target
  # end
  if array.length == 1
    return 0 if array.first == target
  end
  mid = array.length/2
  mid_num = array[mid]
  left_array = array.take(mid)
  right_array = array.drop(mid+1)
  if mid_num == target
    return mid
  elsif mid_num < target
    return mid + 1 + bsearch(right_array, target)
  elsif mid_num > target
    return bsearch(left_array, target)
  end
end

p bsearch([1,2,3,4,5,6,7,8, 9], 5)
