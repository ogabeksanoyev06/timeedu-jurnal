<template>
  <label class="transition group inline-flex items-center gap-3 relative select-none min-h-[20px] overflow-hidden group" :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'" :style="{ minHeight: computedSize, '--btn-size': computedBtnSize }">
    <input type="radio" class="absolute opacity-0 invisible h-0 w-0 peer" :checked="modelValue === value" v-bind="{ name, value, disabled }" @change="handleChange" />
    <span
      class="before:w-2.5 before:h-2.5 shrink-0 duration-200 ease-in-out bg-white peer-checked:bg-primary peer-checked:before:opacity-100 peer-checked:before:bg-white peer-checked:border-none before:opacity-0 relative border-2 rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-[#DADADA] peer-disabled:before:bg-gray-100"
      :class="[computedBtnStyles]"
      :style="{ width: computedSize, height: computedSize }"
    />
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number, Object],
  value: [String, Number, Object],
  label: [String, Number, Object],
  name: [String, Number],
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [String, Number],
    default: 20,
  },
  btnStyles: {
    type: String,
    default: 'before:!bg-blue group-hover:!border-blue peer-checked:!border-blue peer-checked:before:!bg-blue',
  },
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (e) => {
  const target = e.target
  emit('update:modelValue', props.value ? target.value : target.checked)
}

const computedSize = computed(() => props.size + 'px')

const computedBtnSize = computed(() => +props.size * 0.5 + 'px')

const computedBtnStyles = computed(() => (!props.disabled ? props.btnStyles : 'peer-checked:before:!bg-gray-100'))
</script>
