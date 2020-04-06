import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const loadLocaleMessages = () => {
  const locales = require.context('../locales', true, /[a-z0-9-_]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/^.+\/([a-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const availableLocle = ['en', 'ko']

const getLocale = () => {
  const locale = navigator.language.slice(0, 2)
  return availableLocle.find(l => l === locale) || 'en'
}

export default new VueI18n({
  locale: getLocale(),
  fallbackLocale: 'ko',
  messages: loadLocaleMessages()
})
