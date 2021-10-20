# frozen_string_literal: true

def stock_picker(stocks)
  max_stocks = []
  # for each day, find the maximum among the remaining days
  stocks.each_with_index do |stock, day|
    nxt_day = day + 1
    mstock = stocks[nxt_day..-1].max || 0
    mstock_day = stocks.index(mstock)
    max_stocks.push([day, mstock_day, mstock - stock])
  end
  # find the maximum and the corresponding days
  max_stock = max_stocks.max_by { |stock| stock[2] }
  max_stock[0...-1]
end

stocks = [17, 3, 6, 9, 15, 8, 6, 1, 10]
stock_days = stock_picker(stocks)
pp stock_days
