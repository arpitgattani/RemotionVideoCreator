import React, { useCallback, useState } from "react";

// Upload provider types
export type UploadProvider = "firebase" | "s3";

interface UseFileUploadProps {
  accept?: string[];
  maxSize?: number;
  multiple?: boolean;
  onUpload?: (files: File[]) => void | Promise<void>;
  uploadProvider?: UploadProvider;
  configName?: string;
}

interface UseFileUploadReturn {
  isDragging: boolean;
  isUploading: boolean;
  uploadedUrls: Record<string, string>;
  uploadErrors: Record<string, string>;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function useFileUpload({
  accept = [],
  maxSize = 100 * 1024 * 1024, // 100MB default
  multiple = false,
  onUpload,
  uploadProvider = "firebase", // Default to firebase for backward compatibility
  configName,
}: UseFileUploadProps = {}): UseFileUploadReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<Record<string, string>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

  const fileInputRef = React.useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const validateFile = useCallback(
    (file: File): boolean => {
      if (maxSize && file.size > maxSize) {
        console.error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
        return false;
      }

      if (accept.length > 0) {
        const fileType = file.type || file.name.split(".").pop()?.toLowerCase();
        const isAccepted = accept.some((type) => {
          // Handle both mime types and extensions
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return fileType === type;
        });

        if (!isAccepted) {
          console.error(
            `File type not accepted. Allowed types: ${accept.join(", ")}`,
          );
          return false;
        }
      }

      return true;
    },
    [accept, maxSize],
  );

  const uploadFile = useCallback(
    async (file: File): Promise<{ url?: string; error?: string }> => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        if (configName) {
          formData.append("configName", configName);
        }

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success && result.error) {
          throw new Error(result.error);
        }

        return { url: result.url };
      } catch (error) {
        console.error("Error uploading file:", error);
        return {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        };
      }
    },
    [uploadProvider, configName],
  );

  const handleFiles = useCallback(
    async (files: File[]) => {
      const validFiles = files.filter(validateFile);

      if (validFiles.length > 0) {
        if (onUpload) {
          onUpload(validFiles);
          return;
        }

        setIsUploading(true);

        const uploadPromises = validFiles.map(async (file) => {
          const result = await uploadFile(file);

          if (result.url) {
            setUploadedUrls((prev) => ({
              ...prev,
              [file.name]: result.url!,
            }));
          }

          if (result.error) {
            setUploadErrors((prev) => ({
              ...prev,
              [file.name]: result.error!,
            }));
          }

          return result;
        });

        await Promise.all(uploadPromises);
        setIsUploading(false);
      }
    },
    [validateFile, onUpload, uploadFile],
  );

  const handleFile = useCallback(
    async (file: File) => {
      if (validateFile(file)) {
        if (onUpload) {
          onUpload([file]);
          return;
        }

        setIsUploading(true);
        const result = await uploadFile(file);

        if (result.url) {
          setUploadedUrls((prev) => ({
            ...prev,
            [file.name]: result.url!,
          }));
        }

        if (result.error) {
          setUploadErrors((prev) => ({
            ...prev,
            [file.name]: result.error!,
          }));
        }

        setIsUploading(false);
      }
    },
    [validateFile, onUpload, uploadFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (multiple) {
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
          handleFiles(files);
        }
      } else {
        const file = e.dataTransfer.files[0];
        if (file) {
          handleFile(file);
        }
      }
    },
    [handleFile, handleFiles, multiple],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (multiple) {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length > 0) {
          handleFiles(files);
        }
      } else {
        const file = e.target.files?.[0];
        if (file) {
          handleFile(file);
        }
      }
    },
    [handleFile, handleFiles, multiple],
  );

  const openFileDialog = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.multiple = multiple;
      fileInputRef.current.click();
    }
  }, [multiple]);

  return {
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
  };
}
