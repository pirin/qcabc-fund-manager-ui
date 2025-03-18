import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const min = 10000;
  const max = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const timestamp = req.nextUrl.searchParams.get("ts") || Date.now();

  return NextResponse.json(
    { portfolioValue: randomNumber * 1000000, timestamp: timestamp },

    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    },
  );
}
