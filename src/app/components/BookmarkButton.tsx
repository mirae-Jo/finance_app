"use client";

import { useStockStore } from "@/app/lib/store/useStockStore";
import Image from "next/image";

import unBookmarkIcon from "../../../public/bookmark_border_24dp_C5C016.svg";
import BookmarkIcon from "../../../public/bookmark_24dp_EDE60C.svg";

interface Props {
  symbol: string;
}

export default function BookmarkButton({ symbol }: Props) {
  const bookmarks = useStockStore((state) => state.bookmarks);
  const toggleBookmark = useStockStore((state) => state.toggleBookmark);

  const isMark = bookmarks.includes(symbol);

  return (
    <button className='cursor-pointer' onClick={() => toggleBookmark(symbol)}>
      <Image
        src={isMark ? BookmarkIcon : unBookmarkIcon}
        alt='bookmark toggle'
      />
    </button>
  );
}
