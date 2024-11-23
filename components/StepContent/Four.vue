<template>
  <div class="border rounded-lg p-6">
    <p>
      Ваш материал был загружен на сервер и готов к отправке. Вы можете вернуться назад, чтобы проверить и откорректировать любую информацию, которую вы ввели, перед тем как продолжить. Когда вы будете готовы, щелкните на кнопке «Завершить отправку».
    </p>
    <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
      <UIButton @click="handleSubmitForm" :disabled="cookieStep === 5" text="Davom etish" />
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const { showToast } = useCustomToast()

const journalStore = useJournalStore()

const { createArticlesSaveState } = journalStore

const cookieStep = useCookie('step')
const cookieId = useCookie('id')
const cookieStepTab = useCookie('stepTab')

const handleSubmitForm = async () => {
  try {
    const res = await createArticlesSaveState(cookieId.value, 'Four')
    cookieStep.value = res.state + 1
    cookieStepTab.value = cookieStepTab.value + 1
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessages = error.response.data.error
      Object.values(errorMessages).forEach((message) => {
        showToast(message, 'error')
      })
    }
  }
}
</script>
