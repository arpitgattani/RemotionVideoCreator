import { z } from "zod";
import { FontFamily } from "./fonts";
import * as remotionZod from "@remotion/zod-types";
export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
});

export type ProgressResponse =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };

const ItemSchema = z.object({
  id: z.string(),
});

// Define transition direction types
export const WipeDirectionSchema = z.enum([
  "from-left",
  "from-top-left",
  "from-top",
  "from-top-right",
  "from-right",
  "from-bottom-right",
  "from-bottom",
  "from-bottom-left",
]);

export const SlideDirectionSchema = z.enum([
  "from-left",
  "from-top",
  "from-right",
  "from-bottom",
]);

export type WipeDirection = z.infer<typeof WipeDirectionSchema>;
export type SlideDirection = z.infer<typeof SlideDirectionSchema>;

// Define transition configurations
const TransitionConfigSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("wipe"),
    direction: WipeDirectionSchema.optional().default("from-left"),
    duration: z.number().optional().default(30),
  }),
  z.object({
    type: z.literal("slide"),
    direction: SlideDirectionSchema.optional().default("from-left"),
    duration: z.number().optional().default(30),
  }),
  z.object({
    type: z.literal("fade"),
    duration: z.number().optional().default(30),
  }),
  z.object({
    type: z.literal("star"),
    duration: z.number().optional().default(30),
  }),
]);

export type TransitionConfig = z.infer<typeof TransitionConfigSchema>;

// Define a DropShadow schema
const DropShadowSchema = z.object({
  enabled: z.boolean().default(true),
  color: z.string().default("0x000000"),
  alpha: z.number().default(1),
  blur: z.number().default(4),
  angle: z.number().default(Math.PI / 6),
  distance: z.number().default(6),
});

export type DropShadow = z.infer<typeof DropShadowSchema>;

// Define a Stroke schema
const StrokeSchema = z.object({
  enabled: z.boolean().default(false),
  color: z.string().default("0x4a1850"),
  width: z.number().default(5),
  join: z.enum(["round", "bevel", "miter"]).default("round"),
});

export type Stroke = z.infer<typeof StrokeSchema>;

// Define gradient fill options
const GradientFillSchema = z.object({
  enabled: z.boolean().default(false),
  colors: z.array(z.string()).min(2).default(["0xff0000", "0x0000ff"]),
  stops: z.array(z.number()).optional(),
  angle: z.number().default(90),
});

export type GradientFill = z.infer<typeof GradientFillSchema>;

// Animation Config Schema
const AnimationConfigSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("typewriter"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("fade"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("slide"),
    duration: z.number().default(30),
    animationDirection: z
      .enum(["left", "right", "top", "bottom"])
      .default("bottom"),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("flash"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("pop"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("pulse"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("bounce"),
    duration: z.number().default(30),
    animationDirection: z
      .enum(["left", "right", "top", "bottom"])
      .default("bottom"),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("rotate-in"),
    duration: z.number().default(30),
    animationDirection: z
      .enum(["left", "right", "top", "bottom"])
      .default("bottom"),
    delay: z.number().default(0).optional(),
  }),
]);

// Background Animation Config Schema - excludes typewriter as it doesn't apply to backgrounds
const BackgroundAnimationConfigSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("fade"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("slide"),
    duration: z.number().default(30),
    animationDirection: z
      .enum(["left", "right", "top", "bottom"])
      .default("bottom"),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("flash"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("pop"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("pulse"),
    duration: z.number().default(30),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("bounce"),
    duration: z.number().default(30),
    animationDirection: z
      .enum(["left", "right", "top", "bottom"])
      .default("bottom"),
    delay: z.number().default(0).optional(),
  }),
  z.object({
    type: z.literal("rotate-in"),
    duration: z.number().default(30),
    animationDirection: z
      .enum(["left", "right", "top", "bottom"])
      .default("bottom"),
    delay: z.number().default(0).optional(),
  }),
]);

export type AnimationConfig = z.infer<typeof AnimationConfigSchema>;
export type BackgroundAnimationConfig = z.infer<
  typeof BackgroundAnimationConfigSchema
>;

export const TextBackgroundSchema = z.object({
  enabled: z.boolean().default(false),
  color: remotionZod.zColor(),
  alpha: z.number().default(0.5),
  paddingX: z.number().default(0),
  paddingY: z.number().default(0),
  cornerRadius: z.number().default(0),
  animationConfig: BackgroundAnimationConfigSchema.optional(),
});

// Now update TextSchema to remove separate animation field
const TextSchema = ItemSchema.extend({
  type: z.literal("text"),
  animationConfig: AnimationConfigSchema.optional(),
  text: z.string(),
  fontSize: z.number(),
  fontFamily: FontFamily.default("Roboto"),
  fontWeight: z.number(),
  fontColor: remotionZod.zColor(),
  fontStyle: z.string(),
  fontVariant: z.string(),
  textAlign: z.string(),
  layout: z.enum(["left", "center", "right"]).optional(),
  x: z.number().default(0),
  y: z.number().default(0),
  dropShadow: DropShadowSchema.optional(),
  stroke: StrokeSchema.optional(),
  fillGradient: GradientFillSchema.optional(),
  backgroundConfig: TextBackgroundSchema.optional(),
});

// New FreeImageSchema for images that can be positioned freely in frames
const FreeImageSchema = ItemSchema.extend({
  type: z.literal("image"),
  url: z.string(),
  x: z.number().default(0),
  y: z.number().default(0),
  width: z.number().optional(),
  height: z.number().optional(),
  opacity: z.number().default(1),
  rotation: z.number().default(0),
  scale: z.number().default(1),
  objectFit: z.enum(["cover", "contain", "fill", "none"]).default("cover"),
  cornerRadius: z.number().default(0),
  animationConfig: AnimationConfigSchema.optional(),
  dropShadow: DropShadowSchema.optional(),
  border: z
    .object({
      enabled: z.boolean().default(false),
      width: z.number().default(1),
      color: remotionZod.zColor().default("#FFFFFF"),
      style: z.enum(["solid", "dashed", "dotted"]).default("solid"),
    })
    .optional(),
});

// Update ImageSchema and VideoSchema to remove separate transition field
const ImageSchema = ItemSchema.extend({
  type: z.literal("image"),
  url: z.string(),
  transitionConfig: TransitionConfigSchema.optional(),
});

const VideoSchema = ItemSchema.extend({
  type: z.literal("video"),
  url: z.string(),
  volume: z.number().optional().default(1),
  muted: z.boolean().optional().default(false),
  startFrame: z.number().optional(),
  endFrame: z.number().optional(),
  transitionConfig: TransitionConfigSchema.optional(),
});

const AudioSchema = ItemSchema.extend({
  type: z.literal("audio"),
  url: z.string(),
  startFrame: z.number().optional(),
  endFrame: z.number().optional(),
});

const MediaSchema = z.discriminatedUnion("type", [ImageSchema, VideoSchema]);

export const FrameSchema = ItemSchema.extend({
  nodes: z.array(z.discriminatedUnion("type", [TextSchema, FreeImageSchema])),
  media: MediaSchema,
  duration: z.number().optional().default(100),
});

export const Item = z.union([
  ImageSchema,
  VideoSchema,
  AudioSchema,
  TextSchema,
  FreeImageSchema,
  FrameSchema,
]);

export type TextProps = z.infer<typeof TextSchema>;
export type FreeImageProps = z.infer<typeof FreeImageSchema>;
export type MediaProps = z.infer<typeof MediaSchema>;
export type FrameProps = z.infer<typeof FrameSchema>;

export type ItemType = z.infer<
  | typeof ImageSchema
  | typeof VideoSchema
  | typeof AudioSchema
  | typeof TextSchema
  | typeof FreeImageSchema
>;
export const AppStateSchema = z.object({
  aspectRatio: z.enum(["9:16", "16:9", "4:3", "1:1", "21:9"]),
  resolution: z.enum(["1080p", "720p", "480p", "360p"]),
  musicUrl: z.string().optional(),
  musicStartFrame: z.number().optional(),
  musicEndFrame: z.number().optional(),
  musicVolume: z.number().optional().default(0.5),
  items: z.array(FrameSchema),
});

export type AppState = z.infer<typeof AppStateSchema>;
export const RenderRequest = z.object({
  id: z.string(),
  inputProps: z.any(),
});
export type BaseAnimationProps = {
  children: React.ReactNode;
  animationDuration: number;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
};
