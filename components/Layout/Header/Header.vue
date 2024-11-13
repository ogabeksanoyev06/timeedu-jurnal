<template>
  <div class="sticky top-0 z-[90]">
    <header class="relative bg-secondary z-[100] w-full py-4 transition-300">
      <div class="container flex-y-center gap-4">
        <NuxtLink :to="localePath('/')" class="header-left flex flex-col gap-1 max-w-[150px]">
          <img src="/assets/svg/logo.svg" class="w-full flex-shrink-0" alt="timeedu.uz" />
          <span v-if="!isHiddenPage" class="text-center text-[12px] text-white">Menejment va iqtisodiyot ilmiy-tadqiqot jurnali</span>
        </NuxtLink>
        <div class="header-right flex-1">
          <div class="header-top flex items-center justify-between pb-4 border-b border-accent-1 gap-6">
            <nav class="flex-center flex-wrap gap-2 sm:gap-6 leading-150">
              <a href="#" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
                <span class="icon-phone text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                +998 94 643 30 39
              </a>
              <hr class="h-[18px] w-px bg-accent-1 max-sm:hidden" />
              <a href="#" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
                <span class="icon-message text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                e-itt@mail.ru
              </a>
              <hr class="h-[18px] w-px bg-accent-1 max-sm:hidden" />
              <a href="#" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
                <span class="icon-telegram text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
                @e_itt_manager
              </a>
            </nav>
            <div class="flex-y-center justify-end gap-6 flex-1">
              <FormInput v-model="search" v-if="!isHiddenPage" @enter="goToLink" suffix inputClass="!text-gray-3 placeholder:text-white" wrapperClass="!bg-[#3E3F7A] !border-accent-1 !max-w-[460px] w-full" placeholder="Qidiring yoki toping">
                <template #suffix>
                  <span class="icon-search text-xl leading-5 text-white" @click="goToLink"></span>
                </template>
              </FormInput>
              <LayoutHeaderLanguageSwitcher />
            </div>
          </div>
          <div class="header-bottom pt-4 flex items-center justify-between">
            <nav class="flex-y-center space-x-8 sm:text-base flex-1">
              <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/currentIssue`)" class="transition-300 text-white hover:text-gray-5 [&.router-link-active]:text-gray-5" v-if="!isHiddenPage">Joriy nashr</NuxtLink>
              <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/archive`)" class="transition-300 text-white hover:text-gray-5 [&.router-link-active]:text-gray-5" v-if="!isHiddenPage">Arxivlar</NuxtLink>
              <LayoutHeaderNavbarDropdown
                v-if="!isHiddenPage"
                title="Biz haqimizda"
                :items="[
                  { title: 'Jurnal haqida', path: localePath(`/journal/${route.params.journalSlug}/about`) },
                  { title: 'Tahririyat jamoasi', path: localePath(`/journal/${route.params.journalSlug}/editorialTeam`) },
                  { title: 'Maxfiylik bayonoti', path: localePath(`/journal/${route.params.journalSlug}/privacy`) },
                  { title: 'Kontaktlar', path: localePath(`/journal/${route.params.journalSlug}/contact`) },
                ]"
              />
              <LayoutHeaderNavbarDropdown title="Saytdagi Jurnallar" :items="mappedJournals" />
              <FormInput @enter="goToLink" v-model="search" v-if="isHiddenPage" suffix inputClass="!text-gray-3  placeholder:text-white" wrapperClass="!bg-[#3E3F7A] !border-accent-1  !max-w-[460px] !w-full" placeholder="Qidiring yoki toping">
                <template #suffix>
                  <span class="icon-search text-xl leading-5 text-white" @click="goToLink"></span>
                </template>
              </FormInput>
            </nav>
            <LayoutHeaderAuthorization />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useRouter, useRoute } from 'vue-router'

const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const journalStore = useJournalStore()

const { journals } = storeToRefs(journalStore)

const search = ref(route.query.search)

const mappedJournals = computed(
  () =>
    journals.value?.content?.map((journal) => ({
      title: journal.name,
      path: localePath(`/journal/${journal.slug}`),
    })) || [],
)

const isHiddenPage = computed(() => {
  const path = router.currentRoute.value.path
  return path === localePath('/profile') || path === localePath('/profile/change-password') || path === localePath('/')
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
</script>
