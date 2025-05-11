import { Assets, Texture } from "pixi.js";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";

export const useImageTexture = (url: string) => {
  const [texture, setTexture] = useState<PIXI.Texture>(Texture.EMPTY);
  useEffect(() => {
    if (texture === Texture.EMPTY && url) {
      Assets.load({
        src: url,
        crossOrigin: "anonymous",
        loadParser: "loadTextures",
      })
        .then((result) => {
          setTexture(result);
        })
        .catch(console.error);
    }
  }, [texture, url]);

  return texture;
};
