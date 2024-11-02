// import { defineStore, getActivePinia } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
  const { locale, setLocale } = useI18n()

  const cookieLocale = useCookie('i18n_redirected')

  const languagesList = [
    {
      name: "O'zbekcha",
      code: 'uz',
      flag: '/images/svg/flags/uz.svg',
    },
    {
      name: 'English',
      code: 'en',
      flag: '/images/svg/flags/en.svg',
    },
    {
      name: 'Русский',
      code: 'ru',
      flag: '/images/svg/flags/ru.svg',
    },
  ]

  const currentLanguage = computed(() => languagesList.find((lang) => lang.code === locale.value))

  // function resetAllStores() {
  //   const activepinia = getActivePinia()
  //   if (activepinia) {
  //     Object.entries(activepinia.state.value).forEach(([storeName, state]) => {
  //       const storeDefinition = defineStore(storeName, state)
  //       const store = storeDefinition(activepinia)

  //       if (store.$id !== 'search-store' && store.$id !== 'authStore') {
  //         store.$reset()
  //       }
  //     })
  //   }
  // }

  async function changeLocale(value) {
    locale.value = value
    setLocale(value)
  }

  return { currentLanguage, languagesList, changeLocale }
}
