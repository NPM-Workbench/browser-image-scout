/* imports */
import { JPEG_BASE_64_IMG_ENC } from '../shared/index.js';
import type { TSupportState } from '../types/index.js';
import createTimestamp from '../shared/get-timestamp.js';
import getBrowserEnv from '../shared/get-browser-env.js';

/* types */
type TSupportsJPEGReturn = TSupportState;

/* cache res */
let cacheRes: Promise<TSupportsJPEGReturn> | null = null;

/* module */
async function supportsJPEG(): Promise<TSupportsJPEGReturn> {
  if (typeof window === 'undefined') {
    throw new Error('[Global Not Found]: Window Object');
  } else if (typeof Image === 'undefined') {
    throw new Error('[Global Not Found]: Image Constructor');
  } else {
    if (cacheRes) {
      return cacheRes;
    } else {
      cacheRes = new Promise((resolve) => {
        /* setup */
        const mimeType = 'image/jpeg';
        const imgType = 'jpeg';
        const B64_URL = `data:${mimeType};base64,${JPEG_BASE_64_IMG_ENC}`;
        const image = new Image();
        const browserEnv = getBrowserEnv();

        image.addEventListener(
          'load',
          () => {
            resolve({ mimeType, imgType, supported: image.naturalWidth > 0, timestamp: createTimestamp(), browserEnv });
          },
          { once: true },
        );

        image.addEventListener(
          'error',
          () => {
            resolve({ mimeType, imgType, supported: false, timestamp: createTimestamp(), browserEnv });
          },
          { once: true },
        );

        image.src = B64_URL;
      });

      return cacheRes;
    }
  }
}

/* exports */
export type { TSupportsJPEGReturn };
export { supportsJPEG };
