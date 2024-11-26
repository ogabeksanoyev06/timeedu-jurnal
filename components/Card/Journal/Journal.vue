<template>
  <div class="grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <div class="rounded-xl bg-gray-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 h-full flex flex-col">
        <h2 class="section-title">{{ journal.name }}</h2>
        <div class="text-neutral sm:text-base leading-140 sm:mt-6 mt-4" v-html="journal.description" />
        <div class="mt-6 sm:mt-10 flex justify-end">
          <UIButton @click="navigateTo(journal.slug, 'about')" wrapper-class="bg-secondary hover:bg-secondary/90 max-sm:w-full" :text="translations['main.more']" icon="icon-arrow-right-long-1 text-xl leading-5" />
        </div>
        <div class="flex max-sm:flex-col gap-3 sm:gap-5 mt-4">
          <UIButton @click="navigateTo(journal.slug)" wrapper-class="bg-secondary hover:bg-secondary/90 max-sm:w-full" :text="translations['main.views']" />
          <UIButton @click="navigateTo(journal.slug, 'currentIssue')" wrapper-class="max-sm:w-full" variant="outline" :text="translations['main.current-issue']" icon="icon-file text-xl leading-5" />
        </div>
        <div class="flex items-end justify-between gap-6 mt-6 sm:mt-10 lg:mt-auto">
          <p class="text-neutral sm:text-base">e-ISSN: {{ journal.eissn }}</p>
          <img src="/assets/svg/logo-dark.svg" alt="" class="max-sm:max-w-[120px]" />
        </div>
      </div>
    </div>
    <div class="lg:col-span-4">
      <img :src="journal?.currentIssue?.image" :alt="journal.name" class="w-full object-contain rounded-xl" />
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)
const props = defineProps({
  journal: {
    type: Object,
    required: true,
  },
})

const localePath = useLocalePath()

const router = useRouter()

const navigateTo = (slug, route) => {
  const path = route ? localePath(`/journal/${slug}/${route}`) : localePath(`/journal/${slug}`)
  router.push(path)
}
</script>
