import { runImport } from "./import-diving";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await runImport();
  return NextResponse.json(result);
}
