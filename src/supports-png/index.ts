/* imports */
import { BASE_64_IMG_ENC } from "../shared/index.js";
import type { TMimeType, TImageType } from "../types/index.js";

/* types */
type TSupportsPNGReturn = {
  mimeType: TMimeType,
  imgType: TImageType,
  supported: boolean
};

/* module */
async function supportsPNG(): Promise<TSupportsPNGReturn> {
  if (typeof window === "undefined") {
    throw new Error("[Global Not Found]: Window Object");
  } else  {
    return new Promise((resolve) => {
      /* setup */
      const mimeType = "image/png";
      const imgType = "png"
      const B64_URL = `data:${mimeType};base64,${BASE_64_IMG_ENC}`;
      const image = new Image();
      image.src = B64_URL;

      /* resolve */
      image.addEventListener("load", () => {
        resolve({mimeType, imgType, supported: (image.width > 0)});
      });

      /* reject */
      image.addEventListener("error", () => {
        resolve({mimeType, imgType, supported: false});
      });
    });
  }
}

/* exports */
export type { TSupportsPNGReturn };
export { supportsPNG };
