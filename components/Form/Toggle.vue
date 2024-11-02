<template>
  <label class="transition duration-200 ease-in-out inline-flex items-center border w-11 h-[25px] relative rounded-[50px] cursor-pointer p-0.5 shrink-0" :class="value ? 'bg-yellow border-yellow' : 'border-gray-100 bg-gray-100'">
    <input :checked="value" type="checkbox" class="absolute w-px h-px opacity-0" @change="handleChange" />
    <span class="absolute w-5 h-5 rounded-full transition duration-200 ease-in-out bg-white shadow-[0_3px_1px_0_#0000000A,0_3px_8px_0_#0000001A]" :class="value ? 'translate-x-[18px] ' : 'translate-x-0'" />
  </label>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

// Propdagi qiymat o'zgarishini kuzatish
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === value.value) return
    value.value = newValue
  },
  { immediate: true },
)

const handleChange = (e) => {
  const target = e.target
  if (!target) return

  value.value = target.checked
  emit('update:modelValue', value.value)
}
</script>
