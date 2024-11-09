<script setup>
import { useProfileStore } from '@/stores/profile.js'
import { useCountriesStore } from '@/stores/countries.js'

const localePath = useLocalePath()

const { y } = useWindowScroll()

const profileStore = useProfileStore()
const countriesStore = useCountriesStore()

const { getProfile } = profileStore
const { getCountries } = countriesStore

const dark = computed(() => y.value > 30)

const { data } = await useAsyncData('layout', async () => {
  const [profile, countries] = await Promise.all([getProfile(), getCountries()])
  return { profile, countries }
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <div class="container relative md:grid md:grid-cols-[260px_minmax(0,1fr)] my-10 md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
      <aside class="top-[154px] z-30 hidden h-[calc(100vh-154px)] w-full shrink-0 sticky md:block">
        <div class="relative overflow-y-auto max-h-[calc(100vh-154px)]">
          <nav class="grid gap-1 p-1 bg-gray-1 text-sm rounded-lg">
            <NuxtLink :to="localePath('/profile')" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-300 hover:text-primary hover:bg-white [&.router-link-active]:bg-white [&.router-link-active]:text-primary"
              >Asosiy ma'lumotlar</NuxtLink
            >
            <NuxtLink
              :to="localePath('/profile/change-password')"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-300 hover:text-primary hover:bg-white [&.router-link-active]:bg-white [&.router-link-active]:text-primary"
              >Parolni o'zgartirish</NuxtLink
            >
            <button class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-300 hover:text-red-500 hover:bg-white">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="rotate-180" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                ></path>
              </svg>
              <span class="ant-dropdown-menu-title-content">Chiqish</span>
            </button>
          </nav>
        </div>
      </aside>
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>
