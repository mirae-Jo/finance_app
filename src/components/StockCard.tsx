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
  children: ReactNode;
}

export default function StockCard({ stock, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{stock.symbol}</CardTitle>
        <CardDescription>{stock.name}</CardDescription>

        <CardAction>{children}</CardAction>
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
