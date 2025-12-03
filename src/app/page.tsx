"use client";

// import { fetchStock } from "./lib/api/stock";
import { useEffect, useState } from "react";
import { getStockData } from "./action";

import Main from "@/components/Main";

export type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

export default function Home() {
  const [state, setState] = useState<Quote[]>([]);
  const [updateTime, setUpdateTime] = useState<string>();

  const callStockData = async () => {
    const data = await getStockData([
      "AAPL",
      "TSLA",
      "MSFT",
      "AMZN",
      "META",
      "GOOGL",
    ]);

    if (!data) return;

    setUpdateTime(new Date(data.updateAt).toLocaleTimeString("ko-KR"));
    setState(data.data);

    const nextRefresh = 3600_000 - (Date.now() - data.updateAt);
    setTimeout(callStockData, nextRefresh);
  };

  useEffect(() => {
    callStockData();
  }, []);

  return (
    <div className='w-full p-5'>
      <p>{updateTime} 업데이트</p>

      <Main state={state} />
    </div>
  );
}
