/* imports */
import { jest } from '@jest/globals';
import type { TSupportsSVGReturn } from '../index.js';
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';

/* suite */
describe('Supports SVG', () => {
  /* setup */
  const originalWindow = globalThis.window;
  const originalImage = globalThis.Image;

  /* before-each: life cycle */
  beforeEach(() => {
    jest.resetModules();
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
    const { supportsSVG } = await import('../index.js');

    globalThis.window = undefined as any;
    await expect(supportsSVG()).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    const { supportsSVG } = await import('../index.js');

    globalThis.Image = undefined as any;
    await expect(supportsSVG()).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('resolves "support = true" when SVG is supported', async () => {
    /* setup */
    const { supportsSVG } = await import('../index.js');
    const response: TSupportsSVGReturn = await supportsSVG();

    /* assert */
    expect(response.supported).toBe(true);
    expect(response.mimeType).toBe('image/svg+xml');
    expect(response.imgType).toBe('svg');
    expect(response.timestamp).toEqual({
      ms: expect.any(Number),
      str: expect.any(String),
    });
  });

  /* 4 */
  test('resolves "support = false" when SVG is not supported', async () => {
    /* setup */
    const { supportsSVG } = await import('../index.js');

    globalThis.Image = MockBrokenImage as any;
    const response: TSupportsSVGReturn = await supportsSVG();

    /* assert */
    expect(response.supported).toBe(false);
    expect(response.mimeType).toBe('image/svg+xml');
    expect(response.imgType).toBe('svg');
    expect(response.timestamp).toEqual({
      ms: expect.any(Number),
      str: expect.any(String),
    });
  });
});
