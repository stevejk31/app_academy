def first_anagram?(word, anagram_word)
  perm_words = word.split("").permutation(word.length)      #n^2
  perm_words = perm_words.to_a.map {|array| array.join("")}
  perm_words.include?(anagram_word)
end
#big O n^2

def second_anagram?(word, anagram_word)
  return false if word.length != anagram_word.length
  word_counter = 0
  word_array = word.split("")
  anagram_array = anagram_word.split("")
  word_array.each_with_index do |letter, word_idx|
    anagram_array.each_with_index do |anagram_letter, anagram_idx|
      if letter == anagram_letter
        # word_array.delete_at(word_idx)
        # anagram_array.delete_at(anagram_idx)
        word_counter += 1
      end
    end
  end

  word_array.length == word_counter
end
#big O = n^2

def third_anagram?(word, anagram_word)
  word.split('').sort == anagram_word.split('').sort
end
# nlog(n) depending on sort method

def fourth_anagram?(word, anagram_word)
  word_hash = Hash.new { |hash, key| hash[key] = 0}
  anagram_hash = Hash.new { |hash, key| hash[key] = 0}
  word.each_char do |letter|
    word_hash[letter] += 1
  end
  anagram_word.each_char do |anagram_letter|
    anagram_hash[anagram_letter] += 1
  end
  word_hash == anagram_hash
end
#big O is N


def hash_anagram?(word, anagram_word)
  word_hash = Hash.new { |hash, key| hash[key] = 0}
  word.each_char do |letter|
    word_hash[letter] += 1
  end
  anagram_word.each_char do |anagram_letter|
    word_hash[anagram_letter] += 1
  end
  # word_hash.keys.length == word.length
  word_hash.values.all? {|val| val % 2 == 0}
end
#big O is n depending on hash time
p hash_anagram?("gizmo", "sally")
p hash_anagram?("elvis", "lives")
