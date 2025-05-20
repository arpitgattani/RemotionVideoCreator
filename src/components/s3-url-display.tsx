"use client";

import React, { useState } from "react";
import { useS3Url } from "@/hooks/use-s3-url";
import Image from "next/image";

interface S3UrlDisplayProps {
  /**
   * The S3 key to use
   */
  defaultKey?: string;

  /**
   * Whether to display an image preview
   */
  showPreview?: boolean;

  /**
   * Whether to generate a pre-signed URL
   */
  generateSignedUrl?: boolean;

  /**
   * Title for the component
   */
  title?: string;
}

/**
 * Component that demonstrates how to use the useS3Url hook
 * to display full S3 URLs for a given key
 */
export default function S3UrlDisplay({
  defaultKey = "",
  showPreview = true,
  generateSignedUrl = true,
  title = "S3 URL Generator",
}: S3UrlDisplayProps) {
  const [key, setKey] = useState<string>(defaultKey);
  const [inputKey, setInputKey] = useState<string>(defaultKey);
  const [showUrls, setShowUrls] = useState<boolean>(!!defaultKey);

  const { directUrl, signedUrl, expiresAt, isLoading, error, refresh } =
    useS3Url({
      key,
      generateSignedUrl,
      expiresIn: 3600, // 1 hour
      autoRefresh: true,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setKey(inputKey);
    setShowUrls(true);
  };

  // Format expiration time nicely
  const expirationText = expiresAt
    ? new Date(expiresAt).toLocaleString()
    : "N/A";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label
              htmlFor="s3-key"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              S3 Object Key
            </label>
            <input
              type="text"
              id="s3-key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="e.g., configs/my-image.jpg"
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!inputKey || isLoading}
            >
              {isLoading ? "Loading..." : "Generate URLs"}
            </button>
          </div>
        </div>
      </form>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Results */}
      {showUrls && !error && (
        <div className="space-y-6">
          {/* Direct URL */}
          <div className="border rounded-md p-4 bg-gray-50">
            <h3 className="text-lg font-medium mb-2">Direct S3 URL</h3>
            <p className="text-sm text-gray-500 mb-1">
              This is the direct URL to the S3 object (not pre-signed). Access
              depends on the bucket policy.
            </p>
            <div className="flex items-center gap-2 p-2 bg-white border rounded">
              <code className="text-sm flex-grow overflow-x-auto break-all">
                {directUrl || "Loading..."}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(directUrl || "")}
                className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                disabled={!directUrl}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Signed URL (if requested) */}
          {generateSignedUrl && (
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-2">Pre-signed URL</h3>
              <div className="text-sm text-gray-500 mb-1 flex justify-between">
                <span>
                  This URL provides temporary access to the file, even if the
                  bucket is private.
                </span>
                <span className="text-right">
                  Expires: <strong>{expirationText}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white border rounded">
                <code className="text-sm flex-grow overflow-x-auto break-all">
                  {signedUrl || "Loading..."}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(signedUrl || "")}
                  className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  disabled={!signedUrl}
                >
                  Copy
                </button>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={refresh}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Refreshing..." : "Refresh URL"}
                </button>
              </div>
            </div>
          )}

          {/* Image preview */}
          {showPreview && (signedUrl || directUrl) && (
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-2">Preview</h3>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md h-64 border rounded">
                  <Image
                    src={signedUrl || directUrl || ""}
                    alt="S3 Object Preview"
                    fill
                    className="object-contain"
                    onError={() => console.log("Image failed to load")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
