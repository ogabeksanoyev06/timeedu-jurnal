<template>
  <div>
    <UIBreadcrumb :breadcrumb="currentBreadcrumb" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <h3 class="text-xl sm:text-2xl font-medium mb-6">{{ translations['main.archives'] }}</h3>
        <div class="grid md:grid-cols-12 gap-6" v-for="item in archiveData?.issues?.content" :key="item.id">
          <div class="md:col-span-3">
            <img :src="item.image" :alt="item.name" class="w-full object-contain rounded-xl" />
          </div>
          <div class="md:col-span-9">
            <h3 class="mb-4 text-neutral font-medium text-xl">
              {{ archiveData?.name }}
            </h3>
            <p class="mb-4 text-neutral">{{ translations['articles.folder'] }} {{ item.volume }} № {{ item.number }} ({{ formatDate(item.createdAt, 'YYYY') }})</p>
            <p class="text-neutral">{{ translations['articles.printed'] }}: {{ formatDate(item.createdAt, 'DD.MM.YYYY') }}</p>
          </div>
        </div>
      </div>
      <CommonAboutSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const commonStore = useCommonStore()
const { translations } = storeToRefs(commonStore)
const route = useRoute()

const currentBreadcrumb = computed(() => [
  {
    title: translations.value['main.archives'],
    link: '',
  },
])

watch(
  () => translations.value,
  (newTranslations) => {
    currentBreadcrumb.value = [
      {
        title: newTranslations['main.archives'],
        link: '',
      },
    ]
  },
  { deep: true },
)

const formatDate = (date, format) => {
  return dayjs(date).format(format)
}

const journalStore = useJournalStore()
const { data: archiveData } = await useAsyncData('archive', () => journalStore.getArchive(route.params.journalSlug))
</script>
