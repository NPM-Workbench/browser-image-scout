export type TImageType = 'jpeg' | 'png' | 'gif' | 'svg' | 'webp' | 'avif' | 'jxl';
export type TMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/svg+xml'
  | 'image/webp'
  | 'image/avif'
  | 'image/jxl';
export type TTimestamp = {ms: number, str: string};
export type TBrowserEnv = {name: string, version: string | number | null};
export type TSupportState = {
  mimeType: TMimeType,
  imgType: TImageType,
  supported: boolean,
  timestamp: TTimestamp,
  browserEnv: TBrowserEnv
};
