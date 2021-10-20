# frozen_string_literal: true

def stock_picker(stocks)
  curr_max = local_min = curr_min = stocks[0]
  curr_diff = curr_max - curr_min

  stocks.each do |stock|
    local_min = local_min < stock ? local_min : stock
    new_diff = stock - local_min
    next unless curr_diff < new_diff

    curr_max = stock
    curr_min = local_min
    curr_diff = new_diff
  end

  [stocks.index(curr_min), stocks.index(curr_max)]
end

stocks = [17, 3, 6, 9, 15, 8, 6, 1, 10]

pp stock_picker(stocks)
