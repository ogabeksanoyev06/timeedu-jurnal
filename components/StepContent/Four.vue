<template>
  <div class="border rounded-lg p-6">
    <p>
      Ваш материал был загружен на сервер и готов к отправке. Вы можете вернуться назад, чтобы проверить и откорректировать любую информацию, которую вы ввели, перед тем как продолжить. Когда вы будете готовы, щелкните на кнопке «Завершить отправку».
    </p>
    <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
      <UIButton @click="handleSubmitForm" text="Davom etish" />
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'

const journalStore = useJournalStore()

const { createArticlesSaveState } = journalStore

const cookieStep = useCookie('step')
const cookieId = useCookie('id')

const handleSubmitForm = async () => {
  try {
    const res = await createArticlesSaveState(cookieId.value, 'Four')
    cookieStep.value = res.state + 1
  } catch (error) {
    console.log(error)
  }
}


</script>
