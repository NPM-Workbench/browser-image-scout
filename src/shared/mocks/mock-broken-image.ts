class MockBrokenImage {
  naturalWidth = 0;
  private onLoad?: () => void;
  private onError?: () => void;

  addEventListener(type: string, listener: () => void) {
    if (type === 'load') {
      this.onLoad = listener;
    }

    if (type === 'error') {
      this.onError = listener;
    }
  }

  set src(_value: string) {
    this.onError?.();
  }
}

export { MockBrokenImage };
