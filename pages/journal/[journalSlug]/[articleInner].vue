<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data.issue?.journal?.image" :title="data?.issue?.journal?.name" :description="data?.issue?.journal?.description" :button-slug="data?.issue?.journal?.slug" class="mb-10" />
    <section class="container">
      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3">
          <img :src="data?.issue?.image" alt="Iqtisodiy Taraqqiyot haqida" class="w-full object-contain rounded-xl" />
        </div>
        <div class="lg:col-span-9">
          <p class="text-xl">Jild {{ data?.issue?.volume }} № {{ data?.issue?.number }} ( {{ dayjs(data?.issue?.createdAt).format('YYYY') }} ): {{ data?.issue?.journal?.name }}</p>
          <p class="text-xl mb-6">Nashr qilingan: {{ dayjs(data?.issue?.createdAt).format('DD.MM.YYYY') }}</p>

          <div class="mb-4 grid gap-2">
            <h3 class="text-xl font-medium">Mualliflar</h3>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-start gap-1" v-for="item in data?.collaborators">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
                </svg>
                <div>
                  <p class="font-medium">{{ item.role }}</p>
                  <p>{{ item.name }}</p>
                  <a :href="`mailto:${item.email}`" target="_blank">{{ item.email }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="grid gap-2 mb-4">
            <h3 class="text-xl font-medium">Annotasiya</h3>
            <div class="text-neutral" v-html="data.abstractInfo"></div>
          </div>
          <div class="grid gap-2 mb-4">
            <h3 class="text-xl font-medium">Reference</h3>
            <div class="text-neutral" v-html="data.reference"></div>
          </div>
          <div class="grid gap-2 mb-4">
            <h3 class="text-xl font-medium">Kalit so‘zlar:</h3>
            <div class="flex flex-wrap gap-2">
              <span class="bg-gray-700 text-white rounded-sm px-2 py-1" v-for="(keyword, i) in data.keywords" :key="i">{{ keyword.keyword }} </span>
            </div>
          </div>
          <div class="grid gap-2 mb-4">
            <h3 class="text-xl font-medium">Bibliografik manbalar</h3>
            <div class="text-neutral" v-html="data.issue.journal.description"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const breadcrumb = [
  {
    title: '',
    link: '',
  },
]
const route = useRoute()

const journalStore = useJournalStore()

const { getArticleInner } = journalStore

const { data } = await useAsyncData('article-id', async () => {
  return await getArticleInner(route.params.articleInner)
})

watchEffect(() => {
  if (data.value) {
    breadcrumb[0].title = data.value.title
  }
})
</script>
