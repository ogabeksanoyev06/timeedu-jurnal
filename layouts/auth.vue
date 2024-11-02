<script setup>
const localePath = useLocalePath()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex-1 min-h-screen flex justify-center relative py-10">
      <div class="container">
        <NuxtLink :to="localePath('/')">
          <UIButton text="Orqaga" icon-left="icon-arrow-left text-2xl leading-6" wrapper-class="!bg-transparent !text-neutral !p-0" class="mb-10" />
        </NuxtLink>
        <div class="max-w-[710px] mx-auto">
          <slot />
        </div>
      </div>
    </div>
    <!-- <LayoutFooter /> -->
  </div>
</template>
