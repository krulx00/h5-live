"use client";
import axios, { AxiosHeaders } from "axios";
import { url } from "inspector";
import { headers } from "next/headers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function LiveCategory({}) {
  const [category, setCategory] = useState<Record<any, any>>({
    All: 1,
    Locked: 99,
    Toys: 2,
    Show: "1583463376967712769",
    Fun: "1583464242682724353",
    Star: "1583463902190084098",
    "Make Friends": "1583464139525734402",
    "Tiếng Việt": "1583463211715371010",
  });
  useEffect(() => {
    async function getCategory() {
      const categoryApiUrl =
        "https://fzo.clowcdn.com/501/api/live-service/h5/live/label/liveCenter/get";
      const response = await axios.post(categoryApiUrl, null, {
        headers: { merchantId: "501" },
      });
      for (let data of response.data) {
        category[data.labelName] = Number(data.id);
      }
      Object.entries(category).sort(([, a]: any, [, b]: any) => a - b);
    }
    getCategory();
  }, [category]);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || 1;
  return (
    <div className="flex gap-2">
      {Object.entries(category).map((value, index) => (
        <a
          href={`?category=${value[1]}`}
          //   onClick={x}
          className={`bg-[#ededed] px-3 rounded-md py-1`}
          key={value[1]}
        >
          {value[0]}
        </a>
      ))}
    </div>
  );
}
