<template>
  <div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-10">
        <VField name="lang" rules="required" v-model="form.lang">
          <FormGroup :label="translations['addacticles.material-language']" for-id="lang">
            <FormSelect :options="languages" label-key="name" value-key="id" :placeholder="translations['addacticles.material-language']" id="lang" v-model="form.lang" />
            <span class="text-neutral">{{ translations['addacticles.submissions '] }}</span>
          </FormGroup>
        </VField>

        <div class="flex flex-col gap-3 sm:gap-4">
          <p class="text-base font-medium">{{ translations['addacticles.section'] }}</p>
          <p class="text-sm sm:text-base">{{ translations['addacticles.standard '] }}</p>
        </div>

        <VField name="requirements" rules="required" v-model="form.requirements">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <h4 class="sm:text-base font-medium">{{ translations['addacticles.requirements'] }}</h4>
              <p class="text-neutral leading-150 max-w-[700px]">{{ translations['addacticles.you-must'] }}</p>
            </div>

            <ul class="grid gap-2 list-decimal pl-4">
              <li>{{ translations['addacticles.1'] }}</li>
              <li>{{ translations['addacticles.2'] }}</li>
              <li>{{ translations['addacticles.3'] }}</li>
              <li>{{ translations['addacticles.4'] }}</li>
              <li>{{ translations['addacticles.5'] }}</li>
            </ul>
            <VField name="requirements" rules="required|checkboxRequired" v-model="form.requirements">
              <FormCheckbox v-model="form.requirements" :label="translations['addacticles.yes-check']" :error="errors.requirements" />
            </VField>
          </div>
        </VField>

        <VField name="comment" rules="required" v-model="form.comment">
          <FormGroup :label="translations['addacticles.comments-for']" for-id="comment">
            <FormTextarea rows="6" suffix placeholder="Sharh" id="comment" v-model="form.comment" :error="errors.comment" />
          </FormGroup>
        </VField>

        <VField name="privacyConsent" rules="required|checkboxRequired" v-model="form.privacyConsent">
          <FormCheckbox v-model="form.privacyConsent" :label="translations['addacticles.yes-check']" :error="errors.privacyConsent" />
        </VField>
      </div>
      <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
        <UIButton :loading :disabled="cookieStep === 5" type="submit" :text="translations['addacticles.save-continue']" />
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const { showToast } = useCustomToast()

const route = useRoute()

const cookieId = useCookie('id')
const cookieStep = useCookie('step')
const cookieStepTab = useCookie('stepTab')

const commonStore = useCommonStore()
const journalStore = useJournalStore()

const { getArticlesView } = journalStore

const { languages, translations } = storeToRefs(commonStore)
const { loading, articlesView } = storeToRefs(journalStore)

const { createArticles, createArticlesSaveState } = journalStore

const form = reactive({
  lang: 1,
  comment: '',
  requirements: false,
  privacyConsent: false,
})

const handleSubmitForm = async () => {
  try {
    let res
    if (cookieStep.value > 1) {
      res = await createArticlesSaveState(cookieId.value, 'One', {
        languageId: form.lang,
        commentForEditor: form.comment,
      })
    } else {
      res = await createArticles(route.params.journalSlug, {
        languageId: form.lang,
        commentForEditor: form.comment,
      })
    }
    cookieId.value = res.id
    cookieStep.value = res.state + 1
    cookieStepTab.value += 1

    showToast('Muvaffaqiyatli', 'success')
  } catch (error) {
    console.error('Formani yuborishda xatolik:', error)
    showToast('Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.', 'error')
  }
}

watch(
  () => articlesView.value,
  (newVal) => {
    if (newVal.id) {
      form.lang = newVal.languageId || 1
      form.comment = newVal.commentForEditor || ''
      form.requirements = true
      form.privacyConsent = true
    }
  },
  { immediate: true },
)

if (cookieId.value) {
  getArticlesView(cookieId.value, 1)
} else {
  form.lang = 1
  form.comment = ''
  form.requirements = false
  form.privacyConsent = false
}
</script>
