import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useCountriesStore = defineStore('countries', () => {
  const api = useApi()
  const countries = ref([])

  const getCountries = async () => {
    try {
      const response = await api.get('/countries')
      countries.value = response.data
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getCountries,
    countries,
  }
})
