<script setup>
const route = useRoute()
const { y } = useWindowScroll()

const dark = computed(() => y.value > 30)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <div class="flex-1 relative">
      <slot />
    </div>
    <SectionIndexation class="mt-[120px]" />
    <LayoutFooter />
  </div>
</template>
