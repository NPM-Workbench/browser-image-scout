/* imports */
import { SVG_BASE_64_IMG_ENV } from "../shared/index.js";
import type { TMimeType, TImageType } from "../types/index.js";

/* types */
type TSupportsSVGReturn = {
  mimeType: TMimeType,
  imgType: TImageType,
  supported: boolean
};

/* module */
async function supportsSVG(): Promise<TSupportsSVGReturn> {
  if (typeof window === "undefined") {
    throw new Error("[Global Not Found]: Window Object");
  } else  {
    return new Promise((resolve) => {
      /* setup */
      const mimeType = "image/svg+xml";
      const imgType = "svg";
      const B64_URL = `data:${mimeType};base64,${SVG_BASE_64_IMG_ENV}`;
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
export type { TSupportsSVGReturn };
export { supportsSVG };
