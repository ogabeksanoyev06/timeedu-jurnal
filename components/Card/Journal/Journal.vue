<template>
  <div class="grid lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <div class="rounded-xl bg-gray-1 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 h-full flex flex-col">
        <h2 class="section-title">Iqtisodiy Taraqqiyot haqida</h2>
        <p class="text-neutral sm:text-base leading-140 sm:mt-6 mt-4">
          “Iqtisodiy taraqqiyot va tahlil” ilmiy elektron jurnali yuridik va jismoniy shaxslarning iqtisodiyot yo‘nalishdagi maqolalari va axborotlarini chop etishga ixtisoslashgan.  Jurnal O‘zbekiston Respublikasi Oliy attestatsiya komissiyasi
          Rayosatining 2023-yil 29-dekabrdagi 347-son qarori bilan "Dissertatsiyalar asosiy ilmiy natijalarini chop etish tavsiya etilgan ilmiy nashrlar ro‘yxati”ga kiritilgan. Jurnal o‘zbek, rus va ingliz tillarida, 1 oyda bir marotaba
          chiqariladigan nashrdir.
        </p>
        <div class="mt-6 sm:mt-10 flex justify-end">
          <UIButton @click="$router.push(localePath('/journal/slug/about'))" wrapper-class="bg-secondary hover:bg-secondary/90 max-sm:w-full" text="Batafsil" icon="icon-arrow-right-long-1 text-xl leading-5" />
        </div>
        <div class="flex max-sm:flex-col gap-3 sm:gap-5 mt-4">
          <UIButton @click="$router.push(localePath('/journal/slug'))" wrapper-class="bg-secondary hover:bg-secondary/90 max-sm:w-full" text="Jurnalni ko'rish" />
          <UIButton @click="$router.push(localePath('/journal/slug/current-edition'))" wrapper-class="max-sm:w-full" variant="outline" text="Joriy nashr" icon="icon-file text-xl leading-5" />
        </div>
        <div class="flex items-end justify-between gap-6 mt-6 sm:mt-10 lg:mt-auto">
          <p class="text-neutral sm:text-base">e-ISSN: 2992-877X</p>
          <img src="/assets/svg/logo-dark.svg" alt="" class="max-sm:max-w-[120px]" />
        </div>
      </div>
    </div>
    <div class="lg:col-span-4">
      <img src="/assets/images/image.png" alt="" class="w-full object-contain" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({})

const localePath = useLocalePath()
</script>
