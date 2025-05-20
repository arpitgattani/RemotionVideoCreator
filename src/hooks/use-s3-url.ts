"use client";

import { useState, useEffect } from "react";

interface UseS3UrlOptions {
  /**
   * The S3 key/path to the object
   */
  key: string;

  /**
   * Whether to generate a pre-signed URL (default: false)
   */
  generateSignedUrl?: boolean;

  /**
   * Expiration time in seconds for pre-signed URLs (default: 3600 - 1 hour)
   */
  expiresIn?: number;

  /**
   * Whether to auto-refresh pre-signed URLs before they expire (default: true)
   */
  autoRefresh?: boolean;

  /**
   * Time in seconds before expiration to trigger refresh (default: 300 - 5 min)
   */
  refreshBuffer?: number;
}

interface UseS3UrlResult {
  /**
   * Direct S3 URL (not pre-signed)
   */
  directUrl: string | null;

  /**
   * Pre-signed URL (if requested)
   */
  signedUrl: string | null;

  /**
   * Timestamp when the signed URL will expire (milliseconds)
   */
  expiresAt: number | null;

  /**
   * Whether URLs are currently being fetched
   */
  isLoading: boolean;

  /**
   * Any error that occurred during the fetch
   */
  error: string | null;

  /**
   * Function to manually refresh the URLs
   */
  refresh: () => Promise<void>;
}

/**
 * Hook for getting full S3 URLs from keys
 * Optionally can get pre-signed URLs with auto-refresh
 */
export function useS3Url({
  key,
  generateSignedUrl = false,
  expiresIn = 3600,
  autoRefresh = true,
  refreshBuffer = 300,
}: UseS3UrlOptions): UseS3UrlResult {
  const [directUrl, setDirectUrl] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchUrls = async () => {
    if (!key) {
      setError("No key provided");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/get-full-s3-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          generateSignedUrl,
          expiresIn,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch S3 URLs");
      }

      setDirectUrl(data.directUrl);

      if (generateSignedUrl) {
        setSignedUrl(data.signedUrl);
        setExpiresAt(data.expiresAt || Date.now() + expiresIn * 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get S3 URLs");
      console.error("Error fetching S3 URLs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up auto-refresh timer for signed URLs
  useEffect(() => {
    // Clear any existing timer
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      setRefreshTimer(null);
    }

    // If we have a signed URL and expiration time, and autoRefresh is enabled
    if (signedUrl && expiresAt && autoRefresh && generateSignedUrl) {
      const now = Date.now();
      const timeUntilRefresh = expiresAt - now - refreshBuffer * 1000;

      // Only set timer if it's in the future
      if (timeUntilRefresh > 0) {
        const timer = setTimeout(() => {
          fetchUrls();
        }, timeUntilRefresh);

        setRefreshTimer(timer);

        // Cleanup timer on unmount
        return () => {
          clearTimeout(timer);
        };
      } else {
        // URL is expired or about to expire, refresh immediately
        fetchUrls();
      }
    }
  }, [signedUrl, expiresAt, autoRefresh, refreshBuffer, generateSignedUrl]);

  // Initial fetch
  useEffect(() => {
    fetchUrls();
  }, [key, generateSignedUrl, expiresIn]);

  return {
    directUrl,
    signedUrl,
    expiresAt,
    isLoading,
    error,
    refresh: fetchUrls,
  };
}
