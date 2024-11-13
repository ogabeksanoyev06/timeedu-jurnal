<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container max-w-[960px]">
      <h3 class="section-title mb-6">Maqolalar</h3>
      <FormInput v-model="search" suffix inputClass="" wrapperClass="!max-w-[460px] mb-10 !w-full" placeholder="Qidiring yoki toping">
        <template #suffix>
          <span class="icon-search text-xl leading-5" @click="fetchArticles"></span>
        </template>
      </FormInput>
      <div v-if="data">
        <CardArticle />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useJournalStore } from '@/stores/journals.js'
import { useRoute, useRouter } from 'vue-router'

const breadcrumb = [
  {
    title: 'Jurnal haqida',
    link: '',
  },
]

const route = useRoute()
const router = useRouter()
const search = ref(route.query.search || '')

const journalStore = useJournalStore()
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
    await refresh()
  },
  { immediate: true },
)

watch(
  () => route.query.search,
  async (newSearch) => {
    search.value = newSearch || ''
    await refresh()
  },
  { immediate: true },
)

const fetchArticles = () => {
  refresh()
}
</script>
