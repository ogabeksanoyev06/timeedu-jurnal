<template>
  <div class="grid gap-6">
    <UITab :model-value="tab" :list="tabList" @update:model-value="changeTab" />
    <transition name="fade" mode="out-in">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }" :key="tab">
        <div class="grid gap-6">
          <VField :name="`prefiks.${tab}`" rules="required" v-model="form.prefiks[tab]">
            <FormGroup label="Prefiks" for-id="prefiks">
              <FormInput :placeholder="placeholders[tab].prefiks" id="prefiks" v-model="form.prefiks[tab]" :error="errors[`prefiks.${tab}`]" />
            </FormGroup>
          </VField>
          <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
            <FormGroup label="Sarlavha" for-id="title">
              <FormInput :placeholder="placeholders[tab].title" id="title" v-model="form.title[tab]" :error="errors[`title.${tab}`]" />
            </FormGroup>
          </VField>
          <VField :name="`subtitle.${tab}`" rules="required" v-model="form.subtitle[tab]">
            <FormGroup label="Subtitr" for-id="subtitle">
              <FormInput :placeholder="placeholders[tab].subtitle" id="subtitle" v-model="form.subtitle[tab]" :error="errors[`subtitle.${tab}`]" />
            </FormGroup>
          </VField>
          <VField :name="`reference.${tab}`" rules="required" v-model="form.reference[tab]">
            <FormGroup label="Izohlar" for-id="reference">
              <FormTextarea rows="6" :placeholder="placeholders[tab].reference" id="reference" v-model="form.reference[tab]" :error="errors[`reference.${tab}`]" />
            </FormGroup>
          </VField>

          <!-- Authors table remains unchanged -->
          <div class="border grid gap-6 p-4 rounded-xl">
            <div class="flex items-center justify-between gap-4">
              <h3 class="text-base font-medium">Mualliflar ro'yxati</h3>
              <button class="text-primary" @click="isModal = true">Muallif qo‘shish</button>
            </div>
            <div class="w-full h-[1px] bg-gray-4"></div>
            <table class="w-full text-primary">
              <thead>
                <tr class="border-b">
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">ISMI</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">ELEKTRON POCHTASI</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">ROLI</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">BOG’LOVCHI SHAXS</th>
                  <th class="p-3 text-left text-neutral font-medium text-sm uppercase">RO’YHAT KO’RUVCHI</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b" v-for="key in 3" :key="key">
                  <td class="p-3 text-left">Samandar Bozorboyev</td>
                  <td class="p-3 text-left">mrbscoder@gmail.com</td>
                  <td class="p-3 text-left">Muallif</td>
                  <td class="p-3 text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path
                        d="M7.5 10.5L9.16667 12.1667L12.5 8.83333M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z"
                        stroke="#8959C6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                  <td class="p-3 text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path
                        d="M7.5 10.5L9.16667 12.1667L12.5 8.83333M17.5 10.5C17.5 14.6421 14.1421 18 10 18C5.85786 18 2.5 14.6421 2.5 10.5C2.5 6.35786 5.85786 3 10 3C14.1421 3 17.5 6.35786 17.5 10.5Z"
                        stroke="#8959C6"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <VField :name="`keywords.${tab}`" rules="required" v-model="form.keywords[tab]">
            <FormGroup label="Qo'shimcha tushuntirishlar Kalit so'zlar" for-id="keywords">
              <FormInput :placeholder="placeholders[tab].keywords" id="keywords" v-model="form.keywords[tab]" :error="errors[`keywords.${tab}`]" />
              <span class="text-neutral">Materialingiz uchun qo'shimcha ma'lumot qo'shing. Har bir muddatdan keyin "Enter" tugmasini bosing.</span>
            </FormGroup>
          </VField>
        </div>
      </VForm>
    </transition>
    <ModalAddContributor v-model="isModal" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isModal = ref(false)

const tabList = [
  { name: 'O‘zbek', id: 'uz' },
  { name: 'Русский', id: 'ru' },
  { name: 'English', id: 'en' },
]

const form = reactive({
  prefiks: { uz: '', ru: '', en: '' },
  title: { uz: '', ru: '', en: '' },
  subtitle: { uz: '', ru: '', en: '' },
  reference: { uz: '', ru: '', en: '' },
  keywords: { uz: '', ru: '', en: '' },
})

const placeholders = {
  uz: { prefiks: 'O‘zbek tili prefiks', title: 'O‘zbek tili sarlavha', subtitle: 'O‘zbek tili subtitr', reference: 'O‘zbek tili izohlar', keywords: 'O‘zbek tili kalit so‘zlar' },
  ru: { prefiks: 'Префикс на русском', title: 'Заголовок на русском', subtitle: 'Подзаголовок на русском', reference: 'Примечания на русском', keywords: 'Ключевые слова на русском' },
  en: { prefiks: 'English prefix', title: 'English title', subtitle: 'English subtitle', reference: 'English reference', keywords: 'English keywords' },
}

const tab = ref(tabList[0].id)

const changeTab = (code) => {
  tab.value = code
}

const handleSubmitForm = () => {
  console.log(form)
}
</script>
