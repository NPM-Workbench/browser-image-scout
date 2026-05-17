/* imports */
import { supportsAVIF } from '../index.js';
import type { TSupportsAVIFReturn } from '../index.js';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* suite */
describe('Supports AVIF', () => {
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
    await expect(supportsAVIF()).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    globalThis.Image = undefined as any;
    await expect(supportsAVIF()).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('resolves "support = true" when AVIF is supported', async () => {
    /* setup */
    const response: TSupportsAVIFReturn = await supportsAVIF();

    /* assert */
    expect(response.supported).toBe(true);
    expect(response.mimeType).toBe('image/avif');
    expect(response.imgType).toBe('avif');
  });

  /* 4 */
  test('resolves "support = false" when AVIF is not supported', async () => {
    /* setup */
    globalThis.Image = MockBrokenImage as any;
    const response: TSupportsAVIFReturn = await supportsAVIF();

    /* assert */
    expect(response.supported).toBe(false);
    expect(response.mimeType).toBe('image/avif');
    expect(response.imgType).toBe('avif');
  });
});
