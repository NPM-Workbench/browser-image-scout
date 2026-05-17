/* imports */
import { supportsGIF } from '../index.js';
import type { TSupportsGIFReturn } from '../index.js';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* suite */
describe('Supports GIF', () => {
  const originalWindow = globalThis.window;
  const originalImage = globalThis.Image;

  beforeEach(() => {
    globalThis.window = {} as any;
    globalThis.Image = MockImage as any;
  });

  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.Image = originalImage;
  });

  /* 1 */
  test('throws when the window global is not available', async () => {
    globalThis.window = undefined as any;
    await expect(supportsGIF()).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    globalThis.Image = undefined as any;
    await expect(supportsGIF()).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('resolves "support = true" when GIF is supported', async () => {
    /* setup */
    const response: TSupportsGIFReturn = await supportsGIF();

    /* assert */
    expect(response.supported).toBe(true);
    expect(response.mimeType).toBe('image/gif');
    expect(response.imgType).toBe('gif');
  });

  /* 4 */
  test('resolves "support = false" when GIF is not supported', async () => {
    /* setup */
    globalThis.Image = MockBrokenImage as any;
    const response: TSupportsGIFReturn = await supportsGIF();

    /* assert */
    expect(response.supported).toBe(false);
    expect(response.mimeType).toBe('image/gif');
    expect(response.imgType).toBe('gif');
  });
});
