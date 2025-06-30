import { vi } from 'vitest'

// Mock vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
    locale: { value: 'en' },
  }),
  createI18n: vi.fn(),
}))

// Create a simple i18n plugin for testing
const i18nPlugin = {
  install(app) {
    app.config.globalProperties.$t = vi.fn((key) => key)
  },
}

// Make it available for tests
window.i18nPlugin = i18nPlugin
