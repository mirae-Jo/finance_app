// components/StockCard.tsx
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Quote } from "@/app/type/types";
import { ReactNode } from "react";

interface Props {
  stock: Quote;
  action?: ReactNode;
}

export default function StockCard({ stock, action }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{stock.symbol}</CardTitle>
        <CardDescription>{stock.name}</CardDescription>

        {/* ✨ 여기가 핵심입니다. 부모가 넣어준 버튼을 그대로 렌더링합니다. */}
        <CardAction>{action}</CardAction>
      </CardHeader>

      <CardFooter>
        <p>{stock.price}$</p>
        <span className='ml-2 text-sm text-gray-500'>
          ({Math.round(stock.changePercent * 100) / 100}%)
        </span>
      </CardFooter>
    </Card>
  );
}
