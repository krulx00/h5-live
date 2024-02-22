"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import ReactPlayer from "react-player";
import { decryptStreamingLink } from "@/utils/aesDecrypt";
import Head from "next/head";
interface RoomInfoType {
  anchorHeadPortrait: string;
  anchorId: string;
  anchorNickName: string;
  bauble: boolean;
  card: string;
  coverUrl: string;
  createTime: string;
  nowTime: string;
  liveName: string;
  pullAddress: string;
  pullAddressHighDefinition: string;
  pullAddressSmooth: string;
  pullAddressStandardDefinition: string;
  pullLCAddress: string;
  watchUserCounts: number;
  area: string;
  buy?: boolean;
  payType: number;
}
export default function LiveRoom() {
  const params = useParams();
  const { anchorId } = params;
  const [roomData, setRoomData] = useState<RoomInfoType>();
  const [streamingLink, setStreamingLink] = useState<string>();
  const [swipeData, setSwipeData] = useState<{ anchorId: string }[]>([]);
  useEffect(() => {
    const fetchRoomInfo = async () => {
      const headers = {
        "content-type": "application/json",
        merchantid: "501",
        "locale-language": "ENU",
        "dev-type": "H5",
        authorization: "Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=",
        area: "ID",
      };
      let data = JSON.stringify({
        anchorId,
      });
      const roomInfoUrl =
        "https://fzo.clowcdn.com/501/api/live-service/h5/v3/public/live/room-info";
      const response = await axios.post(roomInfoUrl, data, { headers });
      setRoomData(response.data);
    };

    const fetchSwipeInfo = async () => {
      const headers = {
        "dev-type": "iOS_iPhone 15 Pro Max",
        merchantid: "501",
        area: "ID",
        "locale-language": "ENU",
        membertype: "1",
        "content-type": "application/json",
      };
      let data = JSON.stringify({
        anchorId: anchorId,
      });
      const swipeInfoUrl =
        "https://fzo.clowcdn.com/501/api/live-service/v3/public/live/swipe-switch";

      const response = await axios.post(swipeInfoUrl, data, { headers });
      setSwipeData(response.data);
    };
    fetchRoomInfo();
    fetchSwipeInfo();
  }, [anchorId]);

  useEffect(() => {
    if (roomData?.pullAddress) {
      const streamUrl = decryptStreamingLink(roomData.pullAddress);
      setStreamingLink(streamUrl);
    }
  }, [roomData]);

  const setStreamingResolution = (cipherStream: string) => {
    const streamUrlNew = decryptStreamingLink(cipherStream);
    setStreamingLink(streamUrlNew);
  };
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta property="og:title" content="Title Here" />
        <meta property="og:description" content="Description Here" />
      </Head>
      {roomData && (
        <div className="w-full border">
          <section className="p-2 flex gap-2">
            <div>
              <Image
                className="max-h-10 rounded max-w-10"
                src="https://aaa.m1cdn.com/20240216/36eec45346cd4be5a6875ad3bf370cbb.jpg"
                width={200}
                height={200}
                priority={true}
                alt={`profileImage`}
              />
            </div>

            <div className="flex flex-col gap-0">
              <p className="text-md font-medium flex items-center gap-2">
                {roomData?.anchorNickName}
                <ReactCountryFlag countryCode={roomData?.area || "ID"} svg />

                {roomData?.payType === 2 ? (
                  <IoLockClosedOutline />
                ) : (
                  <IoLockOpenOutline />
                )}
              </p>
              <div className="text-sm flex flex-row gap-2 justify-start items-center">
                <p>{roomData?.liveName}</p>
                <span className="flex gap-0.5  items-center">
                  <IoPeopleOutline />
                  <p>190</p>
                </span>
              </div>
            </div>
          </section>

          <div className="bg-black h-full ">
            <ReactPlayer
              height={"calc(var(--vh, 1vh) * 70)"}
              width={"100%"}
              url={streamingLink}
              controls={true}
              autoPlay={true}
              playing={true}
            />
          </div>

          <div className="flex p-2 w-full justify-between items-center">
            <div>
              <a href={`/live/${swipeData[0]?.anchorId || anchorId}`}>
                {`<-`} Prev
              </a>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-blue-400 text-white text-lg font-medium px-3 py-1 rounded-md"
                onClick={() =>
                  setStreamingResolution(roomData.pullAddressHighDefinition)
                }
              >
                HD
              </button>

              <button
                className="bg-blue-400 text-white text-lg font-medium px-3 py-1 rounded-md"
                onClick={() =>
                  setStreamingResolution(roomData.pullAddressStandardDefinition)
                }
              >
                SD
              </button>
              <button
                className="bg-blue-400 text-white text-lg font-medium px-3 py-1 rounded-md"
                onClick={() => setStreamingResolution(roomData.pullAddress)}
              >
                Standard
              </button>

              <button
                className="bg-blue-400 text-white text-lg font-medium px-3 py-1 rounded-md"
                onClick={() =>
                  setStreamingResolution(roomData.pullAddressSmooth)
                }
              >
                Smooth
              </button>

              <button
                className="bg-blue-400 text-white text-lg font-medium px-3 py-1 rounded-md"
                onClick={() => setStreamingResolution(roomData.pullLCAddress)}
              >
                LC
              </button>
            </div>

            <div>
              <a href={`/live/${swipeData[2]?.anchorId || anchorId}`}>
                Next {`->`}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
