/* app imports */
import {
  AVIF_BASE_64_IMG_ENC,
  GIF_BASE_64_IMG_ENC,
  JPEG_BASE_64_IMG_ENC,
  JPEGXL_BASE_64_IMG_ENC,
  PNG_BASE_64_IMG_ENC,
  SVG_BASE_64_IMG_ENC,
  WEBP_BASE_64_IMG_ENC,
} from '../index.js';

/* suite */
describe('Shared', () => {
  function decodeBase64(value: string): Buffer {
    return Buffer.from(value, 'base64');
  }

  /* 1 */
  test('exports a JPEG encoding with the JPEG file signature', () => {
    const bytes = decodeBase64(JPEG_BASE_64_IMG_ENC);
    expect(bytes.subarray(0, 3).toString('hex')).toBe('ffd8ff');
  });

  /* 2 */
  test('exports a PNG encoding with the PNG file signature', () => {
    const bytes = decodeBase64(PNG_BASE_64_IMG_ENC);

    expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
  });

  /* 3 */
  test('exports a GIF encoding with the GIF89a signature', () => {
    const bytes = decodeBase64(GIF_BASE_64_IMG_ENC);
    expect(bytes.subarray(0, 6).toString('ascii')).toBe('GIF89a');
  });

  /* 4 */
  test('exports an SVG encoding with intrinsic dimensions', () => {
    const svg = decodeBase64(SVG_BASE_64_IMG_ENC).toString('utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('width="1"');
    expect(svg).toContain('height="1"');
  });

  /* 5 */
  test('exports a WebP encoding with RIFF and WEBP markers', () => {
    const bytes = decodeBase64(WEBP_BASE_64_IMG_ENC);
    expect(bytes.subarray(0, 4).toString('ascii')).toBe('RIFF');
    expect(bytes.subarray(8, 12).toString('ascii')).toBe('WEBP');
  });

  /* 6 */
  test('exports an AVIF encoding with the AVIF file type brand', () => {
    const bytes = decodeBase64(AVIF_BASE_64_IMG_ENC);
    expect(bytes.subarray(4, 8).toString('ascii')).toBe('ftyp');
    expect(bytes.subarray(8, 12).toString('ascii')).toBe('avif');
  });

  /* 7 */
  test('exports a JPEG XL encoding with the JPEG XL codestream signature', () => {
    const bytes = decodeBase64(JPEGXL_BASE_64_IMG_ENC);
    expect(bytes.subarray(0, 2).toString('hex')).toBe('ff0a');
  });
});
