<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data?.journal?.image" :title="data?.journal?.name" :description="data?.journal?.description" :button-slug="data?.journal?.slug" class="mb-10" />
    <section class="container">
      <div class="grid items-start lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3">
          <img :src="data?.image" alt="Iqtisodiy Taraqqiyot haqida" class="w-full object-contain rounded-xl" />
        </div>
        <div class="lg:col-span-9">
          <p class="text-xl">Jild {{ data?.volume }} № {{ data?.number }} ( {{ dayjs(data?.createdAt).format('YYYY') }} ): {{ data?.journal?.name }}</p>
          <p class="text-xl mb-6">Nashr qilingan: {{ dayjs(data?.createdAt).format('DD.MM.YYYY') }}</p>
          <CardArticle v-for="(article, i) in data?.articles?.content" :key="i" :article="article" :file="data.file" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'

const breadcrumb = [
  {
    title: '',
    link: '',
  },
]

const journalStore = useJournalStore()

const { getInnerIssue } = journalStore

const route = useRoute()

const { data } = await useAsyncData('innerIssue', async () => {
  return await getInnerIssue(route.params.slug)
})
</script>
