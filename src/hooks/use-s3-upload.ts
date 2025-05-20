import { useState } from "react";

interface UploadOptions {
  configName?: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  originalKey?: string;
  error?: string;
  fileName?: string;
  expiresIn?: number;
  expiresAt?: number; // Calculated expiration timestamp
}

export function useS3Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  const upload = async (
    file: File,
    options?: UploadOptions,
  ): Promise<UploadResult> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadResult(null);

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      if (options?.configName) {
        formData.append("configName", options.configName);
      }

      // Upload the file
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // Parse the response
      const result = await response.json();

      // Calculate expiresAt if we have expiresIn
      if (result.success && result.expiresIn) {
        result.expiresAt = Date.now() + result.expiresIn * 1000;
      }

      setUploadResult(result);
      setUploadProgress(100);

      return result;
    } catch (error) {
      console.error("Error in useS3Upload:", error);
      const errorResult = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown upload error",
      };

      setUploadResult(errorResult);
      return errorResult;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadResult(null);
  };

  return {
    upload,
    reset,
    isUploading,
    uploadProgress,
    uploadResult,
  };
}
