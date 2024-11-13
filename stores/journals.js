import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useJournalStore = defineStore('journals', () => {
  const api = useApi()
  const journals = ref([])
  const journalAbout = ref({})

  const getJournals = async () => {
    try {
      const response = await api.get('/journals')
      journals.value = response.data
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

  const getArticles = async ({ params }) => {
    try {
      const response = await api.get(`/articles/view/`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }
  const getArticleInner = async (id) => {
    try {
      const response = await api.get(`/articles/view/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getJournalAbout = async (slug) => {
    try {
      const response = await api.get(`/journals/${slug}/about`)
      journalAbout.value = response.data
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getArchive = async (slug) => {
    try {
      const response = await api.get(`/journals/${slug}/issues`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getCurrentIssue = async (slug) => {
    try {
      const response = await api.get(`/journals/${slug}/currentIssue`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    getJournals,
    getJournalInner,
    getArticles,
    getArticleInner,
    getArchive,
    getJournalAbout,
    getCurrentIssue,
    journals,
    journalAbout,
  }
})
