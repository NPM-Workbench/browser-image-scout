/* imports */
import { supportsAVIF } from '../supports-avif/index.js';
import { supportsGIF } from '../supports-gif/index.js';
import { supportsJPEG } from '../supports-jpeg/index.js';
import { supportsPNG } from '../supports-png/index.js';
import { supportsSVG } from '../supports-svg/index.js';
import { supportsWEBP } from '../supports-webp/index.js';
import type { TMimeType, TImageType } from '../types/index.js';

/* types */
type TInput = TImageType | TImageType[];
type TIsImageFormatSupportedReturn = {
  mimeType: TMimeType;
  imgType: TImageType;
  supported: boolean;
};
type TSupportRef = () => Promise<TIsImageFormatSupportedReturn>;

/* module */
async function isImageFormatSupported(
  props: TInput,
): Promise<TIsImageFormatSupportedReturn[]> {
  if (typeof window === 'undefined') {
    throw new Error('[Global Not Found]: Window Object');
  } else if (typeof Image === 'undefined') {
    throw new Error('[Global Not Found]: Image Constructor');
  } else {
    /* ref */
    const supportRef: Record<TImageType, TSupportRef> = {
      avif: supportsAVIF,
      gif: supportsGIF,
      jpeg: supportsJPEG,
      png: supportsPNG,
      svg: supportsSVG,
      webp: supportsWEBP,
    };

    if (typeof props === 'string') {
      return Promise.all([supportRef[props]()]);
    } else {
      /* iterate */
      const supportChecks = props.map((key) => {
        return supportRef[key]();
      });

      /* place in promise and end */
      return Promise.all(supportChecks);
    }
  }
}

/* exports */
export type { TIsImageFormatSupportedReturn };
export { isImageFormatSupported };
