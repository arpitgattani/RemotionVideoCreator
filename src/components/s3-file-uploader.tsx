"use client";

import React, { useState, useRef, useCallback } from "react";
import { useS3Upload } from "@/hooks/use-s3-upload";

interface S3FileUploaderProps {
  onUploadComplete?: (key: string, url: string, expiresAt: number) => void;
  acceptedFileTypes?: string[] | string; // e.g. [".jpg", ".jpeg", ".png"] or ".jpg,.jpeg,.png"
  maxSizeMB?: number;
  configName?: string;
}

export function S3FileUploader({
  onUploadComplete,
  acceptedFileTypes = [".jpg", ".jpeg", ".png", ".mp4", ".gif"],
  maxSizeMB = 10,
  configName,
}: S3FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { upload, isUploading, uploadProgress, uploadResult } = useS3Upload();

  // Calculate max file size in bytes
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length) {
        await handleFileUpload(files[0]);
      }
    },
    [maxSizeBytes],
  );

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        await handleFileUpload(files[0]);
      }
    },
    [maxSizeBytes],
  );

  const handleFileUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSizeBytes) {
      alert(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    // Validate file type (if acceptedFileTypes is provided)
    if (acceptedFileTypes && !isFileTypeAccepted(file, acceptedFileTypes)) {
      alert(
        `Invalid file type. Accepted types: ${
          Array.isArray(acceptedFileTypes)
            ? acceptedFileTypes.join(", ")
            : acceptedFileTypes
        }`,
      );
      return;
    }

    try {
      const result = await upload(file, { configName });

      if (result.success && result.url && onUploadComplete) {
        // Calculate expiration time if not already provided
        const expiresInSeconds = result.expiresIn || 3600; // Default to 1 hour
        const expiresAt =
          result.expiresAt || Date.now() + expiresInSeconds * 1000;

        // Pass key, url, and expiresAt to the parent component
        onUploadComplete(
          result.originalKey || result.key || file.name,
          result.url,
          expiresAt,
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const isFileTypeAccepted = (
    file: File,
    acceptedTypes: string[] | string,
  ): boolean => {
    const fileType = file.type;
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    // Handle string format (e.g., ".jpg,.png")
    if (typeof acceptedTypes === "string") {
      const types = acceptedTypes.split(",").map((t) => t.trim());

      // Check if any of the accepted types match the file's extension or MIME type
      return types.some((type) => {
        // If it starts with a dot, it's an extension
        if (type.startsWith(".")) {
          return type.toLowerCase() === fileExtension;
        }
        // Otherwise, it might be a MIME type
        return type === fileType;
      });
    }

    // Handle array format
    return acceptedTypes.some((type) => {
      // If it starts with a dot, it's an extension
      if (type.startsWith(".")) {
        return type.toLowerCase() === fileExtension;
      }
      // If it's a MIME type (e.g., "image/jpeg")
      return type === fileType;
    });
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Convert accepted file types to string format for the input element
  const acceptAttribute = Array.isArray(acceptedFileTypes)
    ? acceptedFileTypes.join(",")
    : acceptedFileTypes;

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptAttribute}
        className="hidden"
      />

      <div
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="mb-1 text-sm font-medium text-gray-900">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-500">
          {typeof acceptedFileTypes === "string"
            ? acceptedFileTypes.replace(/\./g, "")
            : acceptedFileTypes
                .map((type) => type.replace(/\./g, ""))
                .join(", ")}{" "}
          (max {maxSizeMB}MB)
        </p>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2 text-gray-600">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {/* Upload Result */}
      {!isUploading && uploadResult && (
        <div
          className={`mt-4 p-3 rounded-md ${uploadResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {uploadResult.success ? (
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>File uploaded successfully!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Upload failed: {uploadResult.error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default S3FileUploader;
