class Link
  attr_accessor :key, :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end
end

class LinkedList
  extend Enumerable
  def initialize
    @list = Hash.new { |h,k| h[k] = nil }
    @first = nil
    @last = nil
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @first
  end

  def last
    @last
  end

  def empty?
    @first.nil?
  end

  def get(key)
    if @list[key].is_a?(Link)
      @list[key].val
    else
      nil
    end
  end

  def include?(key)
    @list[key].is_a?(Link)
  end

  def insert(key, val)
    a = Link.new(key, val)
    a.prev = @last
    @last.next = a unless @last.nil?
    @last = a
    @first = a if @first.nil?
    @list[a.key] = a
  end

  def remove(key)
      @list.delete(key)
  end

  def each
    idx = @first
    until @last == idx
      yield(idx)
      idx = idx.next
    end
    yield(idx)
  end

  # uncomment when you have `each` working and `Enumerable` included
  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
