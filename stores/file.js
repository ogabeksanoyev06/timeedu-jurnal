import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useFileStore = defineStore('file', () => {
  const api = useApi()
  const loading = ref(false)

  const uploadFile = async (form) => {
    loading.value = true
    try {
      const response = await api.post('/files/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const deletFile = async (form) => {
    try {
      const response = await api.post('/files/delete', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  return { uploadFile, deletFile, loading }
})
