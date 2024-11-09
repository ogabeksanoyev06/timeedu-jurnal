import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const localePath = useLocalePath()
  const router = useRouter()
  const { showToast } = useCustomToast()

  const loading = ref(false)
  const accessTokenCookie = useCookie('access_token', { maxAge: 3600, secure: true })
  const refreshTokenCookie = useCookie('refresh_token', { maxAge: 7 * 24 * 3600, secure: true })

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

  const refreshAccessToken = async () => {
    try {
      const response = await api.post('/auth/refresh', { refreshToken: refreshTokenCookie.value })
      accessTokenCookie.value = response.data.access_token
      refreshTokenCookie.value = response.data.refresh_token
      return response.data.access_token
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    accessTokenCookie.value = null
    refreshTokenCookie.value = null
    router.push(localePath('/'))
    showToast('Muvaffaqiyatli chiqdingiz!', 'info')
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
    loading,
  }
})
