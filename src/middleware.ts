import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import * as fs from "fs";
import { myLogger } from "./utils/accessLogger";
export async function middleware(req: NextRequest) {
  const { ua } = userAgent(req);
  const { geo } = req;
  const path = req.nextUrl.pathname;
  const headerList = headers();
  const ip = headerList.get("x-forwarded-for");
  const logText = `${ip} | ${geo?.city} | ${path} | ${ua}`;
  myLogger(logText);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/hotlive", "/live/:path*"],
};
