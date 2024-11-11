import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useJournalStore = defineStore('journals', () => {
  const api = useApi()

  const getJournals = async () => {
    try {
      const response = await api.get('/journals')
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getJournalInner = async (slug) => {
    try {
      const response = await api.get(`/journals/${slug}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getArxive = async (slug) => {
    try {
      const response = await api.get(`/journals/${slug}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getJournals,
    getJournalInner,
  }
})
