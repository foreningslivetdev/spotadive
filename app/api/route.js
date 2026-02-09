import { NextResponse } from "next/server";
import { runImport } from "@/scripts/import-diving";

export async function POST(request) {
  const auth = request.headers.get("authorization");

  if (auth !== `Bearer ${process.env.IMPORT_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await runImport();

  return NextResponse.json({ status: "ok" });
}
