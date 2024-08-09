export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'ar', 'so'],
  langDirection: {
    en: 'ltr',
    fr: 'ltr',
    ar: 'rtl',
    so: 'ltr'
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
