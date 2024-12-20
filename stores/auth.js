import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common.js'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const localePath = useLocalePath()
  const router = useRouter()
  const { showToast } = useCustomToast()

  const commonStore = useCommonStore()

  const { translations } = storeToRefs(commonStore)

  const loading = ref(false)
  const accessTokenCookie = useCookie('access_token')
  const refreshTokenCookie = useCookie('refresh_token')

  const login = async (data) => {
    loading.value = true
    try {
      const response = await api.post('/auth/login', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const register = async (data) => {
    loading.value = true
    try {
      const response = await api.post('/auth/register', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const confirmEmail = async (slug, form) => {
    loading.value = true
    try {
      const response = await api.post(`/auth/confirmEmail/${slug}`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await api.post('/auth/refresh', { refreshToken: refreshTokenCookie.value })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (form) => {
    loading.value = true
    try {
      const response = await api.post(`/auth/resetPassword`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const changePassword = async (slug, form) => {
    loading.value = true
    try {
      const response = await api.post(`/auth/changePassword/${slug}`, form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    router.push(localePath('/auth/login'))
    showToast(translations.value['alert.logout'], 'info')
  }

  const checkAuth = () => !!accessTokenCookie.value

  return {
    login,
    register,
    logout,
    accessTokenCookie,
    refreshTokenCookie,
    refreshAccessToken,
    checkAuth,
    resetPassword,
    confirmEmail,
    changePassword,
    loading,
  }
})
