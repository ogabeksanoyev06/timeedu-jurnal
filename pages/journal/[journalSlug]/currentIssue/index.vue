<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data?.journal.image" :title="data?.journal.name" :description="data?.journal.description" :button-slug="data?.slug" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <section class="border-b pb-4">
          <h3 class="text-xl mb-4 font-medium">{{ translations['main.current-issue'] }}</h3>
          <div class="grid md:grid-cols-12 gap-6 group">
            <div class="md:col-span-3">
              <img :src="data.image" alt="" class="w-full object-contain rounded-xl" />
            </div>
            <div class="md:col-span-9">
              <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/currentIssue/${data.id}`)" class="mb-4 text-neutral group-hover:text-primary">
                {{ translations['articles.folder'] }} {{ data?.volume }} № {{ data?.number }} ( {{ dayjs(data.createdAt).format('YYYY') }} ): Iqtisodiy taraqqiyot va tahlil</NuxtLink
              >
              <p class="mb-6 text-neutral">{{ translations['articles.printed'] }}: {{ dayjs(data.createdAt).format('DD.MM.YYYY') }}</p>
            </div>
          </div>
        </section>
        <section class="mt-10 border-b pb-4">
          <h3 class="text-xl mb-4 font-medium">{{ translations['main.full-edition'] }}</h3>
          <a :href="data?.file" target="_blank">
            <UIButton :text="translations['main.upload-file']" icon-left="icon-file text-xl leading-5" wrapper-class=" !bg-secondary" />
          </a>
        </section>
        <section class="mt-10">
          <h3 class="text-xl mb-4 font-medium">{{ translations['main.articles'] }}</h3>
          <div class="grid gap-4">
            <CardArticle v-for="(article, i) in data?.articles?.content" :key="i" :article="article" />
          </div>
        </section>
      </div>
      <CommonAboutSidebar />
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'

import { useRoute } from 'vue-router'

const breadcrumb = [
  {
    title: 'Slug',
    link: '',
  },
]

const localePath = useLocalePath()
const route = useRoute()

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { translations, icon } = storeToRefs(commonStore)
const { getCurrentIssue } = journalStore

const { data } = await useAsyncData('currentIssue', async () => {
  return await getCurrentIssue(route.params.journalSlug)
})
icon.value = data.value?.journal?.icon

watchEffect(() => {
  if (data.value) {
    breadcrumb[0].title = data.value?.journal.name
  }
})
</script>
