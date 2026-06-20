/* imports */
import type { TBrowserEnv } from "../types/index.ts";

/* types */
type TBrowserBrand = {brand: string, version: string, [key: string]: any};
type TNavigatorWithUserAgentData = Navigator & {
  brands: TBrowserBrand[],
  mobile: boolean,
  platform: string,
  [key: string]: any
};
type TOutput = TBrowserEnv;

/* module */
function getBrowserEnv(): TOutput {
  if (typeof navigator === "undefined") {
    throw new Error('[Global Not Found]: Navigator Object');
  } else {
    const agentBrands = (navigator as TNavigatorWithUserAgentData).userAgentData?.brands;
    if (agentBrands?.length) {
      /* filter these unwanted values */
      const unwanted = ["Not/A)Brand", "Chromium"];

      /* find the first */
      const wanted = agentBrands.find((agent:TBrowserBrand) => {
        return !unwanted.includes(agent.brand);
      });

      /* end */
      if (wanted) {
        return {name: wanted.brand, version: wanted.version};
      }
    }

    /* this part is a fallback for browsers that dont support userAgentData */
    const ua = navigator.userAgent;
    if (/Firefox\//.test(ua)) {
      const match = ua.match(/Firefox\/([\d.]+)/);
      return {name: "Firefox", version: match?.[1] ?? null};
    } else if (/Edg\//.test(ua)) {
      const match = ua.match(/Edg\/([\d.]+)/);
      return {name: "Microsoft Edge", version: match?.[1] ?? null};
    } else if (/OPR\//.test(ua)) {
      const match = ua.match(/OPR\/([\d.]+)/);
      return {name: "Opera", version: match?.[1] ?? null};
    } else if (/SamsungBrowser\//.test(ua)) {
      const match = ua.match(/SamsungBrowser\/([\d.]+)/);
      return {name: "Samsung Internet", version: match?.[1] ?? null};
    } else if (/Chrome\//.test(ua)) {
      const match = ua.match(/Chrome\/([\d.]+)/);
      return {name: "Google Chrome", version: match?.[1] ?? null};
    } else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
      const match = ua.match(/Version\/([\d.]+)/);
      return {name: "Safari", version: match?.[1] ?? null};
    } else {
      return {name: "Unknown Browser", version: null};
    }
  }
}

/* exports */
export default getBrowserEnv;
