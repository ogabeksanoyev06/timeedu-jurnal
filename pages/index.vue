<template>
  <div>
    <UIStepper />
    <section class="mb-[120px]">
      <SectionHeroBanner />
    </section>
    <section class="container grid gap-6">
      <CardJournal v-for="key in 3" :key />
    </section>
  </div>
</template>

<script setup>
const steps = [
  { id: 1, name: 'Boshlang‘ich' },
  { id: 2, name: 'O‘rta' },
  { id: 3, name: 'Yakuniy' },
  { id: 4, name: 'Tekshirish' },
]

const currentStep = ref(1)
</script>
