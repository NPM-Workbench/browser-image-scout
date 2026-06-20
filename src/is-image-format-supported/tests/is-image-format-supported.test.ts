/* imports */
import { jest } from '@jest/globals';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* mocks */
const mockBrowserEnv = { name: 'Mock Browser', version: '1.0.0' };
const mockGetBrowserEnv = jest.fn(() => mockBrowserEnv);

/* suite */
describe('Is Image Format Supported', () => {
  /* setup */
  const originalWindow = globalThis.window;
  const originalImage = globalThis.Image;

  /* before-each: life cycle */
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

  /* after-each: life cycle */
  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.Image = originalImage;
  });

  /* 1 */
  test('throws when the window global is not available', async () => {
    const { isImageFormatSupported } = await import('../index.js');

    globalThis.window = undefined as any;
    await expect(isImageFormatSupported('avif')).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    const { isImageFormatSupported } = await import('../index.js');

    globalThis.Image = undefined as any;
    await expect(isImageFormatSupported('avif')).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('returns "support = true": single format argument', async () => {
    /* setup */
    const { isImageFormatSupported } = await import('../index.js');
    const response = await isImageFormatSupported('avif');

    /* assert */
    expect(response.length).toBe(1);
    expect(response[0].supported).toBe(true);
    expect(response[0].mimeType).toBe('image/avif');
    expect(response[0].imgType).toBe('avif');
    expect(response[0].browserEnv).toEqual(mockBrowserEnv);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(1);
    expect(response[0].timestamp).toEqual({
      ms: expect.any(Number),
      str: expect.any(String),
    });
  });

  /* 4 */
  test('returns "support = false": single format argument', async () => {
    /* setup */
    const { isImageFormatSupported } = await import('../index.js');

    globalThis.Image = MockBrokenImage as any;
    const response = await isImageFormatSupported('gif');

    /* assert */
    expect(response.length).toBe(1);
    expect(response[0].supported).toBe(false);
    expect(response[0].mimeType).toBe('image/gif');
    expect(response[0].imgType).toBe('gif');
    expect(response[0].browserEnv).toEqual(mockBrowserEnv);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(1);
    expect(response[0].timestamp).toEqual({
      ms: expect.any(Number),
      str: expect.any(String),
    });
  });

  /* 5 */
  test('returns "support = true": multiple format arguments', async () => {
    /* setup */
    const { isImageFormatSupported } = await import('../index.js');
    const response = await isImageFormatSupported(['avif', 'gif']);

    /* assert */
    expect(response.length).toBe(2);
    expect(response).toEqual([
      expect.objectContaining({
        supported: true,
        mimeType: 'image/avif',
        imgType: 'avif',
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        supported: true,
        mimeType: 'image/gif',
        imgType: 'gif',
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
    ]);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(2);
  });

  /* 6 */
  test('returns "support = false": multiple format arguments', async () => {
    /* setup */
    const { isImageFormatSupported } = await import('../index.js');

    globalThis.Image = MockBrokenImage as any;
    const response = await isImageFormatSupported(['avif', 'gif']);

    /* assert */
    expect(response.length).toBe(2);
    expect(response).toEqual([
      expect.objectContaining({
        supported: false,
        mimeType: 'image/avif',
        imgType: 'avif',
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        supported: false,
        mimeType: 'image/gif',
        imgType: 'gif',
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
    ]);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(2);
  });
});
