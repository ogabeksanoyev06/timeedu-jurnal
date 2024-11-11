<template>
  <div class="max-w-[580px] mx-auto flex items-center flex-col justify-center">
    <p class="mb-8 text-lg leading-140 text-center">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro fugiat commodi harum. Animi asperiores placeat veritatis sint facilis repudiandae ratione quam.
    </p>
    <div class="flex items-center justify-center flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
      <NuxtLink :to="localePath('/')">
        <UIButton text="Bosh sahifa" />
      </NuxtLink>
      <UIButton text="Emailni tasdiqlash" variant="outline" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
})

const localePath = useLocalePath()
</script>
