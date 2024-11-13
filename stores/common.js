import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useCommonStore = defineStore('languages', () => {
  const api = useApi()
  const languages = ref([])
  const translations = ref({})

  const getLanguages = async () => {
    try {
      const response = await api.get('/languages')
      languages.value = response.data
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getTranslations = async () => {
    try {
      const response = await api.get('/translations')
      translations.value = response.data
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getLanguages,
    getTranslations,
    translations,
    languages,
  }
})
