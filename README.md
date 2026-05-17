![Banner](https://github.com/user-attachments/assets/80f2fbf0-2604-4e10-a455-af87bad7c419)
# browser-image-scout
A typescript-first package that helps detect whether a browser or (any suitable runtime environment) can support image formats. It works by creating a tiny image from `base64` data URLs, observe the `Image` contructor's `load`/`error` and `naturalWidh` to determine the support. Each format helper function is expected to return a promise that resolves to an object containing the support information.

🎓 **In simple words:** this package asks the browser (or a mocked test environment) to try loading tiny example images for each format and reports back whether those images actually decoded — giving you a reliable yes/no for whether that image format is supported.

### 📦 Installation
```console
npm install --save browser-image-scout
```
💡 Note: Meant to work mostly as a client-side/browser package.

### 📘 Features
1. TypeScript-First: Provides full type definitions
2. Lightweight: No runtime dependencies; uses tiny base64-encoded sample images embedded in the package
3. Accurate detection: Uses in-memory data-URL images and Image load/error events plus `image.naturalWidth > 0` to determine true decoder support.
4. Formats supported: `avif`, `webp`, `jpeg`, `png`, `gif`, `svg`, `jxl`.
5. Package comprises of both direct Helper and Convenience functions
6. No network required: Detection runs entirely in-memory (no external requests)
7. Easy to Understand: API features are easy to understand, which can be integrated into your client side application code

### 📚 Contributions
1. New Ideas/Contributions: Open Discussion(s) - https://github.com/NPM-Workbench/browser-image-scout/discussions
2. Issues and Debugging: Open Issue(s) - https://github.com/NPM-Workbench/browser-image-scout/issues

### 🔒 Security & Privacy
1. This package is open source and designed for client-side work. It does not collect, store, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection systems.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the Security Policy.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
