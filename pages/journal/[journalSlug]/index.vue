<template>
  <UIBreadcrumb :breadcrumb="breadcrumb" />
  <SectionHeroBanner class="mb-10" />
  <div class="container grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <section class="bg-gray-1 p-4 grid gap-4 rounded-xl">
        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-3">
            <img src="/assets/images/image.png" alt="" class="w-full object-contain" />
          </div>
          <div class="md:col-span-9">
            <p class="mb-6 text-neutral">
              “Iqtisodiy taraqqiyot va tahlil” ilmiy elektron jurnali yuridik va jismoniy shaxslarning iqtisodiyot yo‘nalishdagi maqolalari va axborotlarini chop etishga ixtisoslashgan.<br /><br />Jurnal O‘zbekiston Respublikasi Oliy attestatsiya
              komissiyasi Rayosatining 2023-yil 29-dekabrdagi 347-son qarori bilan "Dissertatsiyalar asosiy ilmiy natijalarini chop etish tavsiya etilgan ilmiy nashrlar ro‘yxati”ga <a href="https://oak.uz/pages/4802">kiritilgan</a>.
            </p>
            <p class="mb-6 text-neutral">Jurnal o‘zbek, rus va ingliz tillarida, 1 oyda bir marotaba chiqariladigan nashrdir.</p>
            <p><strong>e-ISSN: 2992-877X</strong></p>
          </div>
        </div>
        <div class="flex-end">
          <UIButton @click="$router.push(localePath('/journal/slug/about'))" text="Batafsil" wrapper-class="max-md:w-full" />
        </div>
      </section>
      <section class="mt-10 border-b pb-4">
        <h3 class="text-xl mb-4 font-medium">Joriy nashr</h3>
        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-3">
            <img src="/assets/images/image.png" alt="" class="w-full object-contain" />
          </div>
          <div class="md:col-span-9">
            <p class="mb-4 text-neutral">Jild 2 № 9 (2024): Iqtisodiy taraqqiyot va tahlil</p>
            <p class="mb-6 text-neutral">Nashr qilingan: 11-10-2024</p>
          </div>
        </div>
      </section>
      <section class="mt-10 border-b pb-4">
        <h3 class="text-xl mb-4 font-medium">To'liq son</h3>
        <UIButton text="Faylni yuklang" icon-left="icon-file text-xl leading-5" wrapper-class=" !bg-secondary" />
      </section>
      <section class="mt-10">
        <h3 class="text-xl mb-4 font-medium">Maqolalar</h3>
        <div class="grid gap-4">
          <CardArticle v-for="key in 5" :key />
          <UIButton text="Yana yuklash" wrapper-class="mt-10" />
        </div>
      </section>
    </div>

    <div class="lg:col-span-4 lg:sticky top-40 h-max bg-gray-1 p-4 shadow-section rounded-xl">
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
    title: 'Slug',
    link: '',
  },
]
</script>
