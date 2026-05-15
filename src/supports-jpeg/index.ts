/* imports */
import { JPEG_BASE_64_IMG_ENC } from "../shared/index.js";
import type { TMimeType, TImageType } from "../types/index.js";

/* types */
type TSupportsJPEGReturn = {
  mimeType: TMimeType;
  imgType: TImageType;
  supported: boolean;
};

/* module */
async function supportsJPEG(): Promise<TSupportsJPEGReturn> {
  if (typeof window === "undefined") {
    throw new Error("[Global Not Found]: Window Object");
  } else if (typeof Image === "undefined") {
    throw new Error("[Global Not Found]: Image Constructor");
  } else {
    return new Promise((resolve) => {
      /* setup */
      const mimeType = "image/jpeg";
      const imgType = "jpeg";
      const B64_URL = `data:${mimeType};base64,${JPEG_BASE_64_IMG_ENC}`;
      const image = new Image();

      image.addEventListener("load", () => {
          resolve({ mimeType, imgType, supported: image.naturalWidth > 0 });
      }, { once: true });

      image.addEventListener("error", () => {
          resolve({ mimeType, imgType, supported: false });
      }, { once: true });

      image.src = B64_URL;
    });
  }
}

/* exports */
export type { TSupportsJPEGReturn };
export { supportsJPEG };
