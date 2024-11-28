<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data?.image" :title="data?.name" :description="data?.description" :button-slug="data?.slug" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <h3 class="section-title mb-6">Taqriz</h3>
        <div class="text-sm mb-4" v-html="data?.peerReview"></div>
      </div>
      <CommonAboutSidebar />
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'
import { useRoute } from 'vue-router'

const commonStore = useCommonStore()
const { translations, icon } = storeToRefs(commonStore)

const breadcrumb = computed(() => [
  {
    title: 'Taqriz',
    link: '',
  },
])

watch(
  () => translations.value,
  (newTranslations) => {
    breadcrumb.value = [
      {
        title: 'Taqriz',
        link: '',
      },
    ]
  },
  { deep: true },
)
const route = useRoute()

const journalStore = useJournalStore()

const { getJournalAuthorInfo } = journalStore

const { data } = await useAsyncData('about', async () => {
  return await getJournalAuthorInfo(route.params.journalSlug)
})
icon.value = data.value?.icon
</script>
