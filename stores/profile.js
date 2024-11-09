import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const api = useApi()
  const loading = ref(false)
  const user = ref({})

  const getProfile = async () => {
    try {
      const response = await api.get('/profile')
      user.value = response.data
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (form) => {
    loading.value = true
    try {
      const response = await api.put(`/profile`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const profileChangePassword = async (form) => {
    loading.value = true
    try {
      const response = await api.patch(`/profile/changePassword`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const userInitials = computed(() => getInitials(user.value.firstName, user.value.lastName))

  return {
    user,
    loading,
    getProfile,
    updateProfile,
    profileChangePassword,
    userInitials,
  }
})
