export default defineNuxtRouteMiddleware((to, from) => {
  const localePath = useLocalePath()
  const accessTokenCookie = useCookie('access_token')

  const publicPaths = [localePath('/auth/login'), localePath('/auth/register')]

  const exceptionPaths = [localePath('/auth/reset-password/'), localePath('/confirmEmail/')]

  const isException = exceptionPaths.some((path) => to.path.startsWith(path))

  if (!accessTokenCookie.value && !publicPaths.includes(to.path) && !isException) {
    return navigateTo(localePath('/auth/login'))
  }

  if (accessTokenCookie.value && publicPaths.includes(to.path)) {
    return navigateTo('/')
  }
})
