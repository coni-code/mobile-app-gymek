import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStoragePlugin from 'i18next-react-native-async-storage';

import en from './locale/en.json';
import pl from './locale/pl.json';

const resources = {
    en: { translation: en },
    pl: { translation: pl },
};

const AsyncStorage = AsyncStoragePlugin();

i18n
    .use(AsyncStorage)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'pl',
        fallbackLng: 'pl',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
