<template>
  <div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-10">
        <VField name="lang" rules="required" v-model="form.lang">
          <FormGroup label="Material tili" for-id="lang">
            <FormSelect :options="languages" label-key="name" value-key="id" placeholder="Material tili" id="lang" v-model="form.lang" />
            <span class="text-neutral">Bir necha tildagi materiallar qabul qilinadi. Yuqoridagi ochiladigan menyudan taqdimotingizning asosiy tilini tanlang.</span>
          </FormGroup>
        </VField>

        <div class="flex flex-col gap-3 sm:gap-4">
          <p class="text-base font-medium">Bo'lim qoidalari</p>
          <p class="text-sm sm:text-base">Standart boʻlim siyosat</p>
        </div>

        <VField name="requirements" rules="required" v-model="form.requirements">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <h4 class="sm:text-base font-medium">Taqdim etilgan materialga qo'yiladigan talablar</h4>
              <p class="text-neutral leading-150 max-w-[700px]">Davom etishdan oldin quyida keltirilgan barcha talablarga javob berganingizni oʻqib chiqishingiz va tasdiqlashingiz kerak.</p>
            </div>

            <ul class="grid gap-2 list-decimal pl-4">
              <li>Ushbu material ilgari nashr etilmagan yoki boshqa jurnalda ko'rib chiqish va nashr qilish uchun taqdim etilmagan.</li>
              <li>Materiallar bilan fayl OpenOffice, Microsoft Word yoki RTF hujjat formatida taqdim etiladi.</li>
              <li>Mumkin bo'lgan hollarda ma'lumotnomalar uchun to'liq Internet manzillari (URLlar) taqdim etiladi.</li>
              <li>Matn bir qator oralig'i bilan yoziladi; 12 nuqtali shrift o'lchamidan foydalaniladi; Ta'kidlash uchun tagiga chizish o'rniga kursivdan foydalaning.</li>
              <li>Matn mualliflar qo'llanmasida tasvirlangan uslubiy va bibliografik talablarga javob beradi.</li>
            </ul>
            <VField name="requirements" rules="required|checkboxRequired" v-model="form.requirements">
              <FormCheckbox v-model="form.requirements" label="Ha, men Maxfiylik eslatmasiga muvofiq maʼlumotlarimni toʻplash va saqlashga roziman." :error="errors.requirements" />
            </VField>
          </div>
        </VField>

        <VField name="commnets" rules="required" v-model="form.commnets">
          <FormGroup label="Muharrir uchun sharhlar" for-id="commnets">
            <FormTextarea rows="6" suffix placeholder="Sharh" id="commnets" v-model="form.commnets" :error="errors.commnets" />
          </FormGroup>
        </VField>

        <VField name="privacyConsent" rules="required|checkboxRequired" v-model="form.privacyConsent">
          <FormCheckbox v-model="form.privacyConsent" label="Ha, men Maxfiylik eslatmasiga muvofiq maʼlumotlarimni toʻplash va saqlashga roziman." :error="errors.privacyConsent" />
        </VField>
      </div>
      <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
        <UIButton text="Bekor qilish" variant="outline" />
        <UIButton :loading type="submit" text="Saqlash va davom ettirish" />
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useJournalStore } from '@/stores/journals.js'

const route = useRoute()

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const commonStore = useCommonStore()
const journalStore = useJournalStore()

const { getArticlesView } = journalStore

const { languages } = storeToRefs(commonStore)
const { loading, articlesView } = storeToRefs(journalStore)

const { createArticles } = journalStore

const form = reactive({
  lang: 1,
  commnets: '',
  requirements: false,
  privacyConsent: false,
})

if (articlesView.value) {
  form.languageId = articlesView.value.languageId
  form.commnets = articlesView.value.commentForEditor
  form.requirements = true
  form.privacyConsent = true
}

const handleSubmitForm = async () => {
  try {
    const res = await createArticles(route.params.journalSlug, {
      languageId: form.lang,
      commentForEditor: form.commnets,
    })
    cookieId.value = res.id
    cookieStep.value = res.state + 1
  } catch (error) {
    console.log(error)
  }
}

getArticlesView(cookieId.value, 1)
</script>
