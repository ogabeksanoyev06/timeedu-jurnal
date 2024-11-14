<template>
  <div class="bg-white border border-gray-4 transition-300 focus-within:!border-primary overflow-hidden flex items-center rounded-xl" :class="[wrapperClass, { '!border-red-500 focus-within:!border-red-500 bg-red-500/10': error }]">
    <div class="pl-4 h-max pointer-events-none flex-center cursor-pointer transition-300" v-if="prefix">
      <slot name="prefix"> </slot>
    </div>

    <div class="flex flex-wrap items-center px-4 py-1 w-full">
      <div class="flex flex-wrap gap-1">
        <span v-for="(tag, index) in tags" :key="index" class="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
          {{ tag }}
          <button @click.prevent="removeTag(index)" class="text-black hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-xicon w-4 h-4">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </span>
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
        class="w-full text-sm py-2 bg-transparent placeholder:text-gray-6 placeholder:text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
        :value="inputValue"
        :class="[inputClass, suffix ? '!pr-2' : '', prefix ? '!pl-2' : '']"
        @keyup.enter.prevent="addTag"
        @input="handleInput"
        @blur="$emit('blur')"
        @focusout="$emit('focusout')"
        @focus="handleFocus"
      />
    </div>

    <div class="pr-4 flex-center cursor-pointer transition-300 hover:text-yellow" v-if="suffix">
      <slot name="suffix"> </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: 'Enter tags' },
  modelValue: { type: Array, default: () => [] },
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
  autocomplete: { type: String, default: 'off' },
  id: String,
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focusout', 'focus', 'enter'])

const tags = ref([...props.modelValue])
const inputValue = ref('')

const handleInput = (e) => {
  inputValue.value = e.target.value
}

const addTag = () => {
  const tag = inputValue.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
    emit('update:modelValue', tags.value)
  }
  inputValue.value = ''
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
  emit('update:modelValue', tags.value)
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
  { immediate: true },
)
</script>
