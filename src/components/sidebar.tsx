import { useFileUpload } from "@/hooks/use-file-upload";
import { UploadCloud, X, Video, Loader } from "lucide-react";
import React, { useState } from "react";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import {
  appAtom,
  aspectRatioFocusAtom,
  resolutionFocusAtom,
} from "@/stores/app.store";
import { nanoid } from "nanoid";
import { ASPECT_RATIO_LOOKUP, RESOLUTION_HEIGHTS } from "@/types/constants";
import { Button } from "./Button/Button";

const RenderTravelTemplateComponent = () => {
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const handleRenderTravelTemplate = async () => {
    setIsRendering(true);
    const uniqueId = "someId";
    const response = await fetch(
      `http://localhost:3001/api/render/${uniqueId}/template1`,
      {
        method: "POST",
        body: JSON.stringify({
          eventId: uniqueId,
          compositionId: "template1",
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    setIsRendering(true);
  };
  return (
    <div>
      <Button onClick={handleRenderTravelTemplate}>
        {isRendering ? (
          <>
            <Loader className="size-4 animate-spin" />
            Rendering...
          </>
        ) : (
          "Render Travel Template"
        )}
      </Button>
    </div>
  );
};

interface ImagePreview {
  url: string;
  file: File;
  uploaded: boolean;
}

const Sidebar = () => {
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const setItems = useSetAtom(appAtom);
  const [aspectRatio, setAspectRatio] = useAtom(aspectRatioFocusAtom);
  const [resolution, setResolution] = useAtom(resolutionFocusAtom);
  const appState = useAtomValue(appAtom);
  const [isRendering, setIsRendering] = useState(false);
  const [renderSuccess, setRenderSuccess] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Function to handle video rendering
  const handleRenderVideo = async () => {
    try {
      setIsRendering(true);
      setRenderSuccess(false);
      setRenderError(null);

      const response = await fetch("/api/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appState),
      });

      if (!response.ok) {
        throw new Error(`Render failed: ${response.statusText}`);
      }

      setRenderSuccess(true);
    } catch (error) {
      console.error("Error rendering video:", error);
      setRenderError(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    } finally {
      setIsRendering(false);
    }
  };

  const {
    isDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    openFileDialog,
    fileInputRef,
  } = useFileUpload({
    accept: [".jpg", ".jpeg", ".png", ".mp4", ".mov", ".avi", ".mkv"],
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    onUpload: async (files: File[]) => {
      // Create local previews immediately
      const newPreviews = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        uploaded: false, // Track upload status
      }));
      setPreviews((current) => [...current, ...newPreviews]);

      //@ts-ignore
      setItems((current) => {
        // Create new frames from the previews
        const newFrames = newPreviews.map((preview) => ({
          id: nanoid(5),
          type: "frame" as const,
          text: [
            {
              id: nanoid(5),
              text: "", // Empty text by default
              fontSize: 20,
              fontFamily: "Roboto" as const,
              fontWeight: 400,
              fontColor: "#FFFFFF",
              fontStyle: "normal",
              fontVariant: "normal",
              textAlign: "center",
              x: 0,
              y: 0,
            },
          ],
          media: {
            id: preview.file.name,
            type: "image" as const,
            url: preview.url,
          },
          duration: 100, // Add default duration
        }));

        // Return updated state with new frames
        return {
          ...current,
          items: [...current.items, ...newFrames],
        };
      });

      // Upload each file to the server
      for (const file of files) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/uploads", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }

          const result = await response.json();

          if (result.success) {
            setPreviews((current) =>
              current.map((preview) =>
                preview.file.name === file.name
                  ? { ...preview, url: result.url, uploaded: true }
                  : preview,
              ),
            );

            setItems((current) => ({
              ...current,
              items: current.items.map((item) => {
                if (
                  "type" in item &&
                  item.type === "frame" &&
                  item.media.type === "image" &&
                  item.media.id === file.name
                ) {
                  return {
                    ...item,
                    media: {
                      ...item.media,
                      url: result.url,
                    },
                  };
                }
                return item;
              }),
            }));
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
  });

  const removeImage = (urlToRemove: string) => {
    setPreviews((current) => {
      const previewToRemove = current.find((p) => p.url === urlToRemove);
      if (previewToRemove) {
        URL.revokeObjectURL(previewToRemove.url);
      }
      return current.filter((p) => p.url !== urlToRemove);
    });

    setItems((current) => ({
      ...current,
      items: current.items.filter((item) => {
        if (
          "type" in item &&
          item.type === "frame" &&
          item.media.url === urlToRemove
        ) {
          return false;
        }
        return true;
      }),
    }));
  };

  // Get all available aspect ratios from the constants
  const aspectRatios = Object.keys(ASPECT_RATIO_LOOKUP) as Array<
    keyof typeof ASPECT_RATIO_LOOKUP
  >;

  // Get all available resolutions from the constants
  const resolutions = Object.keys(RESOLUTION_HEIGHTS) as Array<
    keyof typeof RESOLUTION_HEIGHTS
  >;

  const handleAspectRatioChange = (newAspectRatio: string) => {
    setAspectRatio(newAspectRatio as keyof typeof ASPECT_RATIO_LOOKUP);
  };

  const handleResolutionChange = (newResolution: string) => {
    setResolution(newResolution as keyof typeof RESOLUTION_HEIGHTS);
  };

  return (
    <div className="flex flex-[0_0_300px] bg-white h-full border-l border-gray-200">
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Aspect Ratio Selector */}
          <div className="flex-shrink-0 p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Aspect Ratio
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => handleAspectRatioChange(ratio)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    aspectRatio === ratio
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution Selector */}
          <div className="flex-shrink-0 p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Resolution
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {resolutions.map((res) => (
                <button
                  key={res}
                  onClick={() => handleResolutionChange(res)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    resolution === res
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col gap-4 items-center justify-center p-4  rounded-md">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".jpg,.jpeg,.png,.mp4,.mov,.avi,.mkv"
              multiple
              onChange={handleFileSelect}
            />
            <div
              onClick={openFileDialog}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border border-dashed border-gray-300 rounded-lg p-10 mb-5 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 w-full max-w-lg mx-auto ${
                isDragging ? "bg-gray-50 border-violet-500" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 border border-gray-100">
                <UploadCloud className="size-7 text-gray-400" />
              </div>
              <p className="text-gray-400 text-center mb-1 text-sm">
                <span className="text-violet-600 font-medium">
                  Choose files
                </span>{" "}
                or drop here to process
              </p>
              <p className="text-gray-400 text-xs text-center">
                Accepted formats: .jpg,.jpeg,.png,.mp4,.mov,.avi,.mkv
              </p>
            </div>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Uploaded Images
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {previews.map((preview) => (
                  <div
                    key={preview.url}
                    className="relative group rounded-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src={preview.url}
                      alt={preview.file.name}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      onClick={() => removeImage(preview.url)}
                      className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm"
                      aria-label="Remove image"
                    >
                      <X className="size-4 text-gray-700" />
                    </button>
                    <div className="truncate text-xs p-1 text-gray-600 bg-gray-50 border-t border-gray-200">
                      {preview.file.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Render Video Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleRenderVideo}
            disabled={isRendering || appState.items.length === 0}
            className={`w-full py-3 px-4 rounded-md flex items-center justify-center gap-2 ${
              isRendering
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : appState.items.length === 0
                  ? "bg-gray-200 cursor-not-allowed text-gray-500"
                  : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {isRendering ? (
              <>
                <Loader className="size-5 animate-spin" />
                Rendering...
              </>
            ) : (
              <>
                <Video className="size-5" />
                Render Video
              </>
            )}
          </button>

          {renderSuccess && (
            <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded-md">
              Video rendered successfully! Check the output directory.
            </div>
          )}

          {renderError && (
            <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded-md">
              Error: {renderError}
            </div>
          )}
        </div>
        <RenderTravelTemplateComponent />
      </div>
    </div>
  );
};

export default Sidebar;
