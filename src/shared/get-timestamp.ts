/* imports */
import { TTimestamp } from "../index.js";

/* types */
type TOutput = TTimestamp;

/* module */
function createTimestamp(): TOutput {
  /* setup */
  const now: Date = new Date();
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /* format */
  const day = dayOfWeek[now.getDay()];
  const date = now.getDate().toString().padStart(2, "0");
  const month = months[now.getMonth()];
  const year = now.getFullYear().toString();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  /* AM or PM */
  const amPm = now.getHours() >= 12 ? "PM": "AM";

  /* end */
  return {
    str: `${day} ${date}-${month}-${year}, ${hours}:${minutes}:${seconds} ${amPm}`,
    ms: now.getTime(),
  };
}

/* exports */
export default createTimestamp;
