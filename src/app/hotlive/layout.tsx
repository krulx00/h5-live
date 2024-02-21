import LiveCategory from "@/components/LiveCategory";
import React from "react";
export default function HotLiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section>
        <LiveCategory/>
      </section>
      <div>{children}</div>
    </>
  );
}
