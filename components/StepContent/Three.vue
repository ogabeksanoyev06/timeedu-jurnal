<template>
  <div class="grid gap-6">
    <UITab :model-value="tab" :list="tabList" @update:model-value="changeTab" />
    <transition name="fade" mode="out-in">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }" :key="tab">
        <div class="grid gap-6">
          <VField :name="`prefiks.${tab}`" rules="required" v-model="form.prefiks[tab]">
            <FormGroup label="Prefiks" for-id="prefiks">
              <FormInput :placeholder="placeholders[tab]?.prefiks" id="prefiks" v-model="form.prefiks[tab]" :error="errors[`prefiks.${tab}`]" />
            </FormGroup>
          </VField>
          <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
            <FormGroup label="Sarlavha" for-id="title">
              <FormInput :placeholder="placeholders[tab]?.title" id="title" v-model="form.title[tab]" :error="errors[`title.${tab}`]" />
            </FormGroup>
          </VField>
          <VField :name="`subtitle.${tab}`" rules="required" v-model="form.subtitle[tab]">
            <FormGroup label="Subtitr" for-id="subtitle">
              <FormInput :placeholder="placeholders[tab]?.subtitle" id="subtitle" v-model="form.subtitle[tab]" :error="errors[`subtitle.${tab}`]" />
            </FormGroup>
          </VField>
          <VField :name="`reference.${tab}`" rules="required" v-model="form.reference[tab]">
            <FormGroup label="Izohlar" for-id="reference">
              <FormTextarea rows="6" :placeholder="placeholders[tab]?.reference" id="reference" v-model="form.reference[tab]" :error="errors[`reference.${tab}`]" />
            </FormGroup>
          </VField>

          <div class="border grid gap-6 p-4 rounded-xl">
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-base font-medium">Mualliflar ro'yxati</h3>
              <button type="button" class="text-primary" @click="isModals = true">Muallif qo‘shish</button>
            </div>
            <div class="w-full h-[1px] bg-gray-4"></div>
            <table class="w-full text-primary">
              <thead>
                <tr class="border-b">
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">#</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">ISMI</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">ELEKTRON POCHTASI</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">ROLI</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">AMALLAR</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b" v-for="(item, i) in articlesView?.collaborators" :key="i">
                  <td class="p-3 text-left">{{ i + 1 }}</td>
                  <td class="p-3 text-left">{{ item.name }}</td>
                  <td class="p-3 text-left">{{ item.email }}</td>
                  <td class="p-3 text-left">{{ item.role }}</td>
                  <td class="p-3 text-left flex items-center gap-4">
                    <span class="cursor-pointer" @click="handleEditModal(item.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path
                          d="M6.94129 16.2274L2.5 18L4.27267 13.5587M6.94129 16.2274L16.1704 6.99825M6.94129 16.2274L6.58624 13.9132L4.27267 13.5587M4.27267 13.5587L13.5018 4.32962M16.1704 6.99825L13.5018 4.32962M16.1704 6.99825L16.999 6.16963C17.7359 5.43271 17.7359 4.23792 16.999 3.501V3.501C16.2621 2.76408 15.0673 2.76408 14.3304 3.501L13.5018 4.32962M9.16667 18H17.5"
                          stroke="#8959C6"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <ModalEditContributor v-if="editActiveModal === item.id" :userId="item.id" v-model="editModal" />
                    </span>
                    <span class="cursor-pointer" @click="handleDeleteModal(item.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path
                          d="M4.16667 5.5L4.16667 12.1667C4.16667 12.9407 4.16667 13.3277 4.20944 13.6526C4.50483 15.8963 6.27037 17.6618 8.51404 17.9572C8.83895 18 9.22597 18 10 18V18C10.774 18 11.1611 18 11.486 17.9572C13.7296 17.6618 15.4952 15.8963 15.7906 13.6526C15.8333 13.3277 15.8333 12.9407 15.8333 12.1667L15.8333 5.5M4.16667 5.5H2.5M4.16667 5.5H7.5M15.8333 5.5H17.5M15.8333 5.5H12.5M7.5 5.5V5.5C7.5 5.03534 7.5 4.80302 7.53843 4.60982C7.69624 3.81644 8.31644 3.19624 9.10982 3.03843C9.30302 3 9.53535 3 10 3V3C10.4647 3 10.697 3 10.8902 3.03843C11.6836 3.19624 12.3038 3.81644 12.4616 4.60982C12.5 4.80302 12.5 5.03534 12.5 5.5V5.5M7.5 5.5L12.5 5.5M7.91667 8.41667L7.91667 14.25M12.0833 8.41667L12.0833 14.25"
                          stroke="#EB5757"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <ModalDeleteContributor v-if="deleteActiveModal === item.id" :userId="item.id" v-model="deleteModal" />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="relative" ref="keywordsContainer">
            <VField :name="`keywords.${tab}`" rules="required" v-model="form.keywords[tab]">
              <FormGroup label="Qo'shimcha tushuntirishlar Kalit so'zlar" for-id="keywords">
                <FormInputTag :tags="form.keywords[tab]" :placeholder="placeholders[tab]?.keywords" id="keywords" v-model="form.keywords[tab]" :error="errors[`keywords.${tab}`]" @focus="showKeywordsDropdown" @enter="addKeyword" />
              </FormGroup>
            </VField>
          </div>
        </div>
        <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
          <!-- <UIButton text="Bekor qilish" variant="outline" /> -->
          <UIButton :loading type="submit" :disabled="!isFormComplete || cookieStep === 5" text="Saqlash va davom ettirish" />
        </div>
      </VForm>
    </transition>
    <ModalAddContributor v-model="isModals" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useJournalStore } from '@/stores/journals.js'
import { onClickOutside } from '@vueuse/core'
import { useCustomToast } from '@/composables/useCustomToast.js'

const journalStore = useJournalStore()

const { createArticlesSaveState, getArticlesView, getKeywords } = journalStore

const { loading, keywords, articlesView } = storeToRefs(journalStore)

const { showToast } = useCustomToast()

const cookieId = useCookie('id')
const cookieStep = useCookie('step')
const cookieStepTab = useCookie('stepTab')

const isModals = ref(false)
const deleteModal = ref(false)
const editModal = ref(false)

const keywordsDropdownVisible = ref(false)
const keywordsContainer = ref(null)

const tabList = [
  { name: 'O‘zbek', id: 'uz', code: 3 },
  { name: 'Русский', id: 'ru', code: 1 },
  { name: 'English', id: 'en', code: 2 },
]

const form = reactive({
  prefiks: { uz: '', ru: '', en: '' },
  title: { uz: '', ru: '', en: '' },
  subtitle: { uz: '', ru: '', en: '' },
  reference: { uz: '', ru: '', en: '' },
  keywords: { uz: [], ru: [], en: [] },
})

const placeholders = {
  uz: { prefiks: 'O‘zbek tili prefiks', title: 'O‘zbek tili sarlavha', subtitle: 'O‘zbek tili subtitr', reference: 'O‘zbek tili izohlar', keywords: 'O‘zbek tili kalit so‘zlar' },
  ru: { prefiks: 'Префикс на русском', title: 'Заголовок на русском', subtitle: 'Подзаголовок на русском', reference: 'Примечания на русском', keywords: 'Ключевые слова на русском' },
  en: { prefiks: 'English prefix', title: 'English title', subtitle: 'English subtitle', reference: 'English reference', keywords: 'English keywords' },
}

onClickOutside(keywordsContainer, () => {
  keywordsDropdownVisible.value = false
})

const tab = ref(tabList[0].id)
const editActiveModal = ref(null)
const deleteActiveModal = ref(null)

const addKeyword = (tag) => {
  const currentTab = tab.value
  if (!form.keywords[currentTab]) {
    form.keywords[currentTab] = []
  }

  const tagTrimmed = tag.trim()
  if (tagTrimmed && !form.keywords[currentTab].includes(tagTrimmed)) {
    form.keywords[currentTab] = [...form.keywords[currentTab], tagTrimmed]
  }
}

const changeTab = (code) => {
  tab.value = code

  console.log(articlesView.value)

  const currentData = articlesView.value || {}

  form.prefiks[tab.value] = currentData.prefiks?.[tab.value] || form.prefiks[tab.value]
  form.title[tab.value] = currentData.title?.[tab.value] || form.title[tab.value]
  form.subtitle[tab.value] = currentData.subtitle?.[tab.value] || form.subtitle[tab.value]
  form.reference[tab.value] = currentData.reference?.[tab.value] || form.reference[tab.value]
  const languageKeywords = currentData.keywords?.find((lang) => lang.language.code === tab.value)
  if (languageKeywords) {
    console.log(languageKeywords)
    form.keywords[tab.value] = languageKeywords.keywords.map((k) => k.keyword) || []
  } else {
    form.keywords[tab.value] = form.keywords[tab.value] || []
  }
}

const handleEditModal = (id) => {
  const collaborator = articlesView.value.collaborators.find((element) => element.id === id)
  if (collaborator) {
    editActiveModal.value = collaborator.id
    editModal.value = true
  }
}

const handleDeleteModal = (id) => {
  const collaborator = articlesView.value.collaborators.find((element) => element.id === id)
  if (collaborator) {
    deleteActiveModal.value = collaborator.id
    deleteModal.value = true
  }
}

const showKeywordsDropdown = () => {
  keywordsDropdownVisible.value = true
}

const formatNewKeywords = computed(() => {
  const newKeywords = []

  const languageKeywords = form.keywords[tab.value] || []

  if (languageKeywords.length > 0) {
    const existingLanguage = newKeywords.find((item) => item.languageId === (tab.value === 'uz' ? 3 : tab.value === 'ru' ? 1 : 2))

    if (existingLanguage) {
      existingLanguage.keywords = [...new Set([...existingLanguage.keywords, ...languageKeywords])]
    } else {
      newKeywords.push({
        languageId: tab.value === 'uz' ? 3 : tab.value === 'ru' ? 1 : 2,
        keywords: languageKeywords,
      })
    }
  }

  return newKeywords
})

const handleSubmitForm = async () => {
  try {
    const res = await createArticlesSaveState(cookieId.value, 'Three', {
      prefiks: form.prefiks,
      title: form.title,
      subtitle: form.subtitle,
      reference: form.reference,
      keywords: {
        newKeywords: formatNewKeywords.value,
        existingKeywords: [],
      },
    })
    cookieStep.value = res.state + 1
    cookieStepTab.value = cookieStepTab.value + 1
    showToast('Muvaffaqiyatli', 'success')
  } catch (error) {
    console.log(error)
    if (error.response?.data?.error) {
      const errors = error.response.data.error
      Object.keys(errors).forEach((key) => {
        showToast(key, 'error')
      })
    }
  } finally {
    loading.value = false
  }
}

const isFormComplete = computed(() => {
  return ['uz', 'ru', 'en'].every((lang) => form.prefiks[lang] && form.title[lang] && form.subtitle[lang] && form.reference[lang])
})

getArticlesView(cookieId.value, 3)
getKeywords()
console.log(formatNewKeywords.value)
</script>
