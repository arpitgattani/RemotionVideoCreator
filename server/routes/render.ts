import express, { Request, Response } from "express";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const inputProps = req.body;

    await (
      await import("fs/promises")
    ).writeFile(
      path.join(process.cwd(), "example.json"),
      JSON.stringify(inputProps, null, 2),
    );
    const bundleLocation = path.join(process.cwd(), "bundle");

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "maindemo",
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
    return res.status(200).json({ message: "Render done!" });
  } catch (error: unknown) {
    console.error("Render error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res
      .status(500)
      .json({ error: "Failed to render video", message: errorMessage });
  }
});

export default router;
