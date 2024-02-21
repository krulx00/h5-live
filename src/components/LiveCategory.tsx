"use client";
import axios, { AxiosHeaders } from "axios";
import { url } from "inspector";
import { headers } from "next/headers";
import { useEffect, useState } from "react";
export default function LiveCategory({}) {
  const [category, setCategory] = useState<Record<any, any>>({
    All: 1,
    Toys: 2,
  });
  useEffect(() => {
    async function getCategory() {
      const categoryApiUrl =
        "https://api.t3cdn.com/501/api/live-service/h5/live/label/liveCenter/get";
      const response = await axios.post(categoryApiUrl, null, {
        headers: { merchantId: "501" },
      });
      for (let data of response.data) {
        category[data.labelName] = Number(data.id);
      }
      Object.entries(category).sort(([, a]: any, [, b]: any) => a - b);
      console.log("rerender");
    }
    getCategory();
  }, [category]);

  return (
    <div className="flex gap-2 p-2 ">
      {Object.keys(category).length > 2 &&
        Object.keys(category).map((value, index) => (
          <button
            //   onClick={x}
            className={`bg-[#ededed] px-3 rounded-md py-1`}
            key={index}
          >
            {value}
          </button>
        ))}
    </div>
  );
}
