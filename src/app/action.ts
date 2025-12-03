"use server";

import YahooFinance from "yahoo-finance2";

export async function getStockData(symbols: string[]) {
  const yahooFinance = new YahooFinance();

  try {
    const results = await yahooFinance.quote(symbols);

    return results.map((stock) => ({
      symbol: stock.symbol,
      name: stock.shortName || stock.longName,
      price: stock.regularMarketPrice,
      change: stock.regularMarketChange,
      changePercent: stock.regularMarketChangePercent,
    }));
  } catch (error) {
    console.log(error);
  }
}
