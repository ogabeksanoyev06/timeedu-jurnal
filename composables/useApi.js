import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const { logout, refreshAccessToken } = authStore

  const accessTokenCookie = useCookie('access_token')
  const refreshTokenCookie = useCookie('refresh_token')

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
  })

  const isRefreshing = ref(false)
  const subscribers = []

  const onAccessTokenFetched = (newToken) => {
    subscribers.forEach((callback) => callback(newToken))
    subscribers.length = 0
  }

  const addSubscriber = (callback) => {
    subscribers.push(callback)
    console.log(callback)
  }

  api.interceptors.request.use(
    (reqConfig) => {
      const token = accessTokenCookie.value
      if (token) {
        reqConfig.headers['Authorization'] = `Bearer ${token}`
      }
      return reqConfig
    },
    (error) => Promise.reject(error),
  )

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      if (error.response && error.response.status === 401 && accessTokenCookie.value && !originalRequest._retry) {
        if (!isRefreshing.value) {
          isRefreshing.value = true
          try {
            const response = await refreshAccessToken()
            accessTokenCookie.value = response.accessToken
            refreshTokenCookie.value = response.refreshToken
            isRefreshing.value = false
            onAccessTokenFetched(response.accessToken)
          } catch (refreshError) {
            isRefreshing.value = false
            logout()
            return Promise.reject(refreshError)
          }
        }

        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            originalRequest._retry = true
            console.log(originalRequest)
            resolve(api(originalRequest))
          })
        })
      }

      return Promise.reject(error)
    },
  )

  return api
}
