<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8">
        <h3 class="text-xl sm:text-2xl font-medium mb-6">O'quvchilar uchun ma'lumot</h3>
        <p class="mb-4 text-neutral">
          Biz o'quvchilarni ushbu jurnal uchun nashriyot xabarnomalari xizmatiga a'zo bo'lishga undaymiz. Jurnal uchun bosh sahifaning yuqori qismidagi Ro'yxatdan o'tish havolasidan foydalaning. Bu ro'yxatga olish natijasida o'quvchi jurnalning har
          bir yangi soni uchun elektron pochta orqali Mundarija oladi. Bu ro'yxat, shuningdek, jurnalga ma'lum darajada qo'llab -quvvatlash yoki o'quvchi auditoriyasini talab qilish imkonini beradi. Jurnalning Maxfiylik bayonnomasiga qarang, bu
          o'quvchilarga ularning nomi va elektron pochta manzili boshqa maqsadlarda ishlatilmasligiga ishonch hosil qiladi.
        </p>
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
  </div>
</template>

<script setup>
const breadcrumb = [
  {
    title: 'O`quvchilar uchun ma`lumot',
    link: '',
  },
]

const localePath = useLocalePath()
</script>
