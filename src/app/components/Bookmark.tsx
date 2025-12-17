"use client";

import { useStockStore } from "@/app/lib/store/useStockStore";
import StockCard from "./StockCard";
import BookmarkButton from "./BookmarkButton";

const Bookmark = () => {
  const stocks = useStockStore((state) => state.stocks);
  const bookmarks = useStockStore((state) => state.bookmarks);

  // 즐겨찾기 목록에 있는 종목만 걸러냄
  const myStocks = stocks.filter((stock) => bookmarks.includes(stock.symbol));

  // 즐겨찾기 없으면 안내 문구
  if (myStocks.length === 0) {
    return <div className='p-4 text-gray-500'>아직 관심 종목이 없습니다.</div>;
  }

  return (
    <div className='w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      {myStocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock}>
          <BookmarkButton symbol={stock.symbol} />
        </StockCard>
      ))}
    </div>
  );
};

export default Bookmark;
