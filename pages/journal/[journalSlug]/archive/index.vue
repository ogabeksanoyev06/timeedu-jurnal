<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <h3 class="text-xl sm:text-2xl font-medium mb-6">Arxivlar</h3>
        <div class="grid md:grid-cols-12 gap-6" v-for="item in data?.issues?.content" :key="item.id">
          <div class="md:col-span-3">
            <img :src="item.image" alt="" class="w-full object-contain rounded-xl" />
          </div>
          <div class="md:col-span-9">
            <h3 class="mb-4 text-neutral font-medium text-xl">{{ data.name }}</h3>
            <p class="mb-4 text-neutral">Jild {{ item.volume }} № {{ item.number }} ( {{ dayjs(item.createdAt).format('YYYY') }} )</p>
            <p class="text-neutral">Nashr qilingan: {{ dayjs(item.createdAt).format('DD.MM.YYYY') }}</p>
          </div>
        </div>
      </div>
      <CommonAboutSidebar />
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'
import { useRoute } from 'vue-router'

const breadcrumb = [
  {
    title: 'Arxivlar',
    link: '',
  },
]

const localePath = useLocalePath()
const route = useRoute()

const journalStore = useJournalStore()

const { getArchive } = journalStore

const { data } = await useAsyncData('archive', async () => {
  return await getArchive(route.params.journalSlug)
})
</script>
