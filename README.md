# VideoAPI

VideoAPI is a powerful tool that helps you create amazing videos programmatically with beautiful transitions and text animations.

## Quick Start

1. Choose your aspect ratio from the sidebar
2. Upload images
3. Customize text and animations
4. Export your video

## Configuration Options

### Aspect Ratios

VideoAPI supports the following aspect ratios:

- `9:16` - Vertical/Portrait (1080×1920) - Perfect for stories and TikTok
- `16:9` - Landscape/Widescreen (1920×1080) - Standard for YouTube
- `4:3` - Standard (1080×720) - Classic video format
- `1:1` - Square (1080×1080) - Great for Instagram posts
- `21:9` - Ultrawide (1080×432) - Cinematic look

## Item Types

VideoAPI supports various item types that can be combined to create your video:

### Frame

A Frame is the main container that combines nodes (text and image elements) with a background media. Each frame represents a single scene in your video.

```javascript
{
  "id": "frame-1",         // Unique identifier
  "nodes": [ ... ],        // Array of nodes (text and image elements)
  "media": { ... },        // Background media (ImageItem or VideoItem)
  "duration": 100          // Duration in frames
}
```

### Text

Text items can be used as the main text, heading, subheading, or hashtags within a frame.

```javascript
{
  "id": "text-1",                // Unique identifier
  "type": "text",                // Item type
  "text": "Hello world",         // Text content
  "fontSize": 50,                // Font size in pixels
  "fontFamily": "Montserrat",    // Font family name
  "fontWeight": 700,             // Font weight (400, 700, etc.)
  "fontColor": "#ffffff",        // Text color (hex)
  "fontStyle": "normal",         // Font style ("normal", "italic")
  "fontVariant": "normal",       // Font variant
  "textAlign": "center",         // Text alignment ("left", "center", "right")
  "layout": "center",            // Position layout ("left", "center", "right")
  "x": 0,                        // Horizontal position offset
  "y": 150,                      // Vertical position
  "animationConfig": { ... },    // Animation configuration
  "dropShadow": { ... },         // Optional drop shadow
  "stroke": { ... },             // Optional text stroke/outline
  "fillGradient": { ... }        // Optional gradient fill
}
```

### Free Image

Free image items can be positioned anywhere within a frame with custom size, rotation, and styling effects.

```javascript
{
  "id": "image-1",               // Unique identifier
  "type": "image",               // Item type
  "url": "https://...",          // Image URL
  "x": 540,                      // Horizontal position
  "y": 300,                      // Vertical position
  "width": 200,                  // Width in pixels (optional)
  "height": 200,                 // Height in pixels (optional)
  "opacity": 1,                  // Opacity (0-1)
  "rotation": 0,                 // Rotation in degrees
  "scale": 1,                    // Scale factor
  "objectFit": "cover",          // Object fit ("cover", "contain", "fill", "none")
  "cornerRadius": 10,            // Rounded corner radius
  "animationConfig": { ... },    // Animation configuration
  "dropShadow": { ... },         // Optional drop shadow
  "border": {                    // Optional border
    "enabled": true,
    "width": 2,
    "color": "#ffffff",
    "style": "solid"             // "solid", "dashed", or "dotted"
  }
}
```

### Image

Image items are used for static background media in frames.

```javascript
{
  "id": "image-1",               // Unique identifier
  "type": "image",               // Item type
  "url": "https://...",          // Image URL
  "transitionConfig": { ... }    // Transition configuration
}
```

### Video

Video items are used for dynamic background media in frames.

```javascript
{
  "id": "video-1",               // Unique identifier
  "type": "video",               // Item type
  "url": "https://...",          // Video URL
  "volume": 1,                   // Video volume (0-1)
  "muted": false,                // Whether video is muted
  "startFrame": 0,               // Starting frame of the video
  "endFrame": 300,               // Ending frame of the video
  "transitionConfig": { ... }    // Transition configuration
}
```

### Audio

Audio items are used for adding sound to your video.

```javascript
{
  "id": "audio-1",               // Unique identifier
  "type": "audio",               // Item type
  "url": "https://...",          // Audio URL
  "startFrame": 0,               // Starting frame to play audio
  "endFrame": 300                // Ending frame to stop audio
}
```

### Text Elements

Each frame contains an array of text elements. You can have as many text elements as needed, positioned anywhere on the screen based on their properties.

For each text element, you can customize:

| Property     | Description              | Example Values                              |
| ------------ | ------------------------ | ------------------------------------------- |
| `fontSize`   | Size of the text         | `50`, `24`, `70`                            |
| `fontFamily` | Font name                | `"Montserrat"`, `"Roboto"`, `"Oswald"`      |
| `fontWeight` | Thickness of the text    | `400` (normal), `700` (bold), `900` (black) |
| `fontColor`  | Text color (hex)         | `"0xffffff"` (white), `"0x3498db"` (blue)   |
| `textAlign`  | Text alignment           | `"center"`, `"left"`, `"right"`             |
| `layout`     | Position on screen       | `"center"`, `"left"`, `"right"`             |
| `y`          | Vertical position        | `150`, `200`, `350`                         |
| `wordWrap`   | Whether text should wrap | `true`, `false`                             |

### Text Styling

#### Drop Shadow

```javascript
dropShadow: {
  enabled: true,
  color: "0x000000", // Shadow color
  alpha: 0.8,        // Opacity (0-1)
  blur: 6,           // Blur amount
  angle: Math.PI/4,  // Shadow angle
  distance: 8        // Distance from text
}
```

#### Stroke (Outline)

```javascript
stroke: {
  enabled: true,
  color: "0x2980b9", // Outline color
  width: 3,          // Thickness
  join: "round"      // Corner style: "round", "bevel", "miter"
}
```

#### Background

```javascript
backgroundConfig: {
  enabled: true,
  color: "0x000000",  // Background color
  alpha: 0.7,         // Background opacity (0-1)
  paddingX: 30,       // Horizontal padding in pixels
  paddingY: 15,       // Vertical padding in pixels
  cornerRadius: 10    // Rounded corner radius in pixels
}
```

#### Gradient Fill

```javascript
fillGradient: {
  enabled: true,
  colors: ["0xff0000", "0x0000ff"], // Array of colors (min 2)
  stops: [0, 1],                    // Optional color stops
  angle: 90                         // Gradient angle in degrees
}
```

### Animations

Available animation types for text:

| Animation    | Description                         | Configuration Properties                 |
| ------------ | ----------------------------------- | ---------------------------------------- |
| `typewriter` | Text appears character by character | `type`, `duration`                       |
| `fade`       | Text fades in                       | `type`, `duration`                       |
| `slide`      | Text slides in from a direction     | `type`, `duration`, `animationDirection` |
| `flash`      | Text flashes/pulses                 | `type`, `duration`                       |
| `pop`        | Text pops up with scaling           | `type`, `duration`                       |
| `pulse`      | Text pulses with opacity            | `type`, `duration`                       |
| `bounce`     | Text bounces in                     | `type`, `duration`, `animationDirection` |
| `rotate-in`  | Text rotates and slides in          | `type`, `duration`, `animationDirection` |

#### Animation Properties

| Property             | Description                               | Default    | Example Values                           |
| -------------------- | ----------------------------------------- | ---------- | ---------------------------------------- |
| `type`               | Type of animation                         | —          | `"typewriter"`, `"fade"`, etc.           |
| `duration`           | Animation time in frames                  | `30`       | `20`, `40`, `60`                         |
| `animationDirection` | Direction for slide and bounce            | `"bottom"` | `"left"`, `"right"`, `"top"`, `"bottom"` |
| `delay`              | Delay before animation starts (in frames) | `0`        | `10`, `30`, `60`                         |

The `delay` property allows you to stagger animations by specifying a wait time before an element begins animating. This delay is counted from the beginning of the scene - for example, with a delay of 30, the animation will start 30 frames after the scene begins. This is useful for creating sequential animations where multiple elements appear one after another.

Example with delay:

```javascript
{
  "id": "text-1",
  "type": "text",
  "text": "First element",
  "animationConfig": {
    "type": "fade",
    "duration": 30,
    "delay": 0  // Starts at frame 0 (beginning of scene)
  }
},
{
  "id": "text-2",
  "type": "text",
  "text": "Second element",
  "animationConfig": {
    "type": "fade",
    "duration": 30,
    "delay": 30  // Starts at frame 30 of the scene
  }
},
{
  "id": "text-3",
  "type": "text",
  "text": "Third element",
  "animationConfig": {
    "type": "fade",
    "duration": 30,
    "delay": 60  // Starts at frame 60 of the scene
  }
}
```

This allows you to create choreographed entrances for multiple text or image elements without having to manually time them with frame calculations.

#### Rotate-In Animation

The `rotate-in` animation creates a dynamic entrance effect where each character of text rotates and slides in from the specified direction. Characters animate one after another with a staggered timing effect for a more engaging appearance.

```javascript
animationConfig: {
  type: "rotate-in",
  duration: 60,              // Duration in frames
  animationDirection: "right", // Direction from which characters rotate in
  delay: 0                   // Optional delay before animation starts
}
```

Example:

```javascript
{
  "id": "3",
  "type": "text",
  "text": "@HAPPINESTAPP",
  "fontSize": 44,
  "fontFamily": "Montserrat",
  "fontWeight": 700,
  "fontColor": "#FFDE59",
  "textAlign": "center",
  "animationConfig": {
    "type": "rotate-in",
    "duration": 60,
    "animationDirection": "right"
  }
}
```

#### Animation Delay Examples

The `delay` property works with all animation types. Here are some examples:

##### Typewriter with Delay

```javascript
{
  "id": "delayed-typewriter",
  "type": "text",
  "text": "This text appears after 30 frames",
  "fontSize": 40,
  "fontFamily": "Roboto",
  "fontColor": "#ffffff",
  "animationConfig": {
    "type": "typewriter",
    "duration": 60,
    "delay": 30
  }
}
```

##### Slide with Delay

```javascript
{
  "id": "delayed-slide",
  "type": "text",
  "text": "Slides in after previous animation",
  "fontSize": 40,
  "fontFamily": "Oswald",
  "fontColor": "#3498db",
  "animationConfig": {
    "type": "slide",
    "duration": 40,
    "animationDirection": "left",
    "delay": 90
  }
}
```

##### Delayed Image Animation

```javascript
{
  "id": "delayed-image",
  "type": "image",
  "url": "https://example.com/icon.png",
  "x": 540,
  "y": 300,
  "width": 200,
  "height": 200,
  "animationConfig": {
    "type": "pop",
    "duration": 30,
    "delay": 120  // Appears at frame 120 of the scene
  }
}
```

##### Sequential Animated Elements

For complex sequences, you can use escalating delays:

```javascript
[
  {
    id: "title",
    type: "text",
    text: "WELCOME",
    animationConfig: {
      type: "fade",
      duration: 30,
      delay: 0, // Appears at frame 0
    },
  },
  {
    id: "subtitle",
    type: "text",
    text: "To Our Presentation",
    animationConfig: {
      type: "slide",
      duration: 30,
      delay: 30, // Appears at frame 30
    },
  },
  {
    id: "logo",
    type: "image",
    url: "https://example.com/logo.png",
    animationConfig: {
      type: "pop",
      duration: 30,
      delay: 60, // Appears at frame 60
    },
  },
];
```

### Transitions

Transitions define how one frame transitions to the next:

| Transition | Description                      | Properties              |
| ---------- | -------------------------------- | ----------------------- |
| `wipe`     | Wipes from one image to the next | `direction`, `duration` |
| `fade`     | Dissolves between images         | `duration`              |
| `slide`    | Slides one image over the other  | `direction`, `duration` |

Wipe directions: `"from-left"`, `"from-top-left"`, `"from-top"`, `"from-top-right"`, `"from-right"`, `"from-bottom-right"`, `"from-bottom"`, `"from-bottom-left"`

Slide directions: `"from-left"`, `"from-top"`, `"from-right"`, `"from-bottom"`

> **Note:** When setting transition durations, ensure that the transition duration does not exceed the frame duration. The calculation for total video duration subtracts the transition duration from the total frames to account for overlap during transitions. For optimal results, transition durations should be less than or equal to the shorter of the two adjacent frames' durations.

## Example Frame Configuration

```javascript
{
  id: "1",
  nodes: [
    {
      id: "text-1",
      type: "text",
      animationConfig: {
        type: "typewriter",
        duration: 40
      },
      text: "Welcome to VideoAPI",
      fontSize: 50,
      fontFamily: "Montserrat",
      fontWeight: 700,
      fontColor: "#3498db",
      fontStyle: "normal",
      fontVariant: "normal",
      textAlign: "center",
      layout: "center",
      x: 100,
      y: 150,
      backgroundConfig: {
        enabled: true,
        color: "#000000",
        alpha: 0.6,
        paddingX: 30,
        paddingY: 15,
        cornerRadius: 10
      }
    },
    {
      id: "header-1",
      type: "text",
      animationConfig: {
        type: "fade",
        duration: 30
      },
      text: "VIDEOAPI",
      fontSize: 70,
      fontFamily: "Oswald",
      fontWeight: 900,
      fontColor: "#ffffff",
      fontStyle: "normal",
      fontVariant: "normal",
      textAlign: "center",
      layout: "center",
      x: 100,
      y: 50
    },
    {
      id: "logo-1",
      type: "image",
      url: "https://example.com/logo.png",
      x: 540,
      y: 350,
      width: 120,
      height: 120,
      opacity: 1,
      rotation: 0,
      scale: 1,
      objectFit: "contain",
      cornerRadius: 10,
      animationConfig: {
        type: "pop",
        duration: 30
      },
      border: {
        enabled: true,
        width: 2,
        color: "#ffffff",
        style: "solid"
      },
      dropShadow: {
        enabled: true,
        color: "#000000",
        alpha: 0.7,
        blur: 10,
        angle: Math.PI / 4,
        distance: 5
      }
    }
  ],
  media: {
    id: "bg-1",
    type: "image",
    transitionConfig: {
      type: "wipe",
      direction: "from-left",
      duration: 30
    },
    url: "https://example.com/background.jpg"
  },
  duration: 120
}
```

### Frame Structure

Each frame in VideoAPI has the following structure:

| Property   | Description                            | Type     |
| ---------- | -------------------------------------- | -------- |
| `id`       | Unique identifier                      | `string` |
| `nodes`    | Array of nodes (text, images and gifs) | `array`  |
| `media`    | Background media (image, gif or video) | `object` |
| `duration` | Duration of frame in frames            | `number` |

### Node Types

The `nodes` array can contain both text and image elements, differentiated by their `type` property:

#### Text Node

```javascript
{
  id: "text-1",
  type: "text",
  text: "Your text content",
  fontSize: 50,
  fontFamily: "Montserrat",
  // Additional text properties...
}
```

#### Image Node

```javascript
{
  id: "image-1",
  type: "image",
  url: "https://example.com/image.jpg",
  x: 540,
  y: 350,
  width: 120,
  height: 120,
  // Additional image properties...
}
```

### Media Types

The `media` object defines the background content and can be either an image or video:

#### Image Background

```javascript
media: {
  id: "bg-1",
  type: "image",
  url: "https://example.com/background.jpg",
  transitionConfig: {
    // Transition properties...
  }
}
```

#### Video Background

```javascript
media: {
  id: "vid-1",
  type: "video",
  url: "https://example.com/background.mp4",
  volume: 0.8,
  muted: false,
  startFrame: 0,
  endFrame: 300,
  transitionConfig: {
    // Transition properties...
  }
}
```

## Complete API Configuration Example

Here's a complete example of the API configuration structure:

```javascript
{
  // Video aspect ratio: "9:16", "16:9", "4:3", "1:1", "21:9"
  "aspectRatio": "16:9",

  // Video quality: "1080p", "720p", "480p", "360p"
  "resolution": "1080p",

  // Background music options
  "musicUrl": "https://example.com/background-music.mp3",
  "musicStartFrame": 0,
  "musicEndFrame": 300,
  "musicVolume": 0.5,

  // Array of frames that make up the video
  "items": [
    {
      "id": "1",
      // Array of nodes (text and image elements)
      "nodes": [
        {
          "id": "1-main",
          "type": "text",
          "animationConfig": {
            "type": "typewriter",
            "duration": 40
          },
          "text": "Create Amazing Videos",
          "fontSize": 50,
          "fontFamily": "Montserrat",
          "fontWeight": 700,
          "fontColor": "#3498db",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "x": 0,
          "y": 150,
          "dropShadow": {
            "enabled": true,
            "color": "#000000",
            "alpha": 0.8,
            "blur": 6,
            "angle": Math.PI/4,
            "distance": 8
          },
          "stroke": {
            "enabled": true,
            "color": "#2980b9",
            "width": 3,
            "join": "round"
          }
        },
        {
          "id": "1-heading",
          "type": "text",
          "animationConfig": {
            "type": "fade",
            "duration": 30
          },
          "text": "VIDEOAPI",
          "fontSize": 70,
          "fontFamily": "Oswald",
          "fontWeight": 900,
          "fontColor": "#ffffff",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "x": 0,
          "y": 50
        },
        {
          "id": "1-subheading",
          "type": "text",
          "animationConfig": {
            "type": "slide",
            "duration": 25,
            "animationDirection": "bottom"
          },
          "text": "Programmatically create beautiful videos",
          "fontSize": 30,
          "fontFamily": "Roboto",
          "fontWeight": 400,
          "fontColor": "#ecf0f1",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "x": 0,
          "y": 230
        },
        {
          "id": "1-logo",
          "type": "image",
          "url": "https://example.com/logo.png",
          "x": 540,
          "y": 350,
          "width": 100,
          "height": 100,
          "opacity": 1,
          "rotation": 0,
          "scale": 1,
          "objectFit": "contain",
          "cornerRadius": 0,
          "animationConfig": {
            "type": "pop",
            "duration": 30
          }
        }
      ],

      // Frame media (image or video)
      "media": {
        "id": "1-media",
        "type": "image", // or "video"
        "transitionConfig": {
          "type": "wipe",
          "direction": "from-left",
          "duration": 40
        },
        "url": "https://example.com/background.jpg"
      },
      "duration": 120
    },

    // Example with flash animation
    {
      "id": "2",
      "nodes": [
        {
          "id": "2-text",
          "type": "text",
          "animationConfig": {
            "type": "flash",
            "duration": 40
          },
          "text": "Attention-grabbing text",
          "fontSize": 50,
          "fontFamily": "Impact",
          "fontWeight": 400,
          "fontColor": "#ff0000",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "x": 0,
          "y": 200
        }
      ],
      "media": {
        "id": "2-media",
        "type": "image",
        "transitionConfig": {
          "type": "fade",
          "duration": 30
        },
        "url": "https://example.com/background2.jpg"
      },
      "duration": 90
    },

    // Example with image and pop animation
    {
      "id": "3",
      "nodes": [
        {
          "id": "3-text",
          "type": "text",
          "animationConfig": {
            "type": "pop",
            "duration": 35
          },
          "text": "Dynamic pop effect",
          "fontSize": 60,
          "fontFamily": "Montserrat",
          "fontWeight": 700,
          "fontColor": "#00ff00",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "x": 0,
          "y": 150
        },
        {
          "id": "3-image",
          "type": "image",
          "url": "https://example.com/icon.png",
          "x": 540,
          "y": 300,
          "width": 200,
          "height": 200,
          "animationConfig": {
            "type": "rotate-in",
            "duration": 40,
            "animationDirection": "right"
          },
          "dropShadow": {
            "enabled": true,
            "color": "#000000",
            "alpha": 0.5,
            "blur": 10,
            "angle": Math.PI / 6,
            "distance": 10
          }
        }
      ],
      "media": {
        "id": "3-media",
        "type": "image",
        "transitionConfig": {
          "type": "slide",
          "direction": "from-right",
          "duration": 25
        },
        "url": "https://example.com/background3.jpg"
      },
      "duration": 100
    }
  ]
}
```

## Available Fonts

VideoAPI supports over 120 Google Fonts out of the box:

| Popular Fonts    | Stylish Fonts    | Unique Fonts        |
| ---------------- | ---------------- | ------------------- |
| Roboto           | Montserrat       | Dancing Script      |
| Open Sans        | Oswald           | Pacifico            |
| Lato             | Raleway          | Shadows Into Light  |
| Poppins          | Playfair Display | Indie Flower        |
| Roboto Condensed | Merriweather     | Righteous           |
| Source Sans Pro  | Ubuntu           | Lobster             |
| Nunito           | Lora             | Comfortaa           |
| Roboto Mono      | Kanit            | Architects Daughter |

### Recently Added Fonts

We've expanded our font selection with these stylish additions:

- **Modern Fonts**: `Honk`, `Kalnia Glaze`, `Madimi One`, `Lilita One`
- **Script Fonts**: `Great Vibes`, `Parisienne`, `Merienda`, `Arizonia`, `Allura`
- **Display Fonts**: `Alfa Slab One`, `Rampart One`, `Cinzel Decorative`, `Rakkas`
- **Asian Fonts**: `Noto Sans JP`, `Noto Sans KR`, `Noto Sans SC`, `Noto Sans TC`
- **Handwritten**: `Kalam`, `Pangolin`, `Permanent Marker`, `Yusei Magic`, `Jua`

### Complete Font List

```
Abel, AbrilFatface, Acme, AkayaKanadaka, AkayaTelivigala, AlfaSlabOne, Alkatra, Allura,
AmaticSC, Amita, Anton, ArchivoNarrow, Arimo, Arizonia, Arvo, Asap, Assistant, AveriaLibre,
Barlow, BarlowCondensed, BebasNeue, Bitter, Boogaloo, BraahOne, BreeSerif, BungeeSpice,
Cabin, Cairo, CarterOne, Catamaran, Charm, CinzelDecorative, Coiny, Comfortaa, CormorantGaramond,
Courgette, CrimsonText, Cuprum, DancingScript, DMSans, Dosis, EBGaramond, Exo, Exo2, FiraSans,
FjallaOne, FrancoisOne, Fraunces, GreatVibes, Heebo, Hind, HindSiliguri, Honk, IBMPlexSans,
Inconsolata, IndieFlower, Inter, JosefinSans, Jua, Kalam, KalniaGlaze, Kanit, Karla, Lato,
LibreBaskerville, LibreFranklin, LilitaOne, Lobster, Lora, MadimiOne, Manrope, MavenPro,
Merienda, Merriweather, MerriweatherSans, Montserrat, Mukta, Mulish, NanumGothic, NotoSans,
NotoSansJP, NotoSansKR, NotoSansSC, NotoSansTC, NotoSerif, Nunito, NunitoSans, OleoScript,
OpenSans, Oswald, Overpass, Oxygen, Pacifico, Pangolin, Parisienne, PermanentMarker, Play,
PlayfairDisplay, PoiretOne, Poppins, PottaOne, Prompt, PTSans, PTSansCaption, PTSansNarrow,
PTSerif, Questrial, Quicksand, Rajdhani, Rakkas, Raleway, RampartOne, Righteous, Roboto,
RobotoCondensed, RobotoMono, RobotoSlab, Rokkitt, Rubik, ShadowsIntoLight, Signika, Skranji,
Slabo27px, SourceCodePro, Teko, TitilliumWeb, Ubuntu, UbuntuCondensed, VarelaRound,
Vollkorn, WorkSans, YatraOne, YanoneKaffeesatz, YuseiMagic
```

## Server API Endpoints

The VideoAPI includes a standalone Express server that handles video rendering and uploads to S3. The server provides the following API endpoints:

### POST /api/render/:eventId/:compositionId

Renders a video based on the configuration provided in the request body, uploads it to S3, and returns a pre-signed URL.

**Request Parameters:**

- `eventId` (path): A unique identifier for the event or rendering session
- `compositionId` (path): The ID of the composition to render (defaults to "maindemo")

**Request Body:**

- The complete video configuration object with all frames, media, and animation settings.

**Response Format:**
The endpoint uses Server-Sent Events (SSE) to provide real-time progress updates during the rendering process:

```javascript
{
  "type": "info" | "progress" | "complete" | "error",
  "message": "Progress message",
  "progress": 0-100, // Percentage complete
  "data": {          // Only included with type: "complete"
    "success": true,
    "url": "https://your-s3-bucket.s3.amazonaws.com/path/to/video.mp4?[signed-params]",
    "eventId": "your-event-id"
  }
}
```

**Example Usage:**

```javascript
// Example request
fetch("http://localhost:3001/api/render/my-event-123/template1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    aspectRatio: "16:9",
    resolution: "1080p",
    items: [
      // Your frames configuration
    ],
  }),
})
  .then((response) => {
    const eventSource = new EventSource(response.url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "progress") {
        console.log(`Rendering progress: ${data.progress}%`);
      } else if (data.type === "complete") {
        console.log(`Render complete! Video URL: ${data.data.url}`);
        eventSource.close();
      } else if (data.type === "error") {
        console.error(`Error: ${data.message}`);
        eventSource.close();
      }
    };
  })
  .catch((error) => console.error("Error:", error));
```

**Implementation Details:**

The server handles the rendering process by:

1. Accepting the video configuration
2. Running Remotion's rendering engine
3. Uploading the resulting video to S3
4. Generating a pre-signed URL for accessing the video
5. Streaming progress updates to the client throughout the process

The rendered videos include metadata such as:

- Composition ID
- Aspect ratio
- Resolution
- Creation timestamp

This allows for easy tracking and management of rendered videos in your S3 bucket.

## Dependencies

- Express.js for the server framework
- Remotion for video rendering
- AWS SDK for S3 interactions
