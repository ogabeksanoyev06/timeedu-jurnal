<template>
  <UIBreadcrumb :breadcrumb="breadcrumb" />
  <SectionHeroBanner :background-image="data.image" :title="data.name" :description="data.description" :button-slug="data.slug" class="mb-10" />
  <div class="container grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <section class="bg-gray-1 p-4 grid gap-4 rounded-xl">
        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-3">
            <img :src="data.issue.image" alt="" class="w-full object-contain rounded-xl" />
          </div>
          <div class="md:col-span-9">
            <div class="mb-6 text-neutral" v-html="data.description" />
            <p>
              <strong>e-ISSN: {{ data.eissn }}</strong>
            </p>
          </div>
        </div>
        <div class="flex-end">
          <NuxtLink :to="localePath(`/journal/${data.slug}/about`)">
            <UIButton text="Batafsil" wrapper-class="max-md:w-full" />
          </NuxtLink>
        </div>
      </section>
      <section class="mt-10 border-b pb-4">
        <h3 class="text-xl mb-4 font-medium">Joriy nashr</h3>
        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-3">
            <img :src="data.issue.image" alt="" class="w-full object-contain rounded-xl" />
          </div>
          <div class="md:col-span-9">
            <p class="mb-4 text-neutral">Jild {{ data.issue?.volume }} № {{ data.issue?.number }} ( {{ dayjs(data.issue.createdAt).format('YYYY') }} ): Iqtisodiy taraqqiyot va tahlil</p>
            <p class="mb-6 text-neutral">Nashr qilingan: {{ dayjs(data.issue.createdAt).format('DD.MM.YYYY') }}</p>
          </div>
        </div>
      </section>
      <section class="mt-10 border-b pb-4">
        <h3 class="text-xl mb-4 font-medium">To'liq son</h3>
        <UIButton text="Faylni yuklang" icon-left="icon-file text-xl leading-5" wrapper-class=" !bg-secondary" />
      </section>
      <section class="mt-10">
        <h3 class="text-xl mb-4 font-medium">Maqolalar</h3>
        <div class="grid gap-4">
          <CardArticle v-for="key in 5" :key />
          <UIButton text="Yana yuklash" wrapper-class="mt-10" />
        </div>
      </section>
    </div>
    <CommonAboutSidebar :slug="route.params.journalSlug" />
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'
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
