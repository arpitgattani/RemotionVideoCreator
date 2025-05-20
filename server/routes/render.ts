import express, { Request, Response } from "express";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { uploadFileToS3, getSignedUrl } from "../utils/s3-utils.js";
import { nanoid } from "nanoid";

const router = express.Router();

interface ResponseWithFlush extends Response {
  flush?: () => void;
}

router.post(
  "/:eventId/:compositionId",
  async (req: Request, res: ResponseWithFlush) => {
    const eventId = req.params.eventId;
    const compositionId = req.params.compositionId || "maindemo";

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    console.log(eventId, compositionId);
    const sendProgress = (data: Record<string, unknown>) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      if (res.flush) {
        res.flush();
      }
    };

    try {
      const inputProps = req.body;

      sendProgress({
        type: "info",
        message: "Starting render process",
        progress: 0,
      });

      const fileName = `${nanoid(8)}.mp4`;
      const outputPath = path.join(process.cwd(), "out", fileName);

      await (
        await import("fs/promises")
      ).writeFile(
        path.join(process.cwd(), "example.json"),
        JSON.stringify(inputProps, null, 2),
      );

      sendProgress({ type: "info", message: "Input props saved", progress: 5 });

      const bundleLocation = path.join(process.cwd(), "bundle");
      const timestamp = Date.now();
      const extension = path.extname(fileName);
      const baseName = path.basename(fileName, extension);
      const customKey = `${eventId}/happimomentvideos/${baseName}_${timestamp}${extension}`;

      console.log("customKey", customKey);

      sendProgress({
        type: "info",
        message: "Selecting composition",
        progress: 10,
      });

      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps,
      });

      sendProgress({
        type: "info",
        message: "Composition selected",
        progress: 15,
      });
      sendProgress({
        type: "info",
        message: "Starting video rendering",
        progress: 20,
      });

      await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: "h264",
        outputLocation: outputPath,
        concurrency: 8,
        logLevel: "verbose",
        inputProps,
        chromiumOptions: {
          gl: "angle",
        },
        onProgress: ({ progress }) => {
          const percentComplete = 20 + Math.round(progress * 60);
          sendProgress({
            type: "progress",
            message: `Rendering video: ${Math.round(progress * 100)}%`,
            progress: percentComplete,
          });
        },
      });

      sendProgress({
        type: "info",
        message: "Render complete, uploading to S3",
        progress: 80,
      });

      const s3Result = await uploadFileToS3(outputPath, {
        customKey,
        metadata: {
          compositionId: composition.id,
          aspectRatio: inputProps.aspectRatio || "16:9",
          resolution: inputProps.resolution || "1080p",
          createdAt: new Date().toISOString(),
        },
      });

      sendProgress({
        type: "info",
        message: "Upload complete, generating signed URL",
        progress: 90,
      });

      const signedUrl = await getSignedUrl(s3Result.key, 24 * 60 * 60);
      console.log(signedUrl, "Signed URL");
      sendProgress({
        type: "complete",
        message: "Process complete",
        progress: 100,
        data: {
          success: true,
          url: signedUrl,
          eventId,
        },
      });

      res.end();
    } catch (error: unknown) {
      console.error("Render error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      sendProgress({
        type: "error",
        message: `Failed to render video: ${errorMessage}`,
        data: {
          success: false,
          error: "Failed to render video",
          message: errorMessage,
          eventId,
        },
      });

      res.end();
    }
  },
);

export default router;
