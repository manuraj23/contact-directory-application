import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,              // allow describe/it/beforeEach without imports
    environment: 'jsdom',       // for Angular component testing
    coverage: {
      provider: 'v8',           // or 'istanbul'
      reporter: ['text', 'html'], 
      reportsDirectory: 'coverage'
    }
  }
});
