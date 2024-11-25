<template>
  <div class="sticky top-0 z-[90]">
    <header class="relative bg-secondary z-[100] w-full py-2 lg:py-4 transition-300">
      <div class="container flex-y-center gap-4">
        <NuxtLink :to="localePath('/')" class="header-left flex flex-col gap-1 max-w-[150px] transition-300">
          <img src="/assets/svg/logo.svg" class="w-full flex-shrink-0" alt="timeedu.uz" />
          <!-- <span v-if="!isHiddenPage" class="text-center text-[12px] text-white">Menejment va iqtisodiyot ilmiy-tadqiqot jurnali</span> -->
        </NuxtLink>
        <div class="lg:hidden flex flex-1 items-center space-x-3 justify-end">
          <LayoutHeaderAuthorization />
          <button class="" @click="showFullMenu = !showFullMenu">
            <svg v-if="!showFullMenu" class="text-white text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" /></svg>
            <svg v-else class="text-white text-2xl" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
            </svg>
          </button>
        </div>
        <div class="header-right flex-1 max-lg:hidden">
          <div class="header-top flex items-center justify-between pb-4 border-b border-accent-1 gap-6">
            <nav class="flex-center flex-wrap gap-2 sm:gap-6 leading-150">
              <a :href="`tel:${translations['header.phone']}`" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
                <span class="icon-phone text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                {{ translations['header.phone'] }}
              </a>
              <hr class="h-[18px] w-px bg-accent-1 max-sm:hidden" />
              <a :href="`mailto:${translations['header.email']}`" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
                <span class="icon-message text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                {{ translations['header.email'] }}
              </a>
              <hr class="h-[18px] w-px bg-accent-1 max-sm:hidden" />
              <a :href="translations['header.telegram-ac']" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
                <span class="icon-telegram text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                {{ translations['header.telegram-ac'] }}
              </a>
            </nav>
            <div class="flex-y-center justify-end gap-6 flex-1">
              <FormInput
                v-model="search"
                v-if="!isHiddenPage"
                @enter="goToLink"
                suffix
                inputClass="!text-gray-3 placeholder:text-white"
                wrapperClass="!bg-[#3E3F7A] !border-accent-1 !max-w-[460px] w-full"
                :placeholder="translations['header.search-text']"
              >
                <template #suffix>
                  <span class="icon-search text-xl leading-5 text-white" @click="goToLink"></span>
                </template>
              </FormInput>
              <LayoutHeaderLanguageSwitcher />
            </div>
          </div>
          <div class="header-bottom pt-4 flex items-center justify-between">
            <nav class="flex-y-center space-x-8 sm:text-base flex-1">
              <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/currentIssue`)" class="transition-300 text-white hover:text-gray-5 [&.router-link-active]:text-gray-5" v-if="!isHiddenPage">{{
                translations['main.current-issue']
              }}</NuxtLink>
              <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/archive`)" class="transition-300 text-white hover:text-gray-5 [&.router-link-active]:text-gray-5" v-if="!isHiddenPage">{{ translations['main.archives'] }}</NuxtLink>
              <LayoutHeaderNavbarDropdown
                v-if="!isHiddenPage"
                :title="translations['main.about']"
                :items="[
                  { title: translations['main.about-journal'], path: localePath(`/journal/${route.params.journalSlug}/about`) },
                  { title: translations['main.edit-team'], path: localePath(`/journal/${route.params.journalSlug}/editorialTeam`) },
                  { title: translations['main.privacy-statement'], path: localePath(`/journal/${route.params.journalSlug}/privacy`) },
                  { title: translations['main.contacts'], path: localePath(`/journal/${route.params.journalSlug}/contact`) },
                ]"
              />
              <LayoutHeaderNavbarDropdown
                v-if="route.path !== localePath('/profile') && route.path !== localePath('/profile/change-password') && route.path !== localePath('/profile/my-articles')"
                :title="translations['main.journals-website']"
                :items="mappedJournals"
              />
              <FormInput
                @enter="goToLink"
                v-model="search"
                v-if="isHiddenPage"
                suffix
                inputClass="!text-gray-3  placeholder:text-white"
                wrapperClass="!bg-[#3E3F7A] !border-accent-1  !max-w-[460px] !w-full"
                :placeholder="translations['header.search-text']"
              >
                <template #suffix>
                  <span class="icon-search text-xl leading-5 text-white" @click="goToLink"></span>
                </template>
              </FormInput>
            </nav>
            <LayoutHeaderAuthorization />
          </div>
        </div>
      </div>
      <Teleport to="body">
        <div class="mobile lg:hidden fixed bottom-0 w-full h-[calc(100vh_-_64px)] overflow-y-auto bg-white z-50 transition-all duration-300 px-4 py-8 flex flex-col gap-2" :class="showFullMenu ? 'opacity-100 right-0 ' : 'opacity-0 right-full'">
          <div class="relative mb-4 grid gap-2">
            <div class="sticky bg-white top-0 z-20">
              <span class="flex h-9 items-center">
                <h3 class="px-2 text-lg font-medium text-ellipsis overflow-hidden break-all pt-3 pb-2">Qidiruv</h3>
              </span>
            </div>
            <FormInput @focus="router.push(localePath('/articles'))" v-model="search" suffix inputClass="!text-gray-3  placeholder:text-white" wrapperClass="!bg-[#3E3F7A] !border-accent-1  !w-full" :placeholder="translations['header.search-text']">
              <template #suffix>
                <span class="icon-search text-xl leading-5 text-white"></span>
              </template>
            </FormInput>
          </div>
          <div class="relative mb-4 grid gap-2">
            <div class="sticky bg-white top-0 z-20">
              <span class="flex h-9 items-center">
                <h3 class="px-2 text-lg font-medium text-ellipsis overflow-hidden break-all pt-3 pb-2">Menular</h3>
              </span>
            </div>
            <ul class="px-2">
              <li class="mb-2" v-if="!isHiddenPage">
                <h4 class="text-sm mb-1 font-medium">{{ translations['main.about'] }}</h4>
                <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/about`)" class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600" to="/">
                  {{ translations['main.about-journal'] }}
                </NuxtLink>
                <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/editorialTeam`)" class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600" to="/">
                  {{ translations['main.edit-team'] }}
                </NuxtLink>
                <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/privacy`)" class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600" to="/">
                  {{ translations['main.privacy-statement'] }}
                </NuxtLink>
                <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/contact`)" class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600" to="/"> {{ translations['main.contacts'] }} </NuxtLink>
              </li>
              <li class="mb-2">
                <h4 class="text-sm mb-1 font-medium">{{ translations['main.journals-website'] }}</h4>
                <NuxtLink class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600" v-for="(item, i) in mappedJournals" :to="item.path" :key="i">
                  {{ item.title }}
                </NuxtLink>
              </li>
              <li v-if="!isHiddenPage">
                <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/archive`)" class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600">{{ translations['main.archives'] }}</NuxtLink>
              </li>
              <li v-if="!isHiddenPage">
                <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/currentIssue`)" class="group flex items-center rounded-md border border-transparent py-1 hover:underline text-gray-600">{{
                  translations['main.current-issue']
                }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="relative mb-4 grid gap-2">
            <div class="sticky bg-white top-0 z-20">
              <span class="flex h-9 items-center">
                <h3 class="px-2 text-lg font-medium text-ellipsis overflow-hidden break-all pt-3 pb-2">Aloqa</h3>
              </span>
            </div>
            <nav class="grid gap-2">
              <a :href="`tel:${translations['header.phone']}`" target="_blank" class="flex-y-center gap-2 transition-300 hover:text-gray-5 group">
                <span class="icon-phone text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                {{ translations['header.phone'] }}
              </a>
              <a :href="`mailto:${translations['header.email']}`" target="_blank" class="flex-y-center gap-2 transition-300 hover:text-gray-5 group">
                <span class="icon-message text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                {{ translations['header.email'] }}
              </a>
              <a :href="translations['header.telegram-ac']" target="_blank" class="flex-y-center gap-2 transition-300 hover:text-gray-5 group">
                <span class="icon-telegram text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                {{ translations['header.telegram-ac'] }}
              </a>
            </nav>
          </div>
          <div class="relative mb-4 grid gap-2">
            <div class="sticky bg-white top-0 z-20">
              <span class="flex h-9 items-center">
                <h3 class="px-2 text-lg font-medium text-ellipsis overflow-hidden break-all pt-3 pb-2">Til</h3>
              </span>
            </div>
            <div class="grid items-start gap-1">
              <button @click="onChangeLocale('uz')" :class="{ '!border-primary': currentLanguage.code === 'uz' }" class="flex justify-between items-center border rounded-lg border-gray-200 hover:border-primary transition-300 p-2">
                O'zbekcha
                <span class="w-3 h-3 bg-gray-200 rounded-full" :class="{ '!bg-primary': currentLanguage.code === 'uz' }"></span>
              </button>
              <button @click="onChangeLocale('ru')" :class="{ '!border-primary': currentLanguage.code === 'ru' }" class="flex justify-between items-center border rounded-lg border-gray-200 hover:border-primary transition-300 p-2">
                Русский
                <span :class="{ '!bg-primary': currentLanguage.code === 'ru' }" class="w-3 h-3 bg-gray-200 rounded-full"></span>
              </button>
              <button @click="onChangeLocale('en')" :class="{ '!border-primary': currentLanguage.code === 'en' }" class="flex justify-between items-center border rounded-lg border-gray-200 hover:border-primary transition-300 p-2">
                English
                <span :class="{ '!bg-primary': currentLanguage.code === 'en' }" class="w-3 h-3 bg-gray-200 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </header>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'
import { useRouter, useRoute } from 'vue-router'
import { useLanguageSwitcher } from '@/composables/useLanguageSwitcher'

const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { journals } = storeToRefs(journalStore)
const { translations } = storeToRefs(commonStore)

const { currentLanguage, changeLocale } = useLanguageSwitcher()

function onChangeLocale(code) {
  if (currentLanguage.value?.code !== code) {
    showFullMenu.value = false
    changeLocale(code)
  }
}

const search = ref(route.query.search)

const showFullMenu = ref(false)

const mappedJournals = computed(
  () =>
    journals.value?.content?.map((journal) => ({
      title: journal.name,
      path: localePath(`/journal/${journal.slug}`),
    })) || [],
)

const isHiddenPage = computed(() => {
  const path = router.currentRoute.value.path
  return path === localePath('/profile') || path === localePath('/profile/change-password') || path === localePath('/profile/my-articles') || path === localePath('/')
})

const goToLink = () => {
  router.push({
    path: localePath('/articles'),
    query: { search: search.value },
  })
}

watch(search, async (newSearch) => {
  router.push({ query: { ...route.query, search: newSearch } })
})

watch(
  () => route.query.search,
  async (newSearch) => {
    search.value = newSearch || ''
  },
)

watch(route, () => {
  showFullMenu.value = false
})
</script>

<style scoped>
.mobile .router-link-active {
  color: blue;
}
</style>
