<template>
  <div>
      <VForm id="200" @submit="handleSubmitForm" v-slot="{ errors }">
        <VField name="file" rules="required" v-model="form.file">
          <FormFileInput @fileUpload="fileUpload" v-model="form.file" @error="isMaxSize = $event" :error="errors.file || isMaxSize" />
          <p class="text-primary mt-1">Muharrirlar sizning zaharingizni baholashi kerak bo'lgan barcha fayllarni yuklang</p>
        </VField>
        <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
          <UIButton v-if="articlesView.name" text="Bekor qilish" variant="outline" />
          <UIButton :loading :disabled="cookieStep === 5" type="submit" text="Saqlash va davom ettirish" />
        </div>
      </VForm>
    <section class="mt-10" v-if="fileArr.length > 0">
      <h2 class="text-lg font-medium mb-2">Yuklangan fayllar</h2>
      <ul class="flex flex-col gap-2">
        <li @click="deleteFileUpload(item)" class="flex items-center justify-between gap-2 bg-gray-1 rounded px-2 py-3 group" v-for="(item, i) in fileArr" :key="i">
          <a class="group-hover:text-primary" :href="item.file" target="_blank">
            {{ i + 1 + '. ' + item }}
          </a>
          <svg class="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-50bf8ca4="">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.2501 4.75794C14.9251 4.43294 14.4001 4.43294 14.0751 4.75794L10.0001 8.82461L5.9251 4.74961C5.6001 4.42461 5.0751 4.42461 4.7501 4.74961C4.4251 5.07461 4.4251 5.59961 4.7501 5.92461L8.8251 9.99961L4.7501 14.0746C4.4251 14.3996 4.4251 14.9246 4.7501 15.2496C5.0751 15.5746 5.6001 15.5746 5.9251 15.2496L10.0001 11.1746L14.0751 15.2496C14.4001 15.5746 14.9251 15.5746 15.2501 15.2496C15.5751 14.9246 15.5751 14.3996 15.2501 14.0746L11.1751 9.99961L15.2501 5.92461C15.5668 5.60794 15.5668 5.07461 15.2501 4.75794Z"
              fill="#ef4444"
              data-v-50bf8ca4=""
            ></path>
          </svg>
        </li>
      </ul>
    </section>
    <section class="mt-10">
      <h2 class="text-lg font-medium mb-2">Mening fayllarim</h2>
      <ul class="flex flex-col gap-2">
        <li @click="articleFileDelete(item.id)" class="flex items-center justify-between gap-2 bg-gray-1 rounded px-2 py-3 group" v-for="(item, i) in articlesView.files" :key="i">
          <a class="group-hover:text-primary" :href="item.file" target="_blank">
            {{ i + 1 + '. ' + item.file }}
          </a>
          <svg class="cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-50bf8ca4="">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.2501 4.75794C14.9251 4.43294 14.4001 4.43294 14.0751 4.75794L10.0001 8.82461L5.9251 4.74961C5.6001 4.42461 5.0751 4.42461 4.7501 4.74961C4.4251 5.07461 4.4251 5.59961 4.7501 5.92461L8.8251 9.99961L4.7501 14.0746C4.4251 14.3996 4.4251 14.9246 4.7501 15.2496C5.0751 15.5746 5.6001 15.5746 5.9251 15.2496L10.0001 11.1746L14.0751 15.2496C14.4001 15.5746 14.9251 15.5746 15.2501 15.2496C15.5751 14.9246 15.5751 14.3996 15.2501 14.0746L11.1751 9.99961L15.2501 5.92461C15.5668 5.60794 15.5668 5.07461 15.2501 4.75794Z"
              fill="#ef4444"
              data-v-50bf8ca4=""
            ></path>
          </svg>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useFileStore } from '@/stores/file.js'
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const { showToast } = useCustomToast()

const fileArr = ref([])

const loading = ref(false)

const route = useRoute()

const isArticles = ref(false)

const fileStore = useFileStore()
const journalStore = useJournalStore()

const { uploadFile, deletFile, deletFileArticle } = fileStore
const { createArticlesSaveState, getArticlesView, getKeywords } = journalStore

const { articlesView } = storeToRefs(journalStore)

const cookieId = useCookie('id')
const cookieStep = useCookie('step')
const cookieStepTab = useCookie('stepTab')

const form = reactive({
  file: null,
})
const isMaxSize = ref(false)

const fileUpload = async (file) => {
  const data = new FormData()
  data.append('file', file)
  const fileRes = await uploadFile(data)
  fileArr.value.push(fileRes.filePath)

}

const handleSubmitForm = async () => {
  try {
    loading.value = true
    const res = await createArticlesSaveState(cookieId.value, 'Two', {
      filePaths: fileArr.value,
    })
    cookieStep.value = res.state + 1
    cookieStepTab.value = cookieStepTab.value + 1
    showToast('Muvaffaqiyatli', 'success')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const articleFileDelete = async (id) => {
  try {
    const res = await deletFileArticle(id)
    console.log(res)

    const index = articlesView.value.files.findIndex((file) => file.id === id)
    if (index !== -1) {
      articlesView.value.files.splice(index, 1)
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteFileUpload = async (file) => {
  try {
    const res = await deletFile({
      filePath: file,
    })
    console.log(file)
    const index = fileArr.value.findIndex((filePath) => filePath == file)
    if (index !== -1) {
      fileArr.value.splice(index, 1)
    }
  } catch (error) {
    console.log(error)
  }
}

if (articlesView.value.fullPath) {
  isArticles.value = true
}
getArticlesView(cookieId.value, 2)
</script>
