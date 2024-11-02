<template>
  <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
  <div class="container grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
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
    title: 'nashr-slug',
    link: '',
  },
]

const localePath = useLocalePath()
</script>
