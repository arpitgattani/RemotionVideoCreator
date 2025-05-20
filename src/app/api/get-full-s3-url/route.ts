import { NextRequest, NextResponse } from "next/server";
import { getDirectS3Url, getSignedUrl } from "@/lib/s3-utils";

/**
 * API endpoint to convert a relative S3 key to a full S3 URL
 * Optionally can generate a pre-signed URL if requested
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the S3 key and options
    const body = await req.json();
    const { key, generateSignedUrl = false, expiresIn = 3600 } = body;

    // Validate the key parameter
    if (!key) {
      return NextResponse.json(
        { success: false, error: "No key provided" },
        { status: 400 },
      );
    }

    // Get the direct S3 URL (not pre-signed)
    const directUrl = await getDirectS3Url(key);

    // If signed URL is requested, also generate that
    if (generateSignedUrl) {
      try {
        const signedUrlResult = await getSignedUrl(key, expiresIn);

        return NextResponse.json({
          success: true,
          key: signedUrlResult.key,
          directUrl,
          signedUrl: signedUrlResult.url,
          expiresIn,
          expiresAt: signedUrlResult.expiresAt,
        });
      } catch (error) {
        // If signed URL generation fails, still return the direct URL
        console.error("Error generating signed URL:", error);
        return NextResponse.json({
          success: true,
          key,
          directUrl,
          signedUrl: null,
          error: "Failed to generate signed URL, but direct URL is provided",
        });
      }
    }

    // If no signed URL was requested, just return the direct URL
    return NextResponse.json({
      success: true,
      key,
      directUrl,
    });
  } catch (error) {
    console.error("Error generating full S3 URL:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate full S3 URL",
      },
      { status: 500 },
    );
  }
}
