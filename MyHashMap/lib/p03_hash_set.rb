require_relative 'p02_hashing'

class HashSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    resize! if num_buckets == @count
    self[num] << num
    @count += 1
  end

  def remove(num)
    if self[num].include?(num)
      @count -= 1
      self[num].delete(num)
    end
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    bucket = num.hash % num_buckets
    @store[bucket]
  end

  def num_buckets
    @store.length
  end

  def resize!
    # num_buckets = @store.length + 1
    new_num_bucket = num_buckets * 2
    old_store = @store.flatten
    @store = Array.new(new_num_bucket) { Array.new }
    @count = 0
    old_store.each do |el|
      self.insert(el)
    end
  end
end
