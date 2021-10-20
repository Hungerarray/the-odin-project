# frozen_string_literal: true

def substrings(text, dictionary)
  dictionary.each_with_object(Hash.new(0)) do |value, total|
    reg_exp = Regexp.new(value, Regexp::IGNORECASE)
    matches = text.scan(reg_exp)
    total[value] = matches.length unless matches.length.zero?
  end
end

dictionary = %w[below down go going horn how howdy it i low own part partner sit]

pp substrings('below', dictionary)
pp substrings("Howdy partner, sit down! How's it going?", dictionary)
