/* imports */
import { MockImage } from '../../shared/mocks/mock-image.js';
import { MockBrokenImage } from '../../shared/mocks/mock-broken-image.js';
import { isImageFormatSupported } from '../index.js';

/* suite */
describe('Is Image Format Supported', () => {
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
    await expect(isImageFormatSupported('avif')).rejects.toThrow(
      '[Global Not Found]: Window Object',
    );
  });

  /* 2 */
  test('throws when the Image constructor is not available', async () => {
    globalThis.Image = undefined as any;
    await expect(isImageFormatSupported('avif')).rejects.toThrow(
      '[Global Not Found]: Image Constructor',
    );
  });

  /* 3 */
  test('returns "support = true": single format argument', async () => {
    /* setup */
    const response = await isImageFormatSupported('avif');

    /* assert */
    expect(response.length).toBe(1);
    expect(response[0].supported).toBe(true);
    expect(response[0].mimeType).toBe('image/avif');
    expect(response[0].imgType).toBe('avif');
  });

  /* 4 */
  test('returns "support = false": single format argument', async () => {
    /* setup */
    globalThis.Image = MockBrokenImage as any;
    const response = await isImageFormatSupported('gif');

    /* assert */
    expect(response.length).toBe(1);
    expect(response[0].supported).toBe(false);
    expect(response[0].mimeType).toBe('image/gif');
    expect(response[0].imgType).toBe('gif');
  });

  /* 5 */
  test('returns "support = true": multiple format arguments', async () => {
    /* setup */
    const response = await isImageFormatSupported(['avif', 'gif']);

    /* assert */
    expect(response.length).toBe(2);
    expect(response[0].supported).toBe(true);
    expect(response[1].supported).toBe(true);
  });

  /* 6 */
  test('returns "support = false": multiple format arguments', async () => {
    /* setup */
    globalThis.Image = MockBrokenImage as any;
    const response = await isImageFormatSupported(['avif', 'gif']);

    /* assert */
    expect(response.length).toBe(2);
    expect(response[0].supported).toBe(false);
    expect(response[1].supported).toBe(false);
  });
});
