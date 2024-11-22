<template>
  <div>
    <Transition name="fade" mode="out-in">
      <VForm id="200" @submit="handleSubmitForm" v-slot="{ errors }" v-if="isArticles || !articlesView.filePath">
        <VField name="file" rules="required" v-model="form.file">
          <!-- <FormGroup info-label="10mb" label="Fayl"> -->
          <FormFileInput v-model="form.file" @error="isMaxSize = $event" :error="errors.file || isMaxSize" />
          <p class="text-primary mt-1">Muharrirlar sizning zaharingizni baholashi kerak bo'lgan barcha fayllarni yuklang</p>
          <!-- </FormGroup> -->
        </VField>
        <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
          <UIButton v-if="articlesView.name" text="Bekor qilish" variant="outline" />
          <UIButton :loading :disabled="cookieStep === 5" type="submit" text="Saqlash va davom ettirish" />
        </div>
      </VForm>
      <div class="flex flex-col gap-2" v-else>
        <span>Yuklangan fayl</span>
        <div class="flex items-center justify-between border border-dashed p-6 rounded-lg text-primary hover:border-primary transition-300">
          <a :href="articlesView.fileDownloadPath" target="_blank" class="text-xl underline">
            {{ articlesView.filePath }}
          </a>
          <button @click="handleDeleteFile" class="hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path
                d="M4.16667 5.5L4.16667 12.1667C4.16667 12.9407 4.16667 13.3277 4.20944 13.6526C4.50483 15.8963 6.27037 17.6618 8.51404 17.9572C8.83895 18 9.22597 18 10 18V18C10.774 18 11.1611 18 11.486 17.9572C13.7296 17.6618 15.4952 15.8963 15.7906 13.6526C15.8333 13.3277 15.8333 12.9407 15.8333 12.1667L15.8333 5.5M4.16667 5.5H2.5M4.16667 5.5H7.5M15.8333 5.5H17.5M15.8333 5.5H12.5M7.5 5.5V5.5C7.5 5.03534 7.5 4.80302 7.53843 4.60982C7.69624 3.81644 8.31644 3.19624 9.10982 3.03843C9.30302 3 9.53535 3 10 3V3C10.4647 3 10.697 3 10.8902 3.03843C11.6836 3.19624 12.3038 3.81644 12.4616 4.60982C12.5 4.80302 12.5 5.03534 12.5 5.5V5.5M7.5 5.5L12.5 5.5M7.91667 8.41667L7.91667 14.25M12.0833 8.41667L12.0833 14.25"
                stroke="#EB5757"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useFileStore } from '@/stores/file.js'
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const { showToast } = useCustomToast()

const route = useRoute()

const isArticles = ref(false)

const fileStore = useFileStore()
const journalStore = useJournalStore()

const { uploadFile, deletFile } = fileStore
const { createArticlesSaveState, getArticlesView } = journalStore

const { loading } = storeToRefs(fileStore)
const { articlesView } = storeToRefs(journalStore)

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const form = reactive({
  file: null,
})
const isMaxSize = ref(false)

const handleSubmitForm = async () => {
  try {
    const data = new FormData()
    data.append('file', form.file)
    const fileRes = await uploadFile(data)
    const res = await createArticlesSaveState(cookieId.value, 'Two', {
      filePath: fileRes.filePath,
    })
    cookieStep.value = res.state + 1
    showToast('Muvaffaqiyatli', 'success')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const handleDeleteFile = async () => {
  isArticles.value = true
}
if (articlesView.value.fullPath) {
  isArticles.value = true
}
getArticlesView(cookieId.value, 2)
</script>
