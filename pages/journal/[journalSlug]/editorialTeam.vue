<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data?.image" :title="data?.name" :description="data?.description" :button-slug="data?.slug" class="mb-10" />

    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <h3 class="section-title mb-6">{{ translations['main.edit-team'] }}</h3>
        <div class="text-sm mb-4" v-html="data?.editorialTeam"></div>
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
    title: translations.value['main.edit-team'],
    link: '',
  },
])

watch(
  () => translations.value,
  (newTranslations) => {
    breadcrumb.value = [
      {
        title: newTranslations['main.edit-team'],
        link: '',
      },
    ]
  },
  { deep: true },
)

const route = useRoute()

const journalStore = useJournalStore()

const { getJournalAbout } = journalStore

const { data } = await useAsyncData('about', async () => {
  return await getJournalAbout(route.params.journalSlug)
})
icon.value = data.value?.icon
</script>
