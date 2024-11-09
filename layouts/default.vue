<script setup>
import { useProfileStore } from '@/stores/profile.js'

const { y } = useWindowScroll()

const profileStore = useProfileStore()

const { getProfile } = profileStore

const { user } = storeToRefs(profileStore)

const dark = computed(() => y.value > 30)

const { data } = await useAsyncData('profile', () => getProfile())
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <div class="flex-1 relative mb-20">
      <slot />
    </div>
    <!-- <SectionIndexation class="mt-[120px]" /> -->
    <LayoutFooter />
  </div>
</template>
