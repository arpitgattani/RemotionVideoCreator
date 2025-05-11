import { NextRequest, NextResponse } from "next/server";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

export async function POST(req: NextRequest) {
  const inputProps = await req.json();

  console.log(inputProps);
  const bundleLocation = path.join(process.cwd(), "worker/src/bundle");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "video",
    inputProps,
  });

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",

    outputLocation: `out/video.mp4`,
    logLevel: "verbose",
    inputProps,
    chromiumOptions: {
      gl: "angle",
    },
  });

  console.log("Render done!");
  return NextResponse.json({ message: "Render done!" });
}
