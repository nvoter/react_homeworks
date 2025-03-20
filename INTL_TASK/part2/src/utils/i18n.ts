import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'ru',
    interpolation: {
        escapeValue: false
    },
    resources: {
        ru: {
            translation: {
                unreadMessages_one: 'У вас 1 непрочитанное сообщение',
                unreadMessages_few: 'У вас {{count}} непрочитанных сообщения',
                unreadMessages_many: 'У вас {{count}} непрочитанных сообщений'
            }
        }
    }
})

export default i18n;