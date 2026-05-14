/* imports */
import { BASE_64_IMG_ENC } from "../shared/index.js";
import type { TMimeType, TImageType } from "../types/index.js";

/* types */
type TSupportsJPEGReturn = {
  mimeType: TMimeType,
  imgType: TImageType,
  supported: boolean
};

/* module */
async function supportsJPEG(): Promise<TSupportsJPEGReturn> {
  if (typeof window === "undefined") {
    throw new Error("[Global Not Found]: Window Object");
  } else  {
    return new Promise((resolve) => {
      /* setup */
      const mimeType = "image/jpeg";
      const B64_URL = `data:${mimeType};base64,${BASE_64_IMG_ENC}`;
      const image = new Image();
      image.src = B64_URL;

      /* resolve */
      image.addEventListener("load", () => {
        resolve({mimeType: "image/jpeg", imgType: "jpeg", supported: (image.width > 0)});
      });

      /* reject */
      image.addEventListener("error", () => {
        resolve({mimeType: "image/jpeg", imgType: "jpeg", supported: false});
      });
    });
  }
}

/* exports */
export type { TSupportsJPEGReturn };
export { supportsJPEG };
