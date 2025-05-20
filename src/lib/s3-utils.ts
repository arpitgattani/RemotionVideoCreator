"use server";

import { S3 } from "aws-sdk";

// Configure S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

// Default URL expiration time in seconds (1 hour)
const DEFAULT_EXPIRATION = 3600;

interface SignedUrlResult {
  key: string;
  url: string;
  expiresAt: number;
}

/**
 * Construct a direct S3 URL for a given key
 *
 * @param key The S3 object key
 * @returns The direct S3 URL (not pre-signed)
 */
export async function getDirectS3Url(key: string): Promise<string> {
  const bucket = process.env.AWS_S3_BUCKET_NAME || "";
  const region = process.env.AWS_REGION || "us-east-1";

  // Remove any leading slash from the key
  const cleanKey = key.startsWith("/") ? key.substring(1) : key;

  // Construct the direct S3 URL
  return `https://${bucket}.s3.${region}.amazonaws.com/${cleanKey}`;
}

/**
 * Generate a pre-signed URL for a single S3 object
 *
 * @param key The S3 object key
 * @param expiration Expiration time in seconds (default: 1 hour)
 * @returns Object containing the signed URL and expiration details
 */
export async function getSignedUrl(
  key: string,
  expiration: number = DEFAULT_EXPIRATION,
): Promise<SignedUrlResult> {
  try {
    // Remove any leading slash from the key
    const cleanKey = key.startsWith("/") ? key.substring(1) : key;
    const bucket = process.env.AWS_S3_BUCKET_NAME || "";

    // Check if the object exists
    await s3
      .headObject({
        Bucket: bucket,
        Key: cleanKey,
      })
      .promise();

    // Generate the pre-signed URL
    const url = s3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: cleanKey,
      Expires: expiration,
    });

    return {
      key: cleanKey,
      url,
      expiresAt: Date.now() + expiration * 1000,
    };
  } catch (error) {
    console.error(`Error generating signed URL for ${key}:`, error);
    throw new Error(
      `Failed to generate signed URL for ${key}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Generate pre-signed URLs for multiple S3 objects in parallel
 *
 * @param keys Array of S3 object keys
 * @param expiration Expiration time in seconds (default: 1 hour)
 * @returns Array of objects containing signed URLs and expiration details
 */
export async function getBatchSignedUrls(
  keys: string[],
  expiration: number = DEFAULT_EXPIRATION,
): Promise<SignedUrlResult[]> {
  try {
    // Clean keys (remove leading slashes)
    const cleanKeys = keys.map((key) =>
      key.startsWith("/") ? key.substring(1) : key,
    );

    // Generate signed URLs in parallel
    const results = await Promise.allSettled(
      cleanKeys.map((key) => getSignedUrl(key, expiration)),
    );

    // Filter out rejected promises and extract values from fulfilled ones
    return results
      .filter(
        (result): result is PromiseFulfilledResult<SignedUrlResult> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);
  } catch (error) {
    console.error("Error generating batch signed URLs:", error);
    throw new Error(
      `Failed to generate batch signed URLs: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Check if multiple S3 objects exist
 *
 * @param keys Array of S3 object keys to check
 * @returns Object mapping keys to boolean values indicating existence
 */
export async function checkObjectsExist(
  keys: string[],
): Promise<Record<string, boolean>> {
  const bucket = process.env.AWS_S3_BUCKET_NAME || "";
  const results: Record<string, boolean> = {};

  // Clean keys (remove leading slashes)
  const cleanKeys = keys.map((key) =>
    key.startsWith("/") ? key.substring(1) : key,
  );

  // Check each object in parallel
  const checkPromises = cleanKeys.map(async (key) => {
    try {
      await s3
        .headObject({
          Bucket: bucket,
          Key: key,
        })
        .promise();
      results[key] = true;
    } catch (headError) {
      // Object doesn't exist or not accessible
      console.debug(
        `Object ${key} doesn't exist or is not accessible:`,
        headError,
      );
      results[key] = false;
    }
  });

  await Promise.all(checkPromises);
  return results;
}

/**
 * Delete an S3 object
 *
 * @param key The S3 object key to delete
 * @returns True if deletion was successful
 */
export async function deleteObject(key: string): Promise<boolean> {
  try {
    // Remove any leading slash from the key
    const cleanKey = key.startsWith("/") ? key.substring(1) : key;

    await s3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME || "",
        Key: cleanKey,
      })
      .promise();
    return true;
  } catch (error) {
    console.error(`Error deleting object ${key}:`, error);
    return false;
  }
}

/**
 * Copy an S3 object to a new location
 *
 * @param sourceKey Source object key
 * @param destinationKey Destination object key
 * @returns The key of the new object if successful
 */
export async function copyObject(
  sourceKey: string,
  destinationKey: string,
): Promise<string | null> {
  // Remove any leading slashes from keys
  const cleanSourceKey = sourceKey.startsWith("/")
    ? sourceKey.substring(1)
    : sourceKey;
  const cleanDestKey = destinationKey.startsWith("/")
    ? destinationKey.substring(1)
    : destinationKey;

  const bucket = process.env.AWS_S3_BUCKET_NAME || "";

  try {
    await s3
      .copyObject({
        Bucket: bucket,
        CopySource: `${bucket}/${cleanSourceKey}`,
        Key: cleanDestKey,
      })
      .promise();

    return cleanDestKey;
  } catch (error) {
    console.error(
      `Error copying object from ${sourceKey} to ${destinationKey}:`,
      error,
    );
    return null;
  }
}
