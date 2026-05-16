/* imports */
import { JPEGXL_BASE_64_IMG_ENC } from '../shared/index.js';
import type { TMimeType, TImageType } from '../types/index.js';

/* types */
type TSupportsJPEGXLReturn = {
  mimeType: TMimeType;
  imgType: TImageType;
  supported: boolean;
};

/* module */
async function supportsJPEGXL(): Promise<TSupportsJPEGXLReturn> {
  if (typeof window === 'undefined') {
    throw new Error('[Global Not Found]: Window Object');
  } else if (typeof Image === 'undefined') {
    throw new Error('[Global Not Found]: Image Constructor');
  } else {
    return new Promise((resolve) => {
      /* setup */
      const mimeType = 'image/jxl';
      const imgType = 'jxl';
      const B64_URL = `data:${mimeType};base64,${JPEGXL_BASE_64_IMG_ENC}`;
      const image = new Image();

      image.addEventListener('load', () => {
        resolve({ mimeType, imgType, supported: image.naturalWidth > 0 });
      }, { once: true });

      image.addEventListener('error', () => {
        resolve({ mimeType, imgType, supported: false });
      }, { once: true });

      image.src = B64_URL;
    });
  }
}

/* exports */
export type { TSupportsJPEGXLReturn };
export { supportsJPEGXL };
