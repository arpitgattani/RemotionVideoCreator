"use client";

import { useState, useEffect, useCallback } from "react";

interface UseS3SignedUrlOptions {
  /**
   * The S3 object key
   */
  key: string;

  /**
   * Optional initial signed URL (if you already have one)
   */
  initialUrl?: string;

  /**
   * Expiration time in seconds for the signed URL
   * Default: 3600 (1 hour)
   */
  expiresIn?: number;

  /**
   * Automatically refresh the URL before it expires
   * Default: true
   */
  autoRefresh?: boolean;

  /**
   * Time in seconds before expiration to trigger refresh
   * Default: 300 (5 minutes)
   */
  refreshBuffer?: number;
}

interface UseS3SignedUrlResult {
  /**
   * The current signed URL for the S3 object
   */
  url: string | null;

  /**
   * Whether the URL is currently being fetched/refreshed
   */
  isLoading: boolean;

  /**
   * Any error that occurred during fetching
   */
  error: string | null;

  /**
   * Timestamp when the current URL will expire (milliseconds)
   */
  expiresAt: number | null;

  /**
   * Function to manually refresh the URL
   */
  refreshUrl: () => Promise<void>;
}

/**
 * Hook for managing S3 pre-signed URLs with automatic refresh
 */
export function useS3SignedUrl({
  key,
  initialUrl,
  expiresIn = 3600,
  autoRefresh = true,
  refreshBuffer = 300,
}: UseS3SignedUrlOptions): UseS3SignedUrlResult {
  const [url, setUrl] = useState<string | null>(initialUrl || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(
    initialUrl ? Date.now() + expiresIn * 1000 : null,
  );
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  /**
   * Fetch a new signed URL from the server
   */
  const refreshUrl = useCallback(async () => {
    if (!key) {
      setError("No object key provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/get-signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get signed URL");
      }

      if (!data.url) {
        throw new Error("No URL returned from server");
      }

      // Update state with new URL and expiration
      setUrl(data.url);
      setExpiresAt(Date.now() + (data.expiresIn || expiresIn) * 1000);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh URL");
      console.error("Error refreshing signed URL:", err);
    } finally {
      setIsLoading(false);
    }
  }, [key, expiresIn]);

  // Set up auto-refresh timer
  useEffect(() => {
    // Clear any existing timer
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      setRefreshTimer(null);
    }

    // If we have a URL and expiration time, and autoRefresh is enabled
    if (url && expiresAt && autoRefresh) {
      const now = Date.now();
      const timeUntilRefresh = expiresAt - now - refreshBuffer * 1000;

      // Only set timer if it's in the future
      if (timeUntilRefresh > 0) {
        const timer = setTimeout(() => {
          refreshUrl();
        }, timeUntilRefresh);

        setRefreshTimer(timer);

        // Cleanup timer on unmount
        return () => {
          clearTimeout(timer);
        };
      } else {
        // URL is expired or about to expire, refresh immediately
        refreshUrl();
      }
    }
  }, [url, expiresAt, autoRefresh, refreshBuffer, refreshUrl]);

  // Initial fetch if no URL provided
  useEffect(() => {
    if (!initialUrl && key) {
      refreshUrl();
    }
  }, []);

  return {
    url,
    isLoading,
    error,
    expiresAt,
    refreshUrl,
  };
}
