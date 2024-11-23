<template>
  <div>
    <SectionHeroBanner :background-image="data?.journal?.image" :title="data?.journal?.name" :description="data?.journal?.description" :button-slug="data?.journal?.slug" class="mb-10" />
    <section class="container">
      <div class="grid items-start lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3">
          <img :src="data?.image" alt="Iqtisodiy Taraqqiyot haqida" class="w-full object-contain rounded-xl" />
        </div>
        <div class="lg:col-span-9">
          <p class="text-xl">Jild {{ data?.volume }} № {{ data?.number }} ( {{ dayjs(data?.createdAt).format('YYYY') }} ): {{ data?.journal?.name }}</p>
          <p class="text-xl mb-6">Nashr qilingan: {{ dayjs(data?.createdAt).format('DD.MM.YYYY') }}</p>

          <section class="mt-10 border-b pb-4">
            <h3 class="text-xl mb-4 font-medium">{{ translations['main.full-edition'] }}</h3>
            <a :href="data?.file" target="_blank">
              <UIButton :text="translations['main.upload-file']" icon-left="icon-file text-xl leading-5" wrapper-class=" !bg-secondary" />
            </a>
          </section>
          <section class="mt-10">
            <h3 class="text-xl mb-4 font-medium">{{ translations['main.articles'] }}</h3>
            <div class="grid gap-4">
              <CardArticle v-for="(article, i) in data?.articles?.content" :key="i" :article="article" :file="data.file" />
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { getInnerIssue } = journalStore
const { translations } = storeToRefs(commonStore)

const route = useRoute()

const { data } = await useAsyncData('innerIssue', async () => {
  return await getInnerIssue(route.params.slug)
})
</script>
