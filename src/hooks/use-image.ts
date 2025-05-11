import React from "react";

export function useImage(
  url: string,
  crossOrigin: string,
  referrerpolicy: string = "no-referrer",
): [HTMLImageElement | null, "loading" | "loaded" | "failed"] {
  const statusRef = React.useRef<"loading" | "loaded" | "failed">("loading");
  const imageRef = React.useRef<HTMLImageElement | null>(null);

  const [, setStateToken] = React.useState(0);

  const oldUrl = React.useRef<string | undefined>(undefined);
  const oldCrossOrigin = React.useRef<string | undefined>(undefined);
  const oldReferrerPolicy = React.useRef<string | undefined>(undefined);
  if (
    oldUrl.current !== url ||
    oldCrossOrigin.current !== crossOrigin ||
    oldReferrerPolicy.current !== referrerpolicy
  ) {
    statusRef.current = "loading";
    imageRef.current = null;
    oldUrl.current = url;
    oldCrossOrigin.current = crossOrigin;
    oldReferrerPolicy.current = referrerpolicy;
  }

  React.useLayoutEffect(
    function () {
      if (!url) return;
      const img = document.createElement("img");

      function onload() {
        statusRef.current = "loaded";
        imageRef.current = img;
        setStateToken(Math.random());
      }

      function onerror() {
        statusRef.current = "failed";
        imageRef.current = null;
        setStateToken(Math.random());
      }

      img.addEventListener("load", onload);
      img.addEventListener("error", onerror);
      if (crossOrigin) img.crossOrigin = crossOrigin;
      if (referrerpolicy) img.referrerPolicy = referrerpolicy;
      img.src = url;

      return function cleanup() {
        img.removeEventListener("load", onload);
        img.removeEventListener("error", onerror);
      };
    },
    [url, crossOrigin, referrerpolicy],
  );

  return [imageRef.current, statusRef.current];
}
