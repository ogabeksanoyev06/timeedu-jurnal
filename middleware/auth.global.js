export default defineNuxtRouteMiddleware((to, from) => {
  const localePath = useLocalePath()
  const accessTokenCookie = useCookie('access_token')

  const publicPaths = [localePath('/auth/login'), localePath('/auth/register')]

  if (!accessTokenCookie.value && !publicPaths.includes(to.path)) {
    return navigateTo(localePath('/auth/login'))
  }

  if (accessTokenCookie.value && publicPaths.includes(to.path)) {
    return navigateTo('/')
  }
})
