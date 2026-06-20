/* imports */
import { jest } from '@jest/globals';
import type { TGetAllImageFormatSupportReturn } from '../index.js';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* mocks */
const mockBrowserEnv = { name: 'Mock Browser', version: '1.0.0' };
const mockGetBrowserEnv = jest.fn(() => mockBrowserEnv);

/* suite */
describe('Get All Image Format Support', () => {
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
    const { getAllImageFormatSupport } = await import('../index.js');

    globalThis.window = undefined as any;
    await expect(getAllImageFormatSupport()).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    const { getAllImageFormatSupport } = await import('../index.js');

    globalThis.Image = undefined as any;
    await expect(getAllImageFormatSupport()).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('resolves all formats as supported', async () => {
    const { getAllImageFormatSupport } = await import('../index.js');
    const result: TGetAllImageFormatSupportReturn =
      await getAllImageFormatSupport();

    expect(result).toHaveLength(7);
    expect(result).toEqual([
      expect.objectContaining({
        mimeType: 'image/avif',
        imgType: 'avif',
        supported: true,
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/gif',
        imgType: 'gif',
        supported: true,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/jpeg',
        imgType: 'jpeg',
        supported: true,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/jxl',
        imgType: 'jxl',
        supported: true,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/png',
        imgType: 'png',
        supported: true,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/svg+xml',
        imgType: 'svg',
        supported: true,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/webp',
        imgType: 'webp',
        supported: true,
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
    ]);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(7);
  });

  /* 4 */
  test('resolves all formats as unsupported', async () => {
    const { getAllImageFormatSupport } = await import('../index.js');

    globalThis.Image = MockBrokenImage as any;
    const result: TGetAllImageFormatSupportReturn =
      await getAllImageFormatSupport();

    expect(result).toHaveLength(7);
    expect(result).toEqual([
      expect.objectContaining({
        mimeType: 'image/avif',
        imgType: 'avif',
        supported: false,
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/gif',
        imgType: 'gif',
        supported: false,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/jpeg',
        imgType: 'jpeg',
        supported: false,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/jxl',
        imgType: 'jxl',
        supported: false,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/png',
        imgType: 'png',
        supported: false,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/svg+xml',
        imgType: 'svg',
        supported: false,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
      expect.objectContaining({
        mimeType: 'image/webp',
        imgType: 'webp',
        supported: false,
        browserEnv: mockBrowserEnv,
        timestamp: {
          ms: expect.any(Number),
          str: expect.any(String),
        },
      }),
    ]);
    expect(mockGetBrowserEnv).toHaveBeenCalledTimes(7);
  });
});
