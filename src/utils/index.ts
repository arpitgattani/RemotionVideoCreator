export const contain = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
  fit: "contain" | "cover"
) =>
  fit === "contain"
    ? Math.min(maxWidth / width, maxHeight / height)
    : Math.max(maxWidth / width, maxHeight / height);
