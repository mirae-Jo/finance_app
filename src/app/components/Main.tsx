"use client";

import { useStockStore } from "@/app/lib/store/useStockStore";
import StockCard from "./StockCard";
import BookmarkButton from "./BookmarkButton";

const Main = () => {
  const stocks = useStockStore((state) => state.stocks);

  return (
    <div className='w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {stocks?.map((stock) => (
        <StockCard key={stock.symbol} stock={stock}>
          <BookmarkButton symbol={stock.symbol} />
        </StockCard>
      ))}
    </div>
  );
};

export default Main;
