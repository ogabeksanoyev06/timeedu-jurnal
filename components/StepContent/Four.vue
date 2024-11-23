<template>
  <div class="border rounded-lg p-6">
    <p>
      {{ translations['addacticles.materials'] }}
    </p>
    <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
      <UIButton @click="handleSubmitForm" :disabled="cookieStep === 5" :text="translations['profile.continue']" />
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { useCommonStore } from '@/stores/common.js'

const { showToast } = useCustomToast()

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { createArticlesSaveState } = journalStore
const { translations } = storeToRefs(commonStore)

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
