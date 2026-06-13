![Banner](https://github.com/user-attachments/assets/80f2fbf0-2604-4e10-a455-af87bad7c419)

# browser-image-scout

🛰 A TypeScript-first package that checks image format support by loading tiny base64 data-URL images with the browser Image constructor, watching `load/error` events and `naturalWidth`, and returning a promise for each format with `{ mimeType, imgType, supported, timestamp }` so you get a simple yes/no answer for whether the format is supported.

Each direct helper caches its first detection result, so repeated calls for the same format reuse the same promise/result instead of creating a new `Image` check.

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
};
```

`timestamp.ms` is the Unix timestamp in milliseconds when the detection result was created.
`timestamp.str` is a formatted local date/time string.

### 🔤 Available Functions/Example API Usage

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
// {
//   mimeType: 'image/avif',
//   imgType: 'avif',
//   supported: true,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/avif',
//   imgType: 'avif',
//   supported: false,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
// {
//   mimeType: 'image/gif',
//   imgType: 'gif',
//   supported: true,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/gif',
//   imgType: 'gif',
//   supported: false,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
// {
//   mimeType: 'image/jpeg',
//   imgType: 'jpeg',
//   supported: true,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/jpeg',
//   imgType: 'jpeg',
//   supported: false,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
// {
//   mimeType: 'image/jxl',
//   imgType: 'jxl',
//   supported: true,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/jxl',
//   imgType: 'jxl',
//   supported: false,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
// {
//   mimeType: 'image/png',
//   imgType: 'png',
//   supported: true,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/png',
//   imgType: 'png',
//   supported: false,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
// {
//   mimeType: 'image/svg+xml',
//   imgType: 'svg',
//   supported: true,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/svg+xml',
//   imgType: 'svg',
//   supported: false,
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
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }

// fail response
// {
//   mimeType: 'image/webp',
//   imgType: 'webp',
//   supported: false,
//   timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
// }
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
//   {
//     mimeType: 'image/avif',
//     imgType: 'avif',
//     supported: true,
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/gif',
//     imgType: 'gif',
//     supported: true,
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/jxl',
//     imgType: 'jxl',
//     supported: false,
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
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
//   {
//     mimeType: 'image/avif',
//     imgType: 'avif',
//     supported: true,
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/webp',
//     imgType: 'webp',
//     supported: false,
//     timestamp: { ms: 1760000000000, str: 'Sat 13-Jun-2026, 10:30:05 AM' },
//   },
//   {
//     mimeType: 'image/png',
//     imgType: 'png',
//     supported: true,
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

------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------|---------|----------|---------|---------|-------------------
All files                     |   98.61 |     90.8 |     100 |   98.61 |
 get-all-image-format-support |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
 is-image-format-supported    |     100 |      100 |     100 |     100 |
  index.ts                    |     100 |      100 |     100 |     100 |
 shared                       |     100 |       50 |     100 |     100 |
  get-timestamp.ts            |     100 |       50 |     100 |     100 | 24
  index.ts                    |     100 |      100 |     100 |     100 |
 shared/mocks                 |     100 |      100 |     100 |     100 |
  mock-broken-image.ts        |     100 |      100 |     100 |     100 |
  mock-image.ts               |     100 |      100 |     100 |     100 |
 supports-avif                |   97.82 |    88.88 |     100 |   97.82 |
  index.ts                    |   97.82 |    88.88 |     100 |   97.82 | 20
 supports-gif                 |   97.87 |    88.88 |     100 |   97.87 |
  index.ts                    |   97.87 |    88.88 |     100 |   97.87 | 20
 supports-jpeg                |   98.18 |    88.88 |     100 |   98.18 |
  index.ts                    |   98.18 |    88.88 |     100 |   98.18 | 20
 supports-jpegxl              |   97.82 |    88.88 |     100 |   97.82 |
  index.ts                    |   97.82 |    88.88 |     100 |   97.82 | 20
 supports-png                 |   97.82 |    88.88 |     100 |   97.82 |
  index.ts                    |   97.82 |    88.88 |     100 |   97.82 | 20
 supports-svg                 |   97.82 |    88.88 |     100 |   97.82 |
  index.ts                    |   97.82 |    88.88 |     100 |   97.82 | 20
 supports-webp                |   97.82 |    88.88 |     100 |   97.82 |
  index.ts                    |   97.82 |    88.88 |     100 |   97.82 | 20
------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 10 passed, 10 total
Tests:       45 passed, 45 total
Snapshots:   0 total
```

### 📚 Contributions

1. New Ideas/Contributions: Open Discussion(s) - https://github.com/NPM-Workbench/browser-image-scout/discussions
2. Issues and Debugging: Open Issue(s) - https://github.com/NPM-Workbench/browser-image-scout/issues

### ❤️ Support

Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
