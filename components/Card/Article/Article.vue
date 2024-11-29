<template>
  <div class="rounded-2xl bg-white border border-gray-4 p-4 md:p-6 flex flex-col items-start transition-300 hover:shadow-card h-full">
    <NuxtLink class="flex-1 flex flex-col w-full" :to="localePath(`/journal/${route.params.journalSlug}/${article.id}`)">
      <div class="leading-150 text-neutral mb-2">
        <span v-for="(collaborator, index) in article?.collaborators" :key="index"> {{ collaborator }}<span v-if="index < article.collaborators?.length - 1">, </span> </span>
      </div>
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
      </div>
    </NuxtLink>
    <div class="flex md:justify-end gap-3 w-full mt-4">
      <UIButton @click="downloadFile(article.id, article.files[0].file)" :text="translations['main.upload-article']" icon="icon-download text-xl leading-5" wrapper-class="max-md:w-full"></UIButton>
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

const props = defineProps({
  article: Object,
  file: String,
})

const loading = ref(false) // Fayl yuklanayotganini tekshirish uchun

const downloadFile = async (id, fileUrl) => {
  if (loading.value) return // Agar allaqachon yuklanayotgan bo'lsa, funksiya qaytadi

  try {
    loading.value = true // Yuklash jarayonini belgilash
    if (props.article.id === id) {
      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error("Faylni yuklab bo'lmadi")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      const fileName = fileUrl.split('/').pop()
      a.download = fileName

      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      countDownload(id) // Yuklashni hisoblash uchun
    }
  } catch (error) {
    console.error('Yuklashda xatolik yuz berdi:', error)
  } finally {
    loading.value = false // Jarayon tugagach `loading`ni tiklash
  }
}
</script>

