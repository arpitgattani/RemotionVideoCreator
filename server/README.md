# VideoAPI Express Server

This is an Express server implementation of the VideoAPI rendering service that replicates the functionality of the Next.js API route.

## Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Build the TypeScript code:

   ```bash
   npm run build
   ```

3. Generate the Remotion bundle (must be done before starting the server):

   ```bash
   # From the project root directory
   node scripts/bundle.mjs
   ```

   This will create the bundle in the worker directory and copy it to the `server/bundle` directory automatically.

4. Start the server:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

## API Endpoints

### POST /api/render

Renders a video based on the provided configuration.

**Request Body:**

- Same JSON structure as used in the Next.js API route, including all animation configuration properties.

**Request Body Example:**

```json
{
  "aspectRatio": "16:9",
  "resolution": "1080p",
  "items": [
    {
      "id": "frame1",
      "type": "frame",
      "text": {
        "id": "text1",
        "type": "text",
        "animationConfig": {
          "type": "fade",
          "duration": 30
        },
        "text": "Hello World",
        "fontSize": 60,
        "fontFamily": "Montserrat",
        "fontWeight": 700,
        "fontColor": "0xffffff",
        "textAlign": "center",
        "layout": "center"
      },
      "media": {
        "id": "media1",
        "type": "image",
        "url": "https://example.com/background.jpg",
        "transitionConfig": {
          "type": "fade",
          "duration": 30
        }
      }
    }
  ]
}
```

**Response:**

- Success: `{ message: "Render done!" }`
- Error: `{ error: "Failed to render video", message: "Error details" }`

### GET /health

Health check endpoint to verify the server is running.

**Response:**

- `{ status: "ok" }`

## Item Types

The server supports all item types from the main VideoAPI:

### Frame Items

Frames are the main containers that combine text and media elements into scenes.

```javascript
{
  "id": "frame-1",         // Unique identifier
  "type": "frame",         // Item type
  "text": [ ... ],         // Array of text elements (TextItems)
  "media": { ... },        // Background media (ImageItem or VideoItem)
  "duration": 100          // Duration in frames
}
```

### Text Items

Text elements can be added to the frame's text array.

```javascript
{
  "id": "text-1",                // Unique identifier
  "type": "text",                // Item type
  "text": "Hello world",         // Text content
  "fontSize": 50,                // Font size in pixels
  "fontFamily": "Montserrat",    // Font family name
  "fontWeight": 700,             // Font weight
  "fontColor": "0xffffff",       // Text color
  "animationConfig": {           // Animation configuration
    "type": "fade",              // Animation type
    "duration": 30               // Duration in frames
  }
  // ... other text properties
}
```

### Media Items

Media items can be either images or videos used as frame backgrounds.

#### Image

```javascript
{
  "id": "image-1",               // Unique identifier
  "type": "image",               // Item type
  "url": "https://...",          // Image URL
  "transitionConfig": {          // Transition configuration
    "type": "fade",              // Transition type
    "duration": 30               // Duration in frames
  }
}
```

#### Video

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

For a complete reference of all item properties and animation options, refer to the main README.md.

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=3001
NODE_ENV=development
```

## Directory Structure

- `server/` - Root directory for the Express server
  - `routes/` - API route handlers
  - `bundle/` - Contains the Remotion bundle files (automatically copied from the worker directory)
  - `out/` - Output directory for rendered videos

## Animation Configuration

The server supports the following animation properties:

- `type` - The type of animation (required)
- `duration` - Animation time in frames (default: 30)
- `animationDirection` - Direction for slide and bounce animations (only applicable for those types)

Valid animation types include:

- `typewriter` - Text appears character by character
- `fade` - Text fades in
- `slide` - Text slides in from a direction (requires animationDirection)
- `flash` - Text flashes/pulses
- `pop` - Text pops up with scaling
- `pulse` - Text pulses with opacity
- `bounce` - Text bounces in (requires animationDirection)

## Text Styling Options

### Background Configuration

Add a background behind text elements with the following properties:

```javascript
backgroundConfig: {
  enabled: true,          // Whether the background is visible
  color: "0x000000",      // Background color (hex)
  alpha: 0.7,             // Background opacity (0-1)
  paddingX: 30,           // Horizontal padding in pixels
  paddingY: 15,           // Vertical padding in pixels
  cornerRadius: 10        // Rounded corner radius in pixels
}
```

The background can be styled independently of the text content, allowing for clean, readable text over any media content.

## Dependencies

- Express.js for the server framework
- Remotion for video rendering
- TypeScript for type safety
