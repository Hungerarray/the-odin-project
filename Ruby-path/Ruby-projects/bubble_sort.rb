# frozen_string_literal: true

def bubble_sort(array)
  loop do
    swap = false
    num = array.length - 1
    num.times do |i|
      next unless array[i] > array[i + 1]

      array[i], array[i + 1] = array[i + 1], array[i]
      swap = true
    end
    break unless swap
  end
end

arrays = [[1, 4, 7, 5, 0, 7, 6, 7, 7, 9],
          [6, 2, 6, 1, 3, 7, 6, 7, 7, 5],
          [7, 8, 5, 5, 3, 3, 4, 1, 1, 4]]

arrays.each { |array| bubble_sort(array) }
pp arrays
