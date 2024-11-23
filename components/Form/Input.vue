<template>
  <div class="bg-white border border-gray-4 transition-300 focus-within:!border-primary overflow-hidden flex items-center rounded-xl" :class="[wrapperClass, { '!border-red-500 focus-within:!border-red-500 bg-red-500/10': error }]">
    <div class="pl-4 h-max pointer-events-none flex-center cursor-pointer transition-300" v-if="prefix">
      <slot name="prefix"> </slot>
    </div>
    <input
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
        id,
      }"
      ref="Input"
      class="w-full h-full text-sm py-3 px-4 text-dark bg-transparent placeholder:text-gray-6 placeholder:text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
      :value="modelValue"
      :class="[inputClass, suffix ? '!pr-2' : '', prefix ? '!pl-2' : '']"
      @keydown.enter.prevent="handleEnter"
      @input="handleInput"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="handleFocus"
    />
    <div class="pr-4 flex-center cursor-pointer transition-300 hover:text-yellow" v-if="suffix">
      <slot name="suffix"> </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: String,
  label: String,
  modelValue: [String, Number],
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  focus: { type: Boolean, default: false },
  maxlength: { type: Number, default: 99 },
  minlength: Number,
  max: Number,
  min: Number,
  inputClass: [String, Array],
  wrapperClass: { type: [String, Array], default: '' },
  prefix: { type: Boolean, default: false },
  suffix: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'new-password' },
  id: String,
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focusout', 'focus', 'enter'])

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}

const handleEnter = () => {
  emit('enter')
}

const Input = ref()
defineExpose({ Input })

const handleFocus = () => {
  emit('focus')
}

watch(
  () => props.focus,
  (value) => {
    if (value) {
      Input.value.focus()
    }
  },
  { deep: true, immediate: true },
)
</script>
