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

A Frame is the main container that combines text elements and media. Each frame represents a single scene in your video.

```javascript
{
  "id": "frame-1",         // Unique identifier
  "type": "frame",         // Item type
  "text": [ ... ],         // Array of text elements (TextItems)
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
  "fontColor": "0xffffff",       // Text color (hex with 0x prefix)
  "fontStyle": "normal",         // Font style ("normal", "italic")
  "fontVariant": "normal",       // Font variant
  "textAlign": "center",         // Text alignment ("left", "center", "right")
  "layout": "center",            // Position layout ("left", "center", "right")
  "x": 0,                        // Horizontal position offset
  "y": 150,                      // Vertical position
  "wordWrap": true,              // Whether text should wrap
  "wordWrapWidth": 440,          // Width at which to wrap text
  "animationConfig": { ... },    // Animation configuration
  "dropShadow": { ... },         // Optional drop shadow
  "stroke": { ... },             // Optional text stroke/outline
  "fillGradient": { ... }        // Optional gradient fill
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

#### Animation Properties

| Property             | Description                    | Default    | Example Values                           |
| -------------------- | ------------------------------ | ---------- | ---------------------------------------- |
| `type`               | Type of animation              | —          | `"typewriter"`, `"fade"`, etc.           |
| `duration`           | Animation time in frames       | `30`       | `20`, `40`, `60`                         |
| `animationDirection` | Direction for slide and bounce | `"bottom"` | `"left"`, `"right"`, `"top"`, `"bottom"` |

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
  type: "frame",
  text: [
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
      fontColor: "0x3498db",
      textAlign: "center",
      layout: "center",
      y: 150,
      backgroundConfig: {
        enabled: true,
        color: "0x000000",
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
      fontColor: "0xffffff",
      textAlign: "center",
      layout: "center",
      y: 50
    }
  ],
  media: {
    id: "img-1",
    type: "image",
    transitionConfig: {
      type: "wipe",
      direction: "from-left",
      duration: 30
    },
    url: "https://example.com/image.jpg"
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
      "type": "frame",

      // Array of text elements
      "text": [
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
          "fontColor": "0x3498db",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "y": 150,
          "dropShadow": {
            "enabled": true,
            "color": "0x000000",
            "alpha": 0.8,
            "blur": 6,
            "angle": Math.PI/4,
            "distance": 8
          },
          "stroke": {
            "enabled": true,
            "color": "0x2980b9",
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
          "fontColor": "0xffffff",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
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
          "fontColor": "0xecf0f1",
          "fontStyle": "normal",
          "fontVariant": "normal",
          "textAlign": "center",
          "layout": "center",
          "y": 230
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
      }
    },

    // Example with flash animation
    {
      "id": "2",
      "type": "frame",
      "text": [
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
          "fontColor": "0xff0000",
          "textAlign": "center",
          "layout": "center"
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
      }
    },

    // Example with pop animation
    {
      "id": "3",
      "type": "frame",
      "text": [
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
          "fontColor": "0x00ff00",
          "textAlign": "center",
          "layout": "center"
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
      }
    }
  ]
}
```

## Available Fonts

VideoAPI supports over 90 Google Fonts out of the box:

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

### Complete Font List

```
Abel, AbrilFatface, Acme, AmaticSC, Anton, ArchivoNarrow, Arimo, Arvo, Asap,
Assistant, Barlow, BarlowCondensed, BebasNeue, Bitter, BreeSerif, Cabin, Cairo,
Catamaran, Comfortaa, CrimsonText, Cuprum, Dancing Script, Cormorant Garamond,
DM Sans, Dosis, EBGaramond, Exo, Exo2, FiraSans, FjallaOne, FrancoisOne, Fraunces,
Heebo, Hind, HindSiliguri, IBMPlexSans, Inconsolata, IndieFlower, Inter, JosefinSans,
Kanit, Karla, Lato, LibreBaskerville, LibreFranklin, Lobster, Lora, Manrope, MavenPro,
Merriweather, MerriweatherSans, Montserrat, Mukta, Mulish, NanumGothic, NotoSans,
NotoSansJP, NotoSansKR, NotoSansSC, NotoSansTC, NotoSerif, Nunito, NunitoSans,
Open Sans, Oswald, Overpass, Oxygen, Pacifico, Play, Playfair Display, PoiretOne,
Poppins, Prompt, PTSans, PTSansCaption, PTSansNarrow, PTSerif, Questrial, Quicksand,
Rajdhani, Raleway, Righteous, Roboto, RobotoCondensed, Roboto Mono, RobotoSlab,
Rokkitt, Rubik, ShadowsIntoLight, Signika, Slabo27px, SourceCodePro, Teko,
TitilliumWeb, Ubuntu, UbuntuCondensed, Varela Round, Vollkorn, WorkSans, YanoneKaffeesatz
```
