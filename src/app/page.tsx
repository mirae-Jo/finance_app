"use client";

// import { fetchStock } from "./lib/api/stock";
import { useEffect, useState } from "react";
import { getStockData } from "./action";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

export default function Home() {
  const [state, setState] = useState<Quote[]>();
  const [updateTime, setUpdateTime] = useState("0");

  const callStockData = async () => {
    const data = await getStockData([
      "AAPL",
      "TSLA",
      "MSFT",
      "AMZN",
      "META",
      "GOOGL",
    ]);

    const now = new Date(); // 객체 인스턴스

    setUpdateTime(now.toLocaleTimeString("ko-KR"));
    setState(data);
  };

  useEffect(() => {
    callStockData();

    const intervalId = setInterval(callStockData, 600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='w-full p-5'>
      <p>{updateTime} 업데이트</p>

      <div className='w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {state?.map((Quote) => (
          <Card key={Quote.name}>
            <CardHeader>
              <CardTitle>{Quote.symbol}</CardTitle>
              <CardDescription>{Quote.name}</CardDescription>
            </CardHeader>
            <CardFooter>
              <p>{Quote.price}$</p>
              <span>({Math.round(Quote.changePercent * 100) / 100}%)</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
