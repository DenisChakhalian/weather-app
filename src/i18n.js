import { createI18n } from 'vue-i18n';
import en from '../public/locales/en.json';
import ua from '../public/locales/ua.json';

export const i18n = createI18n({
  fallbackLocale: 'en',
  messages: { en, ua }
});
