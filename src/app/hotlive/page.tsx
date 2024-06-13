"use client";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import {
  IoEye,
  IoEyeOutline,
  IoLockClosedOutline,
  IoLockOpenOutline,
} from "react-icons/io5";
import ReactCountryFlag from "react-country-flag";

interface RoomDataType {
  id: string;
  coverUrl: string;
  liveName: string;
  anchorId: string;
  anchorNickname: string;
  area: string;
  onlineCount: number;
  showUiArea: string;
  buy?: boolean;
  payType: number;
}
function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || 1;
  const [roomList, setRoomList] = useState<RoomDataType[]>([]);
  useEffect(() => {
    const fetchRoomList = async () => {
      let cat = category;
      if (cat == "99") cat = 1;
      const roomListUrl = `https://fzo.clowcdn.com/532/api/live-service/h5/v5/public/live/lives?pageNum=1&pageSize=1000&labelId=${cat}`;
      const headers = {
        memberid: "1760461158972575746",
        sign: "11f569ed792da4e0cff8a393534a5bf2",
        "dev-type": "iOS_iPhone 15 Pro Max",
        merchantid: "532",
        area: "ID",
        "locale-language": "ENU",
        membertype: "1",
        "Content-Type": "text/plain",
      };
      const response = await axios.post(roomListUrl, roomListUrl, {
        headers,
      });
      const data: RoomDataType[] = response.data.records;

      console.log(data.length)
      setRoomList(data);
      if (category === "99") {
        setRoomList((roomList) => roomList.filter((w) => w.payType === 2));
      }
    };
    fetchRoomList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
      {roomList?.map((d) => (
        <a
          className="border flex rounded overflow-hidden shadow-lg sm:h-40 lg:h-44"
          key={d.anchorId}
          href={`/live/${d.anchorId}`}
          target="_blank"
        >
          <div>
            <Image
              src={d.coverUrl}
              alt="AnchorId"
              className="w-full h-full object-cover"
              width={500}
              height={500}
              loading="lazy"
              quality={100}
            />
          </div>

          <div className="w-full flex-1">
            <div className="p-2">
              <div>
                <p className="font-bold text-xl w-full">
                  {`${d.liveName !== d.anchorNickname ? `${d.liveName}` : "-"}`}
                </p>
                <p className="font-medium">{d.anchorNickname}</p>
                <p className="font-light text-xs">{d.id}</p>
              </div>

              <div className="mt-2">
                {d.payType === 2 ? (
                  <p className="flex items-center justify-start align-middle gap-1 text-sm">
                    <IoLockClosedOutline /> Room Lock
                  </p>
                ) : (
                  <p className="flex items-center justify-start align-middle gap-1 text-sm">
                    <IoLockOpenOutline /> Room Unlocked
                  </p>
                )}
                <p className="flex items-center align-middle gap-1 text-sm">
                  <ReactCountryFlag countryCode={d.area} svg />
                  {d.area}
                </p>

                <p className="flex items-center justify-start align-middle gap-1 text-sm">
                  <IoEyeOutline />
                  {d.onlineCount}
                </p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default Page;
