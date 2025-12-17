"use client";

import { useStockStore } from "@/app/lib/store/useStockStore";
import StockCard from "./StockCard";
import BookmarkButton from "./BookmarkButton";

const Main = () => {
  const stocks = useStockStore((state) => state.stocks);

  return (
    <div className='w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {stocks?.map((stock) => (
        <StockCard
          key={stock.symbol}
          stock={stock}
          // 여기서 버튼을 누르면 -> 스토어 업데이트 -> Bookmark 컴포넌트에 즉시 반영됨
          action={<BookmarkButton symbol={stock.symbol} />}
        />
      ))}
    </div>
  );
};

export default Main;
