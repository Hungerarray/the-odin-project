# frozen_string_literal: true

def char_shift(char, shift)
  char_val = char.ord
  # for lowercase characters
  if char_val.between?('a'.ord, 'z'.ord)
    char_val += shift
    char_val = char_val > 'z'.ord ? char_val % ('z'.ord + 1) + 'a'.ord : char_val
  # for uppercase characters
  elsif char_val.between?('A'.ord, 'Z'.ord)
    char_val += shift
    char_val = char_val > 'Z'.ord ? char_val % ('Z'.ord + 1) + 'A'.ord : char_val
  end
  char_val.chr
end

def caesar_cipher(text, shift)
  shifted_text = []
  text.each_char { |char| shifted_text.push(char_shift(char, shift)) }
  shifted_text.join
end

puts caesar_cipher('What a string!', 5)
puts caesar_cipher('Za', 2)
