![Banner](https://github.com/user-attachments/assets/80f2fbf0-2604-4e10-a455-af87bad7c419)
![npm](https://img.shields.io/npm/v/browser-image-scout)
![downloads](https://img.shields.io/npm/dw/browser-image-scout)
![license](https://img.shields.io/npm/l/browser-image-scout)
![Security Policy](https://img.shields.io/badge/security-policy-brightgreen)
![npm_provenance](https://img.shields.io/badge/npm-provenance-brightgreen?logo=npm)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/frankfurter-api-client-v2)

# browser-image-scout

🛰 A TypeScript-first package that checks image format support by loading tiny base64 data-URL images with the browser Image constructor, watching `load/error` events and `naturalWidth`, and returning a promise for each format with `{ mimeType, imgType, supported, timestamp, browserEnv }` so you get a simple yes/no answer for whether the format is supported, plus the browser environment details.

Each direct helper caches its first detection result, so repeated calls for the same format reuse the same promise/result instead of creating a new `Image` check.

### 📦 Installation

```console
npm install --save browser-image-scout
```

💡 Note: Meant to work mostly as a client-side/browser package.

### 📘 Features

1. TypeScript-First: Provides full type definitions
2. Lightweight: No runtime dependencies; uses tiny base64-encoded sample images embedded in the package and no third-party npm packages for browser detection
3. Accurate detection: Uses in-memory data-URL images and Image load/error events plus `image.naturalWidth > 0` to determine true decoder support.
4. Formats supported: `avif`, `webp`, `jpeg`, `png`, `gif`, `svg`, `jxl`.
5. Tree-shakeable: Supports per-module imports
6. Returns browser environment details via `navigator.userAgentData` when available, with a `navigator.userAgent` fallback for older browsers.
7. Package comprises of both direct Helper and Convenience functions
8. No network required: Detection runs entirely in-memory (no external requests)
9. Easy to Understand: API features are easy to understand, which can be integrated into your client side application code

### 🧿 Response Shape

```typescript
type TSupportState = {
  mimeType:
    | 'image/avif'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/jxl'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp';
  imgType: 'avif' | 'gif' | 'jpeg' | 'jxl' | 'png' | 'svg' | 'webp';
  supported: boolean;
  timestamp: {
    ms: number;
    str: string;
  };
  browserEnv: {
    name: string;
    version: string | number | null;
  };
};
```

`timestamp.ms` is the Unix timestamp in milliseconds when the detection result was created.
`timestamp.str` is a formatted local date/time string.

### 🔤 Available Functions/Example API Usage

```javascript
/* developers can opt for two types of imports as shown below */
/* 🧰 full bundle import */
import { supportsAVIF } from 'browser-image-scout';

/* 🌳 tree-shakeable import */
import { supportsAVIF } from 'browser-image-scout/supports-avif';
```

1. 📁 Supports AVIF

```javascript
/* node modules */
import { supportsAVIF } from 'browser-image-scout/supports-avif';
import type { TSupportsAVIFReturn } from 'browser-image-scout/supports-avif';

/* example */
async function exampleAVIF() {
  const res: TSupportsAVIFReturn = await supportsAVIF();
  console.log(res);
}
await exampleAVIF();

// ok response
// {
//   mimeType: 'image/avif',
//   imgType: 'avif',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/avif',
//   imgType: 'avif',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
```

2. 📁 Supports GIF

```javascript
/* node modules */
import { supportsGIF } from 'browser-image-scout/supports-gif';
import type { TSupportsGIFReturn } from 'browser-image-scout/supports-gif';

/* example */
async function exampleGIF() {
  const res: TSupportsGIFReturn = await supportsGIF();
  console.log(res);
}
await exampleGIF();

// ok response
// {
//   mimeType: 'image/gif',
//   imgType: 'gif',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/gif',
//   imgType: 'gif',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
```

3. 📁 Supports JPEG

```javascript
/* node modules */
import { supportsJPEG } from 'browser-image-scout/supports-jpeg';
import type { TSupportsJPEGReturn } from 'browser-image-scout/supports-jpeg';

/* example */
async function exampleJPEG() {
  const res: TSupportsJPEGReturn = await supportsJPEG();
  console.log(res);
}
await exampleJPEG();

// ok response
// {
//   mimeType: 'image/jpeg',
//   imgType: 'jpeg',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/jpeg',
//   imgType: 'jpeg',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
```

4. 📁 Supports JPEGXL

```javascript
/* node modules */
import { supportsJPEGXL } from 'browser-image-scout/supports-jpegxl';
import type { TSupportsJPEGXLReturn } from 'browser-image-scout/supports-jpegxl';

/* example */
async function exampleJPEGXL() {
  const res: TSupportsJPEGXLReturn = await supportsJPEGXL();
  console.log(res);
}
await exampleJPEGXL();

// ok response
// {
//   mimeType: 'image/jxl',
//   imgType: 'jxl',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/jxl',
//   imgType: 'jxl',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
```

5. 📁 Supports PNG

```javascript
/* node modules */
import { supportsPNG } from 'browser-image-scout/supports-png';
import type { TSupportsPNGReturn } from 'browser-image-scout/supports-png';

/* example */
async function examplePNG() {
  const res: TSupportsPNGReturn = await supportsPNG();
  console.log(res);
}
await examplePNG();

// ok response
// {
//   mimeType: 'image/png',
//   imgType: 'png',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/png',
//   imgType: 'png',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
```

6. 📁 Supports SVG

```javascript
/* node modules */
import { supportsSVG } from 'browser-image-scout/supports-svg';
import type { TSupportsSVGReturn } from 'browser-image-scout/supports-svg';

/* example */
async function exampleSVG() {
  const res: TSupportsSVGReturn = await supportsSVG();
  console.log(res);
}
await exampleSVG();

// ok response
// {
//   mimeType: 'image/svg+xml',
//   imgType: 'svg',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/svg+xml',
//   imgType: 'svg',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
// {
//   mimeType: 'image/webp',
//   imgType: 'webp',
//   supported: true,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/webp',
//   imgType: 'webp',
//   supported: false,
//   browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
```

8. 📁 Get All Image Format Support

```javascript
import { getAllImageFormatSupport } from 'browser-image-scout/get-all-image-format-support';
import type { TGetAllImageFormatSupportReturn } from 'browser-image-scout/get-all-image-format-support';

async function exampleAll() {
  const res: TGetAllImageFormatSupportReturn = await getAllImageFormatSupport();
  console.log(res);
}
await exampleAll();

// response schema/shape
// [
//   {
//     mimeType: 'image/avif',
//     imgType: 'avif',
//     supported: true,
//     browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/gif',
//     imgType: 'gif',
//     supported: true,
//     browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/jxl',
//     imgType: 'jxl',
//     supported: false,
//     browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   ...
//   ...
//   ...
// ]
```

9. 📁 Is Image Format Supported

```javascript
import { isImageFormatSupported } from 'browser-image-scout/is-image-format-supported';
import type { TIsImageFormatSupportedReturn } from 'browser-image-scout/is-image-format-supported';

async function exampleSome() {
  const res: TIsImageFormatSupportedReturn[] = await isImageFormatSupported([
    'avif',
    'webp',
    'png',
  ]);
  console.log(res);
}
await exampleSome();

// response schema/shape
// [
//   {
//     mimeType: 'image/avif',
//     imgType: 'avif',
//     supported: true,
//     browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/webp',
//     imgType: 'webp',
//     supported: false,
//     browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/png',
//     imgType: 'png',
//     supported: true,
//     browserEnv: { name: 'Google Chrome', version: '176.0.0.0' },
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
// ]
```

### 📗 Test Coverage

```console
PASS src/shared/tests/shared.test.ts
PASS src/is-image-format-supported/tests/is-image-format-supported.test.ts
PASS src/get-all-image-format-support/tests/get-all-image-format-support.test.ts
PASS src/supports-webp/tests/supports-webp.test.ts
PASS src/supports-svg/tests/supports-svg.test.ts
PASS src/supports-png/tests/supports-png.test.ts
PASS src/supports-avif/tests/supports-avif.test.ts
PASS src/supports-gif/tests/supports-gif.test.ts
PASS src/supports-jpeg/tests/supports-jpeg.test.ts
PASS src/supports-jpegxl/tests/supports-jpegxl.test.ts

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   88.16 |    89.77 |   96.77 |   88.16 |
 ...format-support |     100 |      100 |     100 |     100 |
  index.ts         |     100 |      100 |     100 |     100 |
 ...rmat-supported |     100 |      100 |     100 |     100 |
  index.ts         |     100 |      100 |     100 |     100 |
 shared            |   42.05 |    33.33 |      50 |   42.05 |
  ...rowser-env.ts |       0 |        0 |       0 |       0 | 1-62
  get-timestamp.ts |     100 |       50 |     100 |     100 | 24
  index.ts         |     100 |      100 |     100 |     100 |
 shared/mocks      |     100 |      100 |     100 |     100 |
  ...oken-image.ts |     100 |      100 |     100 |     100 |
  mock-image.ts    |     100 |      100 |     100 |     100 |
 supports-avif     |   97.91 |    88.88 |     100 |   97.91 |
  index.ts         |   97.91 |    88.88 |     100 |   97.91 | 21
 supports-gif      |   97.95 |    88.88 |     100 |   97.95 |
  index.ts         |   97.95 |    88.88 |     100 |   97.95 | 21
 supports-jpeg     |   98.24 |    88.88 |     100 |   98.24 |
  index.ts         |   98.24 |    88.88 |     100 |     98.24 | 21
 supports-jpegxl   |   97.91 |    88.88 |     100 |   97.91 |
  index.ts         |   97.91 |    88.88 |     100 |   97.91 | 21
 supports-png      |   97.91 |    88.88 |     100 |   97.91 |
  index.ts         |   97.91 |    88.88 |     100 |   97.91 | 21
 supports-svg      |   97.91 |    88.88 |     100 |   97.91 |
  index.ts         |   97.91 |    88.88 |     100 |   97.91 | 21
 supports-webp     |   97.91 |    88.88 |     100 |   97.91 |
  index.ts         |   97.91 |    88.88 |     100 |   97.91 | 21
-------------------|---------|----------|---------|---------|-------------------

Test Suites: 10 passed, 10 total
Tests:       45 passed, 45 total
Snapshots:   0 total
Time:        7.157 s
```

### 📚 Contributions

1. New Ideas/Contributions: Open Discussion(s) - https://github.com/NPM-Workbench/browser-image-scout/discussions
2. Issues and Debugging: Open Issue(s) - https://github.com/NPM-Workbench/browser-image-scout/issues

### 🔒 Security & Privacy

1. This package is open source and intended to provide reusable utilities for application development. It does not collect, store, transmit, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection mechanisms.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the [Security Policy](https://github.com/NPM-Workbench/browser-image-scout/security/policy).

### ❤️ Support

Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
