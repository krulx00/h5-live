"use client";

import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import {IoEye, IoEyeOutline} from 'react-icons/io5'
import ReactCountryFlag from "react-country-flag"

interface RoomDataType {
  id: string;
  coverUrl: string;
  liveName: string;
  anchorId: string;
  anchorNickname: string;
  area: string;
  onlineCount: number;
  showUiArea: string;
}
function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || 1;
  const [roomList, setRoomList] = useState<RoomDataType[]>([]);
  useEffect(() => {
    const fetchRoomList = async () => {
      const roomListUrl = `https://api.t3cdn.com/501/api/live-service/h5/v5/public/live/lives?pageNum=1&pageSize=1000&labelId=${category}`;
      const headers = {
        merchantid: "501",
        "locale-language": "IND",
        "dev-type": "H5",
        authorization: "Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=",
        area: "ID",
        "Content-Type": "text/plain",
      };
      const response = await axios.post(roomListUrl, roomListUrl, { headers });
      setRoomList(response.data.records);
    };
    fetchRoomList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense fallback={<>Loading...</>}>
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
    </Suspense>
  );
}

export default Page;
