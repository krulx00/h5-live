import React from "react";
export default function HotLiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="p-2 min-h-[100vh]">
      <div>{children}</div>
    </div>
  );
}