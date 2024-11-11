<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <h3 class="text-xl sm:text-2xl font-medium mb-6">Arxivlar</h3>
        <div class="grid md:grid-cols-12 gap-6">
          <div class="md:col-span-3">
            <img src="/assets/images/image.png" alt="" class="w-full object-contain" />
          </div>
          <div class="md:col-span-9">
            <h3 class="mb-4 text-neutral font-medium text-xl">Iqtisodiy taraqqiyot va tahlil</h3>
            <p class="mb-6 text-neutral">Jild 2 № 10 (2024)</p>
          </div>
        </div>
      </div>
      <CommonAboutSidebar :slug="route.params.journalSlug" />
    </div>
  </div>
</template>

<script setup>
const breadcrumb = [
  {
    title: 'Arxivlar',
    link: '',
  },
]

const localePath = useLocalePath()
const route = useRoute()
</script>
