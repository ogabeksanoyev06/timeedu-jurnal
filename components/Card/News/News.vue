<template>
  <div class="rounded-2xl bg-white border border-gray-4 p-4 md:p-8 flex flex-col items-start transition-300 hover:shadow-card h-full gap-4">
    <h3 class="text-lg md:text-xl text-secondary leading-140 font-semibold">O'quvchilar uchun ma'lumot</h3>
    <p class="md:text-base text-neutral leading-140 line-clamp-4">
      Biz o'quvchilarni ushbu jurnal uchun nashriyot xabarnomalari xizmatiga a'zo bo'lishga undaymiz. Jurnal uchun bosh sahifaning yuqori qismidagi Ro'yxatdan o'tish havolasidan foydalaning...
    </p>
    <UIButton class="mt-auto" variant="primary" :text="translations['main.more']" icon="icon-arrow-right text-xl leading-5" wrapper-class="!bg-gray-2 !text-secondary"> </UIButton>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)
const props = defineProps({
  item: {
    type: Object,
  },
})
</script>
