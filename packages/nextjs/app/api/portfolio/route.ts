import { NextResponse } from "next/server";

export async function GET() {
  const min = 10000;
  const max = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return NextResponse.json({ number: randomNumber * 1000000 });
}
