<template>
  <div class="lg:col-span-4 lg:sticky top-40 h-max bg-gray-1 p-4 shadow-section rounded-xl">
    <UIButton @click="clearCookies" :text="translations['main.submit-article']" wrapper-class="w-full !bg-secondary rounded-none" />
    <nav class="mt-6">
      <h3 class="bg-secondary py-2 text-white px-4">
        {{ translations['main.about'] }}
      </h3>
      <NuxtLink v-for="link in menuLinks" :key="link.path" :to="localePath(`/journal/${route.params.journalSlug}${link.path}`)" class="py-3 px-4 block border-b hover:text-primary [&.router-link-exact-active]:text-primary">
        {{ link.title }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCommonStore } from '@/stores/common.js'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const commonStore = useCommonStore()
const { translations } = storeToRefs(commonStore)

// Cookie setup
const cookieId = useCookie('id')
const cookieStep = useCookie('step')

// Make menu links reactive to translations
const menuLinks = computed(() => [
  {
    path: '/about',
    title: translations.value['main.about'],
  },
  {
    path: '/editorialTeam',
    title: translations.value['main.edit-team'],
  },
  {
    path: '/privacy',
    title: translations.value['main.privacy-statement'],
  },
  {
    path: '/contact',
    title: translations.value['main.contacts'],
  },
])

const clearCookies = () => {
  router.push(localePath(`/send-articles/${route.params.journalSlug}`))
  cookieStep.value = 1
  cookieId.value = null
}
</script>
