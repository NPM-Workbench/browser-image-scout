/* imports */
import { PNG_BASE_64_IMG_ENC } from '../shared/index.js';
import type { TSupportState } from '../types/index.js';
import createTimestamp from '../shared/get-timestamp.js';
import getBrowserEnv from '../shared/get-browser-env.js';

/* types */
type TSupportsPNGReturn = TSupportState;

/* cache res */
let cacheRes: Promise<TSupportsPNGReturn> | null = null;

/* module */
async function supportsPNG(): Promise<TSupportsPNGReturn> {
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
        const mimeType = 'image/png';
        const imgType = 'png';
        const B64_URL = `data:${mimeType};base64,${PNG_BASE_64_IMG_ENC}`;
        const image = new Image();
        const browserEnv = getBrowserEnv();

        image.addEventListener('load', () => {
          resolve({ mimeType, imgType, supported: image.naturalWidth > 0, timestamp: createTimestamp(), browserEnv });
        }, { once: true });

        image.addEventListener('error', () => {
          resolve({ mimeType, imgType, supported: false, timestamp: createTimestamp(), browserEnv });
        }, { once: true });

        image.src = B64_URL;
      });
      return cacheRes;
    }
  }
}

/* exports */
export type { TSupportsPNGReturn };
export { supportsPNG };
