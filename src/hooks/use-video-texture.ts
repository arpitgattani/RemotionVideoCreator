import { Assets, Texture } from "pixi.js";
import { useState, useEffect } from "react";
import * as PIXI from "pixi.js";

export const useVideoTexture = (url: string) => {
  const [texture, setTexture] = useState<PIXI.Texture>(Texture.EMPTY);

  useEffect(() => {
    if (texture === Texture.EMPTY && url) {
      Assets.load(url)
        .then((result) => {
          setTexture(result);
        })
        .catch(console.error);
    }
  }, [texture, url]);

  return texture;
};
