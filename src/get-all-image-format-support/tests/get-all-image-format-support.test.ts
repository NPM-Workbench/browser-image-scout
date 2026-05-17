/* imports */
import { getAllImageFormatSupport } from '../index.js';
import type { TGetAllImageFormatSupportReturn } from '../index.js';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* suite */
describe('Get All Image Format Support', () => {
  /* setup */
  const originalWindow = globalThis.window;
  const originalImage = globalThis.Image;

  /* before-each: life cycle */
  beforeEach(() => {
    globalThis.window = {} as any;
    globalThis.Image = MockImage as any;
  });

  /* after-each: life cycle */
  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.Image = originalImage;
  });

  /* 1 */
  test('throws when the window global is not available', async () => {
    globalThis.window = undefined as any;
    await expect(getAllImageFormatSupport()).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    globalThis.Image = undefined as any;
    await expect(getAllImageFormatSupport()).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('resolves all formats as supported', async () => {
    const result: TGetAllImageFormatSupportReturn =
      await getAllImageFormatSupport();

    expect(result).toHaveLength(7);
    expect(result.every((r) => r.supported === true)).toBe(true);
    expect(result.map((r) => r.imgType)).toEqual([
      'avif',
      'gif',
      'jpeg',
      'jxl',
      'png',
      'svg',
      'webp',
    ]);
  });

  /* 4 */
  test('resolves all formats as unsupported', async () => {
    globalThis.Image = MockBrokenImage as any;
    const result: TGetAllImageFormatSupportReturn =
      await getAllImageFormatSupport();

    expect(result).toHaveLength(7);
    expect(result.every((r) => r.supported === false)).toBe(true);
    expect(result.map((r) => r.imgType)).toEqual([
      'avif',
      'gif',
      'jpeg',
      'jxl',
      'png',
      'svg',
      'webp',
    ]);
  });
});
