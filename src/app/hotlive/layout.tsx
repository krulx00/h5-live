import LiveCategory from "@/components/LiveCategory";
import React, { Suspense } from "react";
export default function HotLiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="p-2">
        <section className="mb-5">
          <LiveCategory />
        </section>
        <div>{children}</div>
      </div>
    </Suspense>
  );
}
