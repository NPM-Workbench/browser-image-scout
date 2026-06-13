/* imports */
import { AVIF_BASE_64_IMG_ENC } from '../shared/index.js';
import type { TSupportState } from '../types/index.js';
import createTimestamp from '../shared/get-timestamp.js';

/* types */
type TSupportsAVIFReturn = TSupportState;

/* cache res */
let cacheRes: Promise<TSupportsAVIFReturn> | null = null;

/* module */
async function supportsAVIF(): Promise<TSupportsAVIFReturn> {
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
        const mimeType = 'image/avif';
        const imgType = 'avif';
        const B64_URL = `data:${mimeType};base64,${AVIF_BASE_64_IMG_ENC}`;
        const image = new Image();

        image.addEventListener('load', () => {
          resolve({ mimeType, imgType, supported: image.naturalWidth > 0, timestamp: createTimestamp() });
        }, { once: true });

        image.addEventListener('error', () => {
          resolve({ mimeType, imgType, supported: false, timestamp: createTimestamp() });
        }, { once: true });

        image.src = B64_URL;
      });
      return cacheRes;
    }
  }
}

/* exports */
export type { TSupportsAVIFReturn };
export { supportsAVIF };
