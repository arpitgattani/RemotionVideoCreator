"use client";

import React, { useState } from "react";
import { useS3SignedUrl } from "@/hooks/use-s3-signed-url";
import Image from "next/image";

interface S3PrivateImageProps {
  objectKey: string;
  initialUrl?: string;
  expiresIn?: number;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

export default function S3PrivateImage({
  objectKey,
  initialUrl,
  expiresIn,
  alt = "S3 image",
  width = 300,
  height = 200,
  className = "",
  fallbackSrc = "/placeholder-image.jpg",
}: S3PrivateImageProps) {
  const [isError, setIsError] = useState(false);
  const { url, isLoading, error, refreshUrl, expiresAt } = useS3SignedUrl({
    key: objectKey,
    initialUrl,
    expiresIn,
    autoRefresh: true,
  });

  // Format the expiration date for display
  const formattedExpiryTime = expiresAt
    ? new Date(expiresAt).toLocaleString()
    : "Unknown";

  // Handle image loading error
  const handleError = () => {
    console.error("Error loading image:", objectKey);
    setIsError(true);
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsError(false);
    await refreshUrl();
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded animate-pulse"
        style={{ width, height }}
      >
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-red-50 rounded p-3 space-y-2"
        style={{ width, height }}
      >
        <span className="text-red-500 text-sm">
          {error || "Failed to load image"}
        </span>
        <button
          onClick={handleRefresh}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {isError ? (
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover rounded ${className}`}
        />
      ) : (
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover rounded ${className}`}
          onError={handleError}
        />
      )}

      {/* Information overlay (visible on hover) */}
      <div className="absolute inset-0 bg-black bg-opacity-60 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end rounded">
        <p className="truncate mb-1">Key: {objectKey}</p>
        <p>Expires: {formattedExpiryTime}</p>
        <button
          onClick={handleRefresh}
          className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
        >
          Refresh URL
        </button>
      </div>
    </div>
  );
}
