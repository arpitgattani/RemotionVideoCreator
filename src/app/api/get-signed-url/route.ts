import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";

// Configure S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

// URL expiration time in seconds (default: 1 hour)
const URL_EXPIRATION = parseInt(process.env.S3_URL_EXPIRATION || "3600");

export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the S3 key
    const body = await req.json();
    const { key } = body;

    // Validate the key parameter
    if (!key) {
      return NextResponse.json(
        { success: false, error: "No key provided" },
        { status: 400 },
      );
    }

    // Check if the object exists in S3
    try {
      await s3
        .headObject({
          Bucket: process.env.AWS_S3_BUCKET_NAME || "",
          Key: key,
        })
        .promise();
    } catch (headError) {
      // If the object doesn't exist, return an error
      console.error("Object does not exist:", headError);
      return NextResponse.json(
        {
          success: false,
          error:
            "The requested object does not exist or you don't have permission to access it",
        },
        { status: 404 },
      );
    }

    // Generate a pre-signed URL
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: key,
      Expires: URL_EXPIRATION,
    });

    // Return the signed URL and metadata
    return NextResponse.json({
      success: true,
      url: signedUrl,
      key,
      expiresIn: URL_EXPIRATION,
      expiresAt: Date.now() + URL_EXPIRATION * 1000,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate signed URL",
      },
      { status: 500 },
    );
  }
}
