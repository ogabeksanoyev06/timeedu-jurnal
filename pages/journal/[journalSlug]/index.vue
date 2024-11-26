<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" />
    <SectionHeroBanner :background-image="data?.image" :title="data?.name" :description="data?.description" :button-slug="data?.slug" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <section class="bg-gray-1 p-4 grid gap-4 rounded-xl">
          <div class="grid md:grid-cols-12 gap-6">
            <div class="md:col-span-3">
              <img :src="data?.issue?.image" alt="" class="w-full object-contain rounded-xl" />
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
              <UIButton :text="translations['main.more']" wrapper-class="max-md:w-full" />
            </NuxtLink>
          </div>
        </section>
        <section class="mt-10 border-b pb-4">
          <h3 class="text-xl mb-4 font-medium">{{ translations['main.current-issue'] }}</h3>
          <div class="grid md:grid-cols-12 gap-6 group">
            <div class="md:col-span-3">
              <img :src="data.issue.image" alt="" class="w-full object-contain rounded-xl" />
            </div>
            <div class="md:col-span-9">
              <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/currentIssue/${data.issue.id}`)" class="mb-4 text-neutral group-hover:text-primary">
                Jild {{ data.issue?.volume }} № {{ data.issue?.number }} ( {{ dayjs(data.issue.createdAt).format('YYYY') }} ): Iqtisodiy taraqqiyot va tahlil</NuxtLink
              >
              <p class="mb-6 text-neutral">Nashr qilingan: {{ dayjs(data.issue.createdAt).format('DD.MM.YYYY') }}</p>
            </div>
          </div>
        </section>
        <section class="mt-10 border-b pb-4">
          <h3 class="text-xl mb-4 font-medium">{{ translations['main.full-edition'] }}</h3>
          <a :href="data?.issue?.file" target="_blank">
            <UIButton :text="translations['main.upload-file']" icon-left="icon-file text-xl leading-5" wrapper-class=" !bg-secondary" />
          </a>
        </section>
        <section class="mt-10">
          <h3 class="text-xl mb-4 font-medium">{{ translations['main.articles'] }}</h3>
          <div class="grid gap-4">
            <CardArticle v-for="(article, i) in data?.articles?.content" :key="i" :article="article" />
            <!-- <UIButton text="Yana yuklash" wrapper-class="mt-10" /> -->
          </div>
        </section>
      </div>
      <CommonAboutSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import dayjs from 'dayjs'
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const localePath = useLocalePath()

// Store initialization
const journalStore = useJournalStore()
const commonStore = useCommonStore()
const { translations, icon } = storeToRefs(commonStore)

const breadcrumbData = ref({
  title: '',
  link: '',
})

const breadcrumb = computed(() => [
  {
    title: breadcrumbData.value.title || translations.value['main.loading'],
    link: breadcrumbData.value.link,
  },
])

const { data } = await useAsyncData('journal-inner', () => journalStore.getJournalInner(route.params.journalSlug))

icon.value = data.value?.icon

watchEffect(() => {
  if (data.value) {
    breadcrumbData.value = {
      title: data.value.name,
      link: '',
    }
  }
})
</script>
