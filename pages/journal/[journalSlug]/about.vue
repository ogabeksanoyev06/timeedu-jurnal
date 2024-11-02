<template>
  <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
  <div class="container grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <h3 class="section-title mb-6">Jurnal haqida</h3>
      <p class="text-sm mb-4">“Iqtisodiy taraqqiyot va tahlil” ilmiy elektron jurnali yuridik va jismoniy shaxslarning iqtisodiyot yo‘nalishdagi maqolalari va axborotlarini chop etishga ixtisoslashgan.</p>

      <p class="text-sm mb-4">
        “Iqtisodiy taraqqiyot va tahlil” ilmiy elektron jurnali ochiq jurnal hisoblanadi va undan bepul foydalanish mumkin. Bu istalgan vaqt bepul kirish imkonini beradi va har qanday foydalanuvchi maqolalarning to'liq matnlarini o'qish, yuklab
        olish, nusxalash, tarqatish, chop etish, qidirish yoki havolalar berish, ularni indekslash uchun skanerlash, dasturiy ta'minotga ma'lumot sifatida uzatish yoki boshqa qonuniy maqsadlarda foydalanish mumkin.
      </p>

      <p class="text-sm mb-4">Jurnal o‘zbek, rus va ingliz tillarida, 1 oyda bir marotaba chiqariladigan nashrdir.</p>
      <p class="text-sm mb-4">
        Jurnalning maqsadi talaba (bakalavr va magistrant)lar, doktorantlar, tadqiqotchilar, olimlar va soha mutaxassislari ilmiy salohiyatini sayqallash, ularning diqqatini respublikamiz miqyosidagi ilmiy axborot makonda kechayotgan jarayonlarga
        jalb etish, shuningdek, iqtisodiyotning turli sohalarida olib borilayotgan dolzarb ilmiy izlanishlar natijalarini ommalashtirishdan iborat.
      </p>
      <p class="text-sm mb-4">“Iqtisodiy taraqqiyot va tahlil” ilmiy elektron jurnali yuridik va jismoniy shaxslarning iqtisodiyot yo‘nalishdagi maqolalari va axborotlarini chop etishga ixtisoslashgan.</p>

      <p class="text-sm mb-4">
        “Iqtisodiy taraqqiyot va tahlil” ilmiy elektron jurnali ochiq jurnal hisoblanadi va undan bepul foydalanish mumkin. Bu istalgan vaqt bepul kirish imkonini beradi va har qanday foydalanuvchi maqolalarning to'liq matnlarini o'qish, yuklab
        olish, nusxalash, tarqatish, chop etish, qidirish yoki havolalar berish, ularni indekslash uchun skanerlash, dasturiy ta'minotga ma'lumot sifatida uzatish yoki boshqa qonuniy maqsadlarda foydalanish mumkin.
      </p>

      <p class="text-sm mb-4">Jurnal o‘zbek, rus va ingliz tillarida, 1 oyda bir marotaba chiqariladigan nashrdir.</p>
      <p class="text-sm mb-4">
        Jurnalning maqsadi talaba (bakalavr va magistrant)lar, doktorantlar, tadqiqotchilar, olimlar va soha mutaxassislari ilmiy salohiyatini sayqallash, ularning diqqatini respublikamiz miqyosidagi ilmiy axborot makonda kechayotgan jarayonlarga
        jalb etish, shuningdek, iqtisodiyotning turli sohalarida olib borilayotgan dolzarb ilmiy izlanishlar natijalarini ommalashtirishdan iborat.
      </p>
    </div>
    <div class="lg:col-span-4 lg:sticky top-40 h-max bg-gray-1 p-4 shadow-section">
      <UIButton text="Maqolani yuborish" wrapper-class="w-full !bg-secondary rounded-none" />
      <nav class="mt-6">
        <h3 class="bg-secondary py-2 text-white px-4">Axborot</h3>
        <NuxtLink :to="localePath('/journal/slug/information/slug1')" class="py-3 px-4 block border-b">O'quvchilar uchun</NuxtLink>
        <NuxtLink :to="localePath('/journal/slug/information/slug2')" class="py-3 px-4 block border-b">Mualliflar uchun</NuxtLink>
        <NuxtLink :to="localePath('/journal/slug/information/slug3')" class="py-3 px-4 block border-b">Kutubxonachilar uchun</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
const breadcrumb = [
  {
    title: 'Jurnal haqida',
    link: '',
  },
]
</script>
