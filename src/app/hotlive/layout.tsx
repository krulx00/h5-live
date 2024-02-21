import LiveCategory from "@/components/LiveCategory";
import React from "react";
export default function HotLiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="p-2">
      <section className="mb-5">
        <LiveCategory />
      </section>
      <div>{children}</div>
    </div>
  );
}