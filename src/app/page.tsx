"use client";

import mock from "@/app/lib/mock.json";
import { fetchStock } from "./lib/api/stock";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState(JSON.stringify(mock));

  const callRealStockBtn = async () => {
    const data = await fetchStock();

    if (data["Global Quoto"]) {
      setState(data);
    } else if (data.Information || data.Note || data["Error Message"]) {
      console.log("API 오류 응답: ", data);
    } else {
      console.log("예상치 못한 응답 형식: ", data);
    }
  };

  return (
    <div>
      <button onClick={callRealStockBtn}>실제 데이터</button>
      {state}
    </div>
  );
}
