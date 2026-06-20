/* imports */
import { jest } from '@jest/globals';
import type { TSupportsGIFReturn } from '../index.js';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* mocks */
const mockBrowserEnv = { name: 'Mock Browser', version: '1.0.0' };
const mockGetBrowserEnv = jest.fn(() => mockBrowserEnv);

/* suite */
describe('Supports GIF', () => {
  const originalWindow = globalThis.window;
  const originalImage = globalThis.Image;

  beforeEach(() => {
    jest.resetModules();
    mockGetBrowserEnv.mockClear();
    mockGetBrowserEnv.mockReturnValue(mockBrowserEnv);
    jest.unstable_mockModule('../../shared/get-browser-env.js', () => ({
      default: mockGetBrowserEnv,
    }));
    globalThis.window = {} as any;
    globalThis.Image = MockImage as any;
  });

  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.Image = originalImage;
  });

  /* 1 */
  test('throws when the window global is not available', async () => {
    const { supportsGIF } = await import('../index.js');

    globalThis.window = undefined as any;
    await expect(supportsGIF()).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    const { supportsGIF } = await import('../index.js');

    globalThis.Image = undefined as any;
    await expect(supportsGIF()).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('resolves "support = true" when GIF is supported', async () => {
    /* setup */
    const { supportsGIF } = await import('../index.js');
    const response: TSupportsGIFReturn = await supportsGIF();

    /* assert */
    expect(response.supported).toBe(true);
    expect(response.mimeType).toBe('image/gif');
    expect(response.imgType).toBe('gif');
    expect(response.timestamp).toEqual({
      ms: expect.any(Number),
      str: expect.any(String),
    });
    expect(response.browserEnv).toEqual(mockBrowserEnv);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(1);
  });

  /* 4 */
  test('resolves "support = false" when GIF is not supported', async () => {
    /* setup */
    const { supportsGIF } = await import('../index.js');

    globalThis.Image = MockBrokenImage as any;
    const response: TSupportsGIFReturn = await supportsGIF();

    /* assert */
    expect(response.supported).toBe(false);
    expect(response.mimeType).toBe('image/gif');
    expect(response.imgType).toBe('gif');
    expect(response.timestamp).toEqual({
      ms: expect.any(Number),
      str: expect.any(String),
    });
    expect(response.browserEnv).toEqual(mockBrowserEnv);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(1);
  });
});
