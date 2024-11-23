<script setup>
import { useCommonStore } from '@/stores/common.js'

defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const commonStore = useCommonStore()
const { translations } = storeToRefs(commonStore)

const localePath = useLocalePath()
</script>

<template>
  <UIModal disableOuterClose title="Pochtaga xabar yuborildi" :model-value @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit alias quibusdam rem velit quae, consequatur eum cupiditate in dolorum nam dignissimos necessitatibus natus ad quasi amet recusandae fuga doloribus?

      <div class="flex justify-end gap-2 mt-5">
        <NuxtLink :to="localePath('/')">
          <UIButton text="Bosh sahifa"  />
        </NuxtLink>
      </div>
    </div>
  </UIModal>
</template>
