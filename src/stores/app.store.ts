import { atom } from "jotai";
import { AppState } from "@/types/schema";
import { focusAtom } from "jotai-optics";
import { calculateDimensions, DEFAULT_APP_STATE } from "@/types/constants";

export const appAtom = atom<AppState>(DEFAULT_APP_STATE);
appAtom.debugLabel = "@videoapi/appAtom";

export const aspectRatioFocusAtom = focusAtom(appAtom, (optic) =>
  optic.prop("aspectRatio"),
);
aspectRatioFocusAtom.debugLabel = "@videoapi/aspectRatioFocusAtom";

export const resolutionFocusAtom = focusAtom(appAtom, (optic) =>
  optic.prop("resolution"),
);
resolutionFocusAtom.debugLabel = "@videoapi/resolutionFocusAtom";

export const aspectRatioLookupAtom = atom((get) => {
  const aspectRatio = get(aspectRatioFocusAtom);
  const resolution = get(resolutionFocusAtom);
  return calculateDimensions(aspectRatio, resolution);
});
aspectRatioLookupAtom.debugLabel = "@videoapi/aspectRatioLookupAtom";
