import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import { nanoid } from "nanoid";

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
    // Parse formData
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const configName = formData.get("configName") as string;
    const configData = formData.get("configData") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file as buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Generate unique filename
    const fileName = `configs/${nanoid()}-${file.name.replace(/\s+/g, "_")}`;

    // Set up S3 upload parameters (without ACL)
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: fileName,
      Body: fileBuffer,
      ContentType: file.type,
      // No ACL property since the bucket doesn't support ACLs
    };

    // Upload to S3
    const uploadResult = await s3.upload(uploadParams).promise();

    console.log(uploadResult, "uploadResult");

    // Generate a pre-signed URL
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: fileName,
      Expires: URL_EXPIRATION,
    });

    console.log(signedUrl, "signedUrl");

    // Return success response with the pre-signed URL
    return NextResponse.json({
      success: true,
      url: signedUrl,
      originalKey: uploadResult.Key,
      expiresIn: URL_EXPIRATION,
      configData: configData ? JSON.parse(configData) : {},
      configName,
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 },
    );
  }
}
