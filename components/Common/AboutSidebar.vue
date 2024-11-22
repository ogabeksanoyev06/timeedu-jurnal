<template>
  <div class="lg:col-span-4 lg:sticky top-40 h-max bg-gray-1 p-4 shadow-section rounded-xl">
    <UIButton @click="clearCookies" text="Maqolani yuborish" wrapper-class="w-full !bg-secondary rounded-none" />
    <nav class="mt-6">
      <h3 class="bg-secondary py-2 text-white px-4">Biz haqimizda</h3>
      <NuxtLink v-for="link in navLinks" :key="link.path" :to="localePath(`/journal/${route.params.journalSlug}${link.path}`)" class="py-3 px-4 block border-b hover:text-primary [&.router-link-exact-active]:text-primary">
        {{ link.title }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const navLinks = [
  { path: '/about', title: 'Jurnal haqida' },
  { path: '/editorialTeam', title: 'Tahririyat jamoasi' },
  { path: '/privacy', title: 'Maxfiylik bayonoti' },
  { path: '/contact', title: 'Kontaktlar' },
]

const clearCookies = () => {
  router.push(localePath(`/send-articles/${route.params.journalSlug}`))
  cookieStep.value = null
  cookieId.value = null
}
</script>
