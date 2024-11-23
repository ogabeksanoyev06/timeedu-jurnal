<template>
  <div class="bg-secondary py-3 hidden-on-print overflow-x-hidden">
    <div class="container flex items-center gap-3 md:overflow-hidden">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-1.5 text-white leading-130 text-sm hover:text-white/50 font-medium group">
        <span class="icon-home text-base leading-4 text-white group-hover:text-blue"></span>
        <p class="transition-300 group-hover:text-blue leading-4">{{ translations['main.about'] }}</p>
      </NuxtLink>
      <div v-for="(item, index) in breadcrumb" :key="index" class="flex items-center gap-3 last:max-w-[150px] sm:last:max-w-[300px] overflow-hidden group font-medium shrink-0">
        <i class="w-1.5 h-1.5 bg-white rounded-full"></i>

        <NuxtLink
          :to="localePath(item?.link)"
          :class="{
            'pointer-events-none !text-gray-5': index === breadcrumb?.length - 1,
          }"
          class="transition-300 flex cursor-pointer items-center text-white leading-4 text-sm min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu !line-clamp-1 hover:text-blue"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useCommonStore } from '@/stores/common.js'

defineProps({
  breadcrumb: {
    type: Array,
    required: true,
  },
})

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)

const localePath = useLocalePath()
</script>
