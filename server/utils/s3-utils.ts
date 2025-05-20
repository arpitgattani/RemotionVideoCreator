import { S3 } from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Initialize S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

interface UploadOptions {
  bucketName?: string;
  contentType?: string;
  acl?: string;
  eventId?: string;
  metadata?: Record<string, string>;
  customKey: string;
}

/**
 * Uploads a file to S3
 * @param filePath Local path of the file to upload
 * @param options S3 upload options
 * @returns Promise resolving to the S3 URL of the uploaded file
 */
export const uploadFileToS3 = async (
  filePath: string,
  options: UploadOptions,
): Promise<{ url: string; key: string }> => {
  const {
    bucketName = process.env.AWS_S3_BUCKET_NAME,
    contentType = "video/mp4",
    acl = "private",
    metadata = {},
    customKey,
  } = options;

  if (!bucketName) {
    throw new Error("S3 bucket name is required");
  }

  // Read the file
  const fileContent = fs.readFileSync(filePath);

  // Set up upload parameters
  const params = {
    Bucket: bucketName,
    Key: customKey,
    Body: fileContent,
    ContentType: contentType,
    ACL: acl,
    Metadata: metadata,
  };

  try {
    // Upload to S3
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully to ${data.Location}`);

    return {
      url: data.Location,
      key: customKey,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  } finally {
    fs.unlinkSync(filePath);
  }
};

/**
 * Generates a pre-signed URL for a private S3 object
 * @param key The S3 object key
 * @param expiresIn Expiration time in seconds
 * @returns Promise resolving to the pre-signed URL
 */
export const getSignedUrl = async (
  key: string,
  expiresIn: number = 3600,
): Promise<string> => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is required");
  }

  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expiresIn,
  };

  try {
    const url = s3.getSignedUrl("getObject", params);
    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw error;
  }
};

/**
 * Deletes a file from S3
 * @param key The S3 object key to delete
 */
export const deleteFileFromS3 = async (key: string): Promise<void> => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("S3 bucket name is required");
  }

  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`File with key ${key} deleted successfully`);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error;
  }
};
