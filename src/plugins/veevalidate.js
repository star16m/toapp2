import Vue from 'vue'
import VeeValidate from 'vee-validate'
import en from 'vee-validate/dist/locale/en'
import es from 'vee-validate/dist/locale/es'
import ko from 'vee-validate/dist/locale/ko'

const veeValidateConfig = {
  locale: JSON.parse(localStorage.getItem('locale')) || 'en',
  dictionary: {
    en,
    es,
    ko
  }
}

Vue.use(VeeValidate, veeValidateConfig)
