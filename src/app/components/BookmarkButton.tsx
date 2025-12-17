"use client";

import { useStockStore } from "@/app/lib/store/useStockStore";
import Image from "next/image";
// 꽉 찬 별(북마크) 이미지도 필요합니다. 일단 있는 거랑, 가상의 이미지를 쓴다고 가정할게요.
import unBookmarkIcon from "../../../public/bookmark_border_24dp_C5C016.svg";
import BookmarkIcon from "../../../public/bookmark_24dp_EDE60C.svg";

interface Props {
  symbol: string;
}

export default function BookmarkButton({ symbol }: Props) {
  // ✨ 주스탠드 훅은 여기서만 씁니다!
  const bookmarks = useStockStore((state) => state.bookmarks);
  const toggleBookmark = useStockStore((state) => state.toggleBookmark);

  // 내 심볼이 즐겨찾기 목록에 있니?
  const isMark = bookmarks.includes(symbol);

  return (
    <button
      style={{ cursor: "pointer" }}
      onClick={() => toggleBookmark(symbol)}>
      <Image
        // 즐겨찾기 상태에 따라 이미지를 바꾸거나 스타일을 줍니다.
        // (지금은 이미지가 하나뿐이니, isFavorite일 때 css filter 등을 주거나 이미지를 교체해야 함)
        src={isMark ? BookmarkIcon : unBookmarkIcon}
        alt='bookmark toggle'
      />
    </button>
  );
}
