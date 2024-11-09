<template>
  <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
  <div class="container grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <h3 class="section-title mb-6">{{ data?.name }}</h3>
      <div class="text-sm mb-4" v-html="data?.description"></div>
    </div>
    <CommonAboutSidebar :slug="route.params.journalSlug" />
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useRoute } from 'vue-router'

const breadcrumb = [
  {
    title: 'Jurnal haqida',
    link: '',
  },
]
const route = useRoute()

const journalStore = useJournalStore()

const { getJournalInner } = journalStore

const { data } = await useAsyncData('journalInner', async () => {
  return await getJournalInner(route.params.journalSlug)
})

watchEffect(() => {
  if (data.value) {
    breadcrumb[0].title = data.value.name
  }
})
</script>
