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
    <CommonAboutSidebar :slug="route.params.journalSlug"/>
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

const route = useRoute()
</script>
