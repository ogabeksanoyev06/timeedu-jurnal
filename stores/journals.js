import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useJournalStore = defineStore('journals', () => {
  const api = useApi()
  const loading = ref(false)
  const journals = ref([])
  const journalAbout = ref({})

  const keywords = ref([])
  const articlesView = ref({})

  const handleApiRequest = async (method, url, params = {}) => {
    try {
      const response = await api[method](url, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getJournals = async () => {
    const response = await api.get(`/journals`)
    journals.value = response.data
    return response.data
  }

  const getJournalInner = async (slug) => {
    const response = await api.get(`/journals/${slug}`)
    return response.data
  }

  const getArticles = async ({ params }) => {
    return await handleApiRequest('get', '/articles/view/', params)
  }

  const getArticleInner = async (id) => {
    return await handleApiRequest('get', `/articles/view/${id}`)
  }

  const getJournalAbout = async (slug) => {
    journalAbout.value = await handleApiRequest('get', `/journals/${slug}/about`)
    return journalAbout.value
  }

  const getArchive = async (slug) => {
    return await handleApiRequest('get', `/journals/${slug}/issues`)
  }

  const getCurrentIssue = async (slug) => {
    return await handleApiRequest('get', `/journals/${slug}/currentIssue`)
  }

  // create articles

  const getMyArticles = async (slug) => {
    const response = await api.post(`/articles/create/${slug}/mySubmissions`)
    return response.data
  }

  const getArticlesView = async (id, step) => {
    const response = await api.get(`/articles/create/${id}/state/${step}`)
    articlesView.value = response.data
    return response.data
  }

  const createArticles = async (slug, form) => {
    loading.value = true
    try {
      const response = await api.post(`/articles/create/${slug}/create`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const createArticlesSaveState = async (id, state, data) => {
    loading.value = true
    try {
      const response = await api.patch(`/articles/create/${id}/saveState${state}`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // collaborator

  const createCollaborator = async (data) => {
    loading.value = true
    try {
      const response = await api.post(`/collaborator`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const updateCollaborator = async (id, form) => {
    loading.value = true
    try {
      const response = await api.put(`/collaborator/${id}`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const deleteCollaborator = async (id) => {
    loading.value = true
    try {
      const response = await api.delete(`/collaborator/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const collaboratorId = async (id) => {
    loading.value = true
    try {
      const response = await api.get(`/collaborator/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // keywords

  const getKeywords = () => {
    const response = api.get(`/keywords`)
    keywords.value = response.data?.content
    return response.data
  }

  const countDownload = (id) => {
    try {
      const response = api.patch(`/articles/view/${id}/countDownload`)
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

    getMyArticles,
    getArticlesView,
    createArticles,
    createArticlesSaveState,

    createCollaborator,
    updateCollaborator,
    deleteCollaborator,
    collaboratorId,

    getKeywords,

    keywords,
    articlesView,

    loading,

    countDownload,
  }
})
