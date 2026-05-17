![Banner](https://github.com/user-attachments/assets/80f2fbf0-2604-4e10-a455-af87bad7c419)
# browser-image-scout
🛰 A TypeScript-first package that checks image format support by loading tiny base64 data-URL images with the browser Image constructor, watching `load/error` events and `naturalWidth`, and returning a promise for each format with `{ mimeType, imgType, supported }` so you get a simple yes/no answer for whether the format is supported.

### 📦 Installation
```console
npm install --save browser-image-scout
```
💡 Note: Meant to work mostly as a client-side/browser package.

### 📘 Features
1. TypeScript-First: Provides full type definitions
2. Lightweight: No runtime dependencies; uses tiny base64-encoded sample images embedded in the package
3. Accurate detection: Uses in-memory data-URL images and Image load/error events plus `image.naturalWidth > 0` to determine true decoder support.
4. Formats supported: `avif`, `webp`, `jpeg`, `png`, `gif`, `svg`, `jxl`.
5. Package comprises of both direct Helper and Convenience functions
6. No network required: Detection runs entirely in-memory (no external requests)
7. Easy to Understand: API features are easy to understand, which can be integrated into your client side application code

### 🔤 Fuctions Example Usage
1. 📁 Supports AVIF
```javascript
/* node modules */
import { supportsAVIF } from 'browser-image-scout';
import type { TSupportsAVIFReturn } from 'browser-image-scout';

/* example */
async function exampleAVIF() {
  const res: TSupportsAVIFReturn = await supportsAVIF();
  console.log(res);
}
await exampleAVIF();

// ok response
// { mimeType: 'image/avif', imgType: 'avif', supported: true }

// fail response
// { mimeType: 'image/avif', imgType: 'avif', supported: false }
```
2. 📁 Supports GIF
```javascript
/* node modules */
import { supportsGIF } from 'browser-image-scout';
import type { TSupportsGIFReturn } from 'browser-image-scout';

/* example */
async function exampleGIF() {
  const res: TSupportsGIFReturn = await supportsGIF();
  console.log(res);
}
await exampleGIF();

// ok response
// { mimeType: 'image/gif', imgType: 'gif', supported: true }

// fail response
// { mimeType: 'image/gif', imgType: 'gif', supported: false }
```
3. 📁 Supports JPEG
```javascript
/* node modules */
import { supportsJPEG } from 'browser-image-scout';
import type { TSupportsJPEGReturn } from 'browser-image-scout';

/* example */
async function exampleJPEG() {
  const res: TSupportsJPEGReturn = await supportsJPEG();
  console.log(res);
}
await exampleJPEG();

// ok response
// { mimeType: 'image/jpeg', imgType: 'jpeg', supported: true }

// fail response
// { mimeType: 'image/jpeg', imgType: 'jpeg', supported: false }
```
4. 📁 Supports JPEGXL
```javascript
/* node modules */
import { supportsJPEGXL } from 'browser-image-scout';
import type { TSupportsJPEGXLReturn } from 'browser-image-scout';

/* example */
async function exampleJPEGXL() {
  const res: TSupportsJPEGXLReturn = await supportsJPEGXL();
  console.log(res);
}
await exampleJPEGXL();

// ok response
// { mimeType: 'image/jxl', imgType: 'jxl', supported: true }

// fail response
// { mimeType: 'image/jxl', imgType: 'jxl', supported: false }
```
5. 📁 Supports PNG
```javascript
/* node modules */
import { supportsPNG } from 'browser-image-scout';
import type { TSupportsPNGReturn } from 'browser-image-scout';

/* example */
async function examplePNG() {
  const res: TSupportsPNGReturn = await supportsPNG();
  console.log(res);
}
await examplePNG();

// ok response
// { mimeType: 'image/png', imgType: 'png', supported: true }

// fail response
// { mimeType: 'image/png', imgType: 'png', supported: false }
```
6. 📁 Supports SVG
```javascript
/* node modules */
import { supportsSVG } from 'browser-image-scout';
import type { TSupportsSVGReturn } from 'browser-image-scout';

/* example */
async function exampleSVG() {
  const res: TSupportsSVGReturn = await supportsSVG();
  console.log(res);
}
await exampleSVG();

// ok response
// { mimeType: 'image/svg+xml', imgType: 'svg', supported: true }

// fail response
// { mimeType: 'image/svg+xml', imgType: 'svg', supported: false }
```
7. 📁 Supports WEBP
```javascript
/* node modules */
import { supportsWEBP } from 'browser-image-scout';
import type { TSupportsWEBPReturn } from 'browser-image-scout';

/* example */
async function exampleWEBP() {
  const res: TSupportsWEBPReturn = await supportsWEBP();
  console.log(res);
}
await exampleWEBP();

// ok response
// { mimeType: 'image/webp', imgType: 'webp', supported: true }

// fail response
// { mimeType: 'image/webp', imgType: 'webp', supported: false }
```
8. 📁 Get All Image Format Support
```javascript
import { getAllImageFormatSupport } from 'browser-image-scout';
import type { TGetAllImageFormatSupportReturn } from 'browser-image-scout';

async function exampleAll() {
  const res: TGetAllImageFormatSupportReturn = await getAllImageFormatSupport();
  console.log(res);
}
await exampleAll();

// response schema/shape
// [
//   { mimeType: 'image/avif', imgType: 'avif', supported: true },
//   { mimeType: 'image/gif', imgType: 'gif', supported: true },
//   { mimeType: 'image/jxl', imgType: 'jxl', supported: false },
//   ...
//   ...
//   ...
// ]
```
9. 📁 Is Image Format Supported
```javascript
import { isImageFormatSupported } from 'browser-image-scout';
import type { TIsImageFormatSupportedReturn } from 'browser-image-scout';

async function exampleSome() {
  const res: TIsImageFormatSupportedReturn = await isImageFormatSupported([
    'avif',
    'webp',
    'png',
  ]);
  console.log(res);
}
await exampleSome();

// response schema/shape
// [
//   { mimeType: 'image/avif', imgType: 'avif', supported: true },
//   { mimeType: 'image/webp', imgType: 'webp', supported: false },
//   { mimeType: 'image/png', imgType: 'png', supported: true },
// ]
```

### 📚 Contributions
1. New Ideas/Contributions: Open Discussion(s) - https://github.com/NPM-Workbench/browser-image-scout/discussions
2. Issues and Debugging: Open Issue(s) - https://github.com/NPM-Workbench/browser-image-scout/issues

### 🔒 Security & Privacy
1. This package is open source and designed for client-side work. It does not collect, store, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection systems.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the Security Policy.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
