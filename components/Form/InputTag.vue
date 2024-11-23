<template>
  <div class="bg-white border border-gray-4 transition-300 focus-within:!border-primary overflow-hidden flex items-center rounded-xl" :class="[wrapperClass, { '!border-red-500 focus-within:!border-red-500 bg-red-500/10': error }]">
    <div v-if="prefix" class="pl-4 h-max pointer-events-none flex-center cursor-pointer transition-300">
      <slot name="prefix"></slot>
    </div>
    <div class="flex flex-wrap items-center px-4 py-1 w-full">
      <div class="flex flex-wrap gap-2">
        <span v-for="(tag, index) in tags" :key="index" class="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
          {{ tag }}
          <div @click.prevent="removeTag(index)" class="text-black hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-xicon w-4 h-4">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </div>
        </span>
      </div>
      <input
        v-bind="{
          type,
          minlength,
          maxlength,
          disabled,
          placeholder,
          readonly,
          autocomplete,
          id,
        }"
        ref="Input"
        class="w-full text-sm py-2 bg-transparent placeholder:text-gray-6 placeholder:text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
        :value="inputValue"
        :class="[inputClass, suffix ? '!pr-2' : '', prefix ? '!pl-2' : '']"
        @keydown.enter.prevent="handleEnter"
        @input="handleInput"
        @blur="$emit('blur')"
        @focusout="$emit('focusout')"
        @focus="handleFocus"
      />
    </div>

    <div v-if="suffix" class="pr-4 flex-center cursor-pointer transition-300 hover:text-yellow">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: 'Enter tags' },
  modelValue: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  focus: { type: Boolean, default: false },
  maxlength: { type: Number, default: 99 },
  minlength: Number,
  inputClass: [String, Array],
  wrapperClass: { type: [String, Array], default: '' },
  prefix: { type: Boolean, default: false },
  suffix: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  id: String,
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'enter', 'blur', 'focusout', 'focus'])
const inputValue = ref('')

const handleEnter = () => {
  const tag = inputValue.value.trim()
  if (tag) {
    const existingTags = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    if (!existingTags.includes(tag)) {
      const updatedTags = [...existingTags, tag]
      emit('update:modelValue', updatedTags)
      emit('enter', tag)
    }
    inputValue.value = ''
  }
}

const removeTag = (index) => {
  console.log('sasas')
  const updatedTags = [...props.modelValue]
  updatedTags.splice(index, 1)
  emit('update:modelValue', updatedTags)
}

const handleInput = (event) => {
  inputValue.value = event.target.value
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>
