![Banner](https://github.com/user-attachments/assets/80f2fbf0-2604-4e10-a455-af87bad7c419)
# browser-image-scout
A typescript-first package that helps detect whether a browser or (any suitable runtime environment) can support image formats. It works by creating a tiny image from `base64` data URLs, observe the `Image` contructor's `load`/`error` and `naturalWidh` to determine the support. Each format helper function is expected to return a promise that resolves to an object containing the support information.

🎓 **In simple words:** this package asks the browser (or a mocked test environment) to try loading tiny example images for each format and reports back whether those images actually decoded — giving you a reliable yes/no for whether that image format is supported.

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

### 📚 Contributions
1. New Ideas/Contributions: Open Discussion(s) - https://github.com/NPM-Workbench/browser-image-scout/discussions
2. Issues and Debugging: Open Issue(s) - https://github.com/NPM-Workbench/browser-image-scout/issues

### 🔒 Security & Privacy
1. This package is open source and designed for client-side work. It does not collect, store, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection systems.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the Security Policy.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
