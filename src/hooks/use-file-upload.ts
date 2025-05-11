import React, { useCallback, useState } from "react";

interface UseFileUploadProps {
  accept?: string[];
  maxSize?: number;
  multiple?: boolean;
  onUpload?: (files: File[]) => void | Promise<void>;
}

interface UseFileUploadReturn {
  isDragging: boolean;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFileDialog: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function useFileUpload({
  accept = [],
  maxSize = 100 * 1024 * 1024, // 10MB default
  multiple = false,
  onUpload,
}: UseFileUploadProps = {}): UseFileUploadReturn {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const validateFile = useCallback(
    (file: File): boolean => {
      // if (maxSize && file.size > maxSize) {
      //   console.error(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
      //   return false;
      // }

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

  const handleFiles = useCallback(
    (files: File[]) => {
      const validFiles = files.filter(validateFile);
      if (validFiles.length > 0) {
        onUpload?.(validFiles);
      }
    },
    [validateFile, onUpload],
  );

  const handleFile = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        onUpload?.([file]);
      }
    },
    [validateFile, onUpload],
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
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
    fileInputRef,
  };
}
