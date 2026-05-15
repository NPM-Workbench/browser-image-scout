/* imports */
import { supportsAVIF } from "../supports-avif/index.js";
import { supportsGIF } from "../supports-gif/index.js";
import { supportsJPEG } from "../supports-jpeg/index.js";
import { supportsPNG } from "../supports-png/index.js";
import { supportsSVG } from "../supports-svg/index.js";
import { supportsWEBP } from "../supports-webp/index.js";
import { TMimeType, TImageType } from "../types/index.js";

/* types */
type TGetAllImageFormatSupportReturn = {
  mimeType: TMimeType,
  imgType: TImageType,
  supported: boolean
}[];
type TOutput = TGetAllImageFormatSupportReturn;

/* module */
async function getAllImageFormatSupport(): Promise<TOutput> {
  if (typeof window === 'undefined') {
    throw new Error('[Global Not Found]: Window Object');
  } else if (typeof Image === 'undefined') {
    throw new Error('[Global Not Found]: Image Constructor');
  } else {
    return Promise.all([
      supportsAVIF(),
      supportsGIF(),
      supportsJPEG(),
      supportsPNG(),
      supportsSVG(),
      supportsWEBP()
    ]);
  }
}

/* exports */
export type { TGetAllImageFormatSupportReturn };
export { getAllImageFormatSupport };
