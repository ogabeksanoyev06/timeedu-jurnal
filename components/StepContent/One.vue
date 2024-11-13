<template>
  <div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-10">
        <VField name="lang" rules="required" v-model="form.lang">
          <FormGroup label="Material tili" for-id="lang">
            <FormSelect :options="languagesList" label-key="name" value-key="code" placeholder="Material tili" id="lang" v-model="form.lang" />
            <span class="text-neutral">Bir necha tildagi materiallar qabul qilinadi. Yuqoridagi ochiladigan menyudan taqdimotingizning asosiy tilini tanlang.</span>
          </FormGroup>
        </VField>
        <div class="flex flex-col gap-3 sm:gap-4">
          <p class="text-base font-medium">Bo'lim qoidalari</p>
          <p class="text-sm sm:text-base">Standart boʻlim siyosat</p>
        </div>
        <VField name="lang" rules="required" v-model="form.lang">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <h4 class="sm:text-base font-medium">Taqdim etilgan materialga qo'yiladigan talablar</h4>
              <p class="text-neutral leading-150 max-w-[700px]">Davom etishdan oldin quyida keltirilgan barcha talablarga javob berganingizni oʻqib chiqishingiz va tasdiqlashingiz kerak.</p>
            </div>
            <FormCheckbox label="Ushbu material ilgari nashr etilmagan yoki boshqa jurnalda ko'rib chiqish va nashr qilish uchun taqdim etilmagan (yoki muharrirga eslatmalarda tushuntirilgan)." />
            <FormCheckbox label="Materiallar bilan fayl OpenOffice, Microsoft Word yoki RTF hujjat formatida taqdim etiladi." />
            <FormCheckbox label="Mumkin bo'lgan hollarda ma'lumotnomalar uchun to'liq Internet manzillari (URLlar) taqdim etiladi." />
            <FormCheckbox
              label="Matn bir qator oralig'i bilan yoziladi; 12 nuqtali shrift o'lchamidan foydalaniladi; Ta'kidlash uchun tagiga chizish o'rniga kursivdan foydalaning (URLlar bundan mustasno); Barcha rasmlar, grafiklar va jadvallar hujjatning oxirida emas, balki matnning tegishli joylarida joylashgan."
            />
            <FormCheckbox label="Matn mualliflar qo'llanmasida tasvirlangan uslubiy va bibliografik talablarga javob beradi, ularni jurnal haqida sahifasida topish mumkin." />
          </div>
        </VField>
        <VField name="commnets" rules="required" v-model="form.commnets">
          <FormGroup label="Muharrir uchun sharhlar" for-id="commnets">
            <FormTextarea rows="6" suffix placeholder="Sharh" id="commnets" v-model="form.commnets" :error="errors.commnets" />
          </FormGroup>
        </VField>
        <VField name="commnets">
          <FormCheckbox label="Ha, men Maxfiylik eslatmasiga muvofiq maʼlumotlarimni toʻplash va saqlashga roziman." />
        </VField>
      </div>
    </VForm>
  </div>
</template>

<script setup>
const languagesList = [
  {
    name: "O'zbekcha",
    code: 'uz',
  },
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
]

const form = reactive({
  lang: 'uz',
  commnets: '',
})

const handleSubmitForm = () => {}
</script>
