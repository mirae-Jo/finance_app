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
    <div className='w-full'>
      <h1 className='text-3xl px-10 py-3 border-b-2 bg-white'>
        주식 시세 대시보드
      </h1>
      <div className='w-full px-10 pt-3'>
        <p className='text-right pb-3 text-[#777]'>{updateTime} 업데이트</p>
        <Main state={state} />
      </div>
    </div>
  );
}
