import { NextResponse } from "next/server";

export async function GET() {
  const min = 10000;
  const max = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return NextResponse.json(
    { portfolioValue: randomNumber * 1000000 },
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
