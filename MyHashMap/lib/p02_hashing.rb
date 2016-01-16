# class Fixnum
#   # Fixnum#hash already implemented for you
#
# end

class Array
  def hash
    arr = 27729
    idx = 1
    self.each do |el|
      arr = arr * idx + el.hash
      idx += 1
    end
    arr
  end
end

class String
  def hash
    str = 787464
    idx = 1
    self.split("").each do |el|
      str = str * idx + el.ord
      idx += 1
    end
    str
  end
end

class Hash
  def hash
      hsh = 4274
    self.each do |k, v|
      hsh = hsh + k.to_s.hash + v.to_s.hash
    end
    hsh
  end
end
