<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data.issue?.journal?.image" :title="data?.issue?.journal?.name" :description="data?.issue?.journal?.description" :button-slug="data?.issue?.journal?.slug" class="mb-10" />
    <section class="container">
      <div class="grid lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3">
          <img :src="data.issue?.image" alt="Iqtisodiy Taraqqiyot haqida" class="w-full object-contain rounded-xl" />
        </div>
        <div class="lg:col-span-9">
          <div class="mb-4 text-neutral">
            <p class="text-xl">Jild {{ data?.issue?.volume }} № {{ data?.issue?.number }} ( {{ dayjs(data?.issue?.createdAt).format('YYYY') }} ): {{ data?.issue?.journal?.name }}</p>
            <p class="text-xl mb-6">Nashr qilingan: {{ dayjs(data?.issue?.createdAt).format('DD.MM.YYYY') }}</p>

            <p class="mb-4">Sarlavha: {{ data?.title }}</p>
            <p class="mb-4">Qisqa tavsif: {{ data?.subtitle }}</p>
            <p class="mb-4">Annotatsiya: {{ data?.abstractInfo || 'Annotatsiya mavjud emas' }}</p>
            <div class="mb-4 flex gap-1">
              Havola:
              <span v-html="data?.reference || 'Havola mavjud emas'"></span>
            </div>

            <p class="mb-4">
              Kalit so'zlar:
              <span v-if="data?.keywords.length > 0">
                {{ data?.keywords.join(', ') }}
              </span>
              <span v-else>Kalit so'zlar mavjud emas</span>
            </p>
            <p class="mb-4">Mualliflar:</p>
            <ul class="flex flex-col gap-1">
              <li v-for="collaborator in data?.collaborators" :key="collaborator.id">{{ collaborator.name }} - {{ collaborator.role }}</li>
            </ul>
            <p class="mb-4 mt-4">
              Fayl:
              <a :href="data?.file" target="_blank" class="text-blue-500 underline">Ko'rish</a>
            </p>
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
