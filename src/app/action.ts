"use server";

import YahooFinance from "yahoo-finance2";

let cache: any = null;
let cacheTime = 0;
const CACHE_DURATION = 3600_000; // 1시간

export async function getStockData(symbols: string[]) {
  const now = Date.now();

  // 캐시가 있고, 아직 1시간이 지나지 않았다면 캐시 반환
  if (cache && now - cacheTime < CACHE_DURATION) {
    return {
      data: cache,
      updateAt: cacheTime,
    };
  }

  const yahooFinance = new YahooFinance();

  try {
    const results = await yahooFinance.quote(symbols);

    const formatted = results.map((stock) => ({
      symbol: stock.symbol,
      name: stock.shortName || stock.longName,
      price: stock.regularMarketPrice,
      change: stock.regularMarketChange,
      changePercent: stock.regularMarketChangePercent,
    }));

    // 캐시 저장
    cache = formatted;
    cacheTime = now;

    return {
      data: formatted,
      updateAt: now,
    };
  } catch (error) {
    console.log(error);
  }
}
