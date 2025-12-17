"use client";

// import { fetchStock } from "./lib/api/stock";
import { useEffect } from "react";

import Main from "@/app/components/Main";
import Bookmark from "@/app/components/Bookmark";
import { TrendingUp } from "lucide-react";
import { useStockStore } from "./lib/store/useStockStore";

export default function Home() {
  const { fetchStocks } = useStockStore();
  const updateTime = useStockStore((state) => state.updateTime);

  const formattedTime = updateTime
    ? new Date(updateTime).toLocaleTimeString("ko-KR")
    : "업데이트 중...";

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className='w-full'>
      <h1 className='text-3xl px-20 py-5 border-b-2 bg-white flex gap-3 items-center'>
        <div className='w-10 h-10 bg-blue-500 rounded-lg items-center justify-center flex'>
          <TrendingUp className='h-6 w-6 text-primary-foreground' />
        </div>
        주식 시세 대시보드
      </h1>
      <div className='w-full px-20 pt-3 pb-10'>
        <p className='text-right pb-3 text-[#777] pr-1'>
          {formattedTime} 업데이트
        </p>
        <div>
          <h3>관심종목</h3>
          <Bookmark />
        </div>
        <div>
          <h3>전체종목</h3>
          <Main />
        </div>
      </div>
    </div>
  );
}
