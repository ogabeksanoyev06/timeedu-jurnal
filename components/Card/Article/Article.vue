<template>
  <div class="rounded-2xl bg-white border border-gray-4 p-4 md:p-6 flex flex-col items-start transition-300 hover:shadow-card h-full">
    <NuxtLink :to="localePath(`/journal/${route.params.journalSlug}/${article.id}`)" class="leading-150 text-neutral mb-2">
      <span v-for="(collaborator, index) in article?.collaborators" :key="index"> {{ collaborator }}<span v-if="index < article.collaborators?.length - 1">, </span> </span>
    </NuxtLink>
    <h3 class="text-lg md:text-xl text-secondary leading-140 font-semibold mb-4">
      {{ article.title }}
    </h3>
    <div class="md:text-base text-dark leading-140 line-clamp-4" v-html="article.abstractInfo"></div>
    <div class="flex-center-between max-md:!flex-col gap-3 w-full mt-6">
      <ul class="flex items-center gap-4 flex-wrap">
        <li class="flex-y-center gap-1 text-secondary font-medium text-base">
          <span class="icon-file text-xl leading-5"></span>
          {{ article.pages }}
        </li>
        <hr class="w-px h-5 bg-gray-4 shrink-0" />
        <li class="flex-y-center gap-1 text-secondary font-medium text-base">
          <span class="icon-eye text-xl leading-5"></span>
          {{ article.views }}
        </li>
        <hr class="w-px h-5 bg-gray-4 shrink-0" />
        <li class="flex-y-center gap-1 text-secondary font-medium text-base">
          <span class="icon-download text-xl leading-5"></span>
          {{ article.downloads }}
        </li>
      </ul>

      <UIButton @click="downloadAllFiles(article.id, article.files)" :loading :text="translations['main.upload-article']" icon="icon-download text-xl leading-5" wrapper-class="max-md:w-full"></UIButton>
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { countDownload } = journalStore
const { translations } = storeToRefs(commonStore)

const localePath = useLocalePath()
const route = useRoute()

defineProps({
  article: Object,
  file: String,
})

const loading = ref(false)

const downloadAllFiles = async (id, files) => {
  loading.value = true
  for (const file of files) {
    try {
      const { file: fileUrl } = file
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileUrl.split('/').pop())
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Faylni yuklashda xatolik:', error)
    } finally {
      loading.value = false
    }
  }
  countDownload(id)
}
</script>
