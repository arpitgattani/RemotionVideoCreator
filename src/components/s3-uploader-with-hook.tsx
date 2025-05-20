"use client";

import React from "react";
import { useFileUpload } from "@/hooks/use-file-upload";

interface S3UploaderProps {
  acceptedFileTypes?: string[];
  maxSize?: number;
  configName?: string;
  onUploadComplete?: (urls: Record<string, string>) => void;
}

export default function S3UploaderWithHook({
  acceptedFileTypes = [".jpg", ".jpeg", ".png", ".gif", ".mp4"],
  maxSize = 20 * 1024 * 1024, // 20MB
  configName = "default-upload",
  onUploadComplete,
}: S3UploaderProps) {
  const {
    isDragging,
    isUploading,
    uploadedUrls,
    uploadErrors,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
    fileInputRef,
  } = useFileUpload({
    accept: acceptedFileTypes,
    maxSize,
    uploadProvider: "s3", // Specify S3 as the upload provider
    configName,
  });

  // Call onUploadComplete whenever uploadedUrls changes
  React.useEffect(() => {
    if (onUploadComplete && Object.keys(uploadedUrls).length > 0) {
      onUploadComplete(uploadedUrls);
    }
  }, [uploadedUrls, onUploadComplete]);

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={acceptedFileTypes.join(",")}
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
          {acceptedFileTypes.join(", ")} (max {maxSize / 1024 / 1024}MB)
        </p>
      </div>

      {/* Loading indicator */}
      {isUploading && (
        <div className="mt-4">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-1/3 animate-pulse"></div>
          </div>
          <p className="text-sm text-center mt-2 text-gray-600">Uploading...</p>
        </div>
      )}

      {/* Upload results */}
      {Object.keys(uploadedUrls).length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Uploaded Files:
          </h3>
          <ul className="space-y-1">
            {Object.entries(uploadedUrls).map(([fileName, url]) => (
              <li key={fileName} className="text-sm text-green-600">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center"
                >
                  <svg
                    className="h-4 w-4 mr-1"
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
                  {fileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload errors */}
      {Object.keys(uploadErrors).length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Upload Errors:
          </h3>
          <ul className="space-y-1">
            {Object.entries(uploadErrors).map(([fileName, error]) => (
              <li
                key={fileName}
                className="text-sm text-red-600 flex items-center"
              >
                <svg
                  className="h-4 w-4 mr-1"
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
                {fileName}: {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
