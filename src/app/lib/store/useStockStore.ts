import { create } from "zustand";
import { getStockData } from "@/app/action";
import { Quote } from "@/app/type/types";
import { persist } from "zustand/middleware";

interface StockState {
  stocks: Quote[];
  updateTime: number | null;

  fetchStocks: () => Promise<void>;

  bookmarks: string[];
  toggleBookmark: (symbol: string) => void;
}

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      stocks: [],
      updateTime: null,

      fetchStocks: async () => {
        const data = await getStockData([
          "AAPL",
          "TSLA",
          "MSFT",
          "AMZN",
          "META",
          "GOOGL",
          "NVDA",
          "NFLX",
          "AVGO",
          "AMD",
          "PLTR",
          "ORCL",
        ]);

        if (!data) return;

        set({
          stocks: data.data,
          updateTime: data.updateAt,
        });

        const nextRefresh = 3600_000 - (Date.now() - data.updateAt);

        setTimeout(() => {
          get().fetchStocks();
        }, nextRefresh);
      },

      bookmarks: [],
      toggleBookmark: (symbol) =>
        set((state) => {
          // 이미 목록에 있는지 확인
          const isExist = state.bookmarks.includes(symbol);

          return {
            bookmarks: isExist
              ? state.bookmarks.filter((item) => item !== symbol) // 있으면 -> 뺌 (삭제)
              : [...state.bookmarks, symbol], // 없으면 -> 기존거 뒤에 붙임 (추가)
          };
        }),
    }),
    {
      name: "stock-storage",
      partialize: (state) => ({ bookmarks: state.bookmarks }),
    }
  )
);
