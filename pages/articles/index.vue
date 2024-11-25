<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container max-w-[960px]">
      <h3 class="section-title mb-6">{{ translations['main.articles'] }}</h3>
      <FormInput v-model="search" suffix inputClass="" wrapperClass="!max-w-[460px] mb-10 !w-full" :placeholder="translations['header.search-text']">
        <template #suffix>
          <span class="icon-search text-xl leading-5" @click="fetchArticles"></span>
        </template>
      </FormInput>
      <Transition name="fade" mode="out-in">
        <div v-if="data.content.length > 0">
          <CardArticle v-for="(article, i) in data?.content" :key="i" :article="article" />
        </div>
        <div v-else class="py-8 flex flex-col items-center">
          <img src="/assets/images/no-searches.png" class="mx-auto min-h-[157px] h-full max-w-[150px] w-full object-contain" alt="no-data-image" loading="lazy" />
          <p class="text-lg leading-130 font-bold text-dark text-center mx-auto mt-6 md:max-w-[50%]">Sizga kerakli narsani hali topa olmadik shekilli.</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'

import { useRoute, useRouter } from 'vue-router'

const breadcrumb = [
  {
    title: 'Qidiruv',
    link: '',
  },
]

const route = useRoute()
const router = useRouter()
const search = ref(route.query.search || '')

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)
const { getArticles } = journalStore

const { data, refresh } = await useAsyncData(
  'articles',
  async () => {
    return await getArticles({ search: search.value })
  },
  { watch: [search] },
)

watch(
  search,
  async (newSearch) => {
    router.push({ query: { ...route.query, search: newSearch } })
  },
  { immediate: true },
)

watch(
  () => route.query.search,
  async (newSearch) => {
    search.value = newSearch || ''
  },
  { immediate: true },
)

const fetchArticles = () => {
  refresh()
}
</script>
