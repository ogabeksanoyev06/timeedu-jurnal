<template>
  <div class="flex-y-center">
    <label class="group flex items-start select-none" :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer', wrapperClass]" @click="handleChange">
      <input v-bind="{ disabled, checked }" type="checkbox" class="absolute opacity-0 invisible h-0 w-0 peer" :value="modelValue" :name="name" @change="handleChange" />
      <span
        class="shrink-0 relative duration-200 ease-in-out inline-block h-6 w-6 rounded-[6px] bg-white border-2 border-gray-4 after:border-white peer-disabled:border-gray-1 peer-disabled:after:border-grey-100 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[6px] after:h-3 after:border-r-[2px] after:border-b-[2px] after:rotate-[45deg] after:opacity-0"
        :class="[
          {
            'border-red': error,
            'group-hover:border-blue': !disabled,
            '!border-primary !bg-primary after:opacity-100 ': checked,
          },
          checkboxStyles,
        ]"
      />
      <span class="ml-2 flex-y-center gap-1">
        <slot name="label">
          <span class="letter-3 leading-140 text-dark sm:text-base" :class="labelStyles">
            {{ label }}
          </span>
        </slot>
      </span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number, Boolean],
  label: String,
  name: String,
  value: [String, Number, Boolean],
  disabled: Boolean,
  error: Boolean,
  labelStyles: String,
  checked: Boolean,
  indeterminate: Boolean,
  checkboxStyles: String,
  wrapperClass: { type: [String, Array], default: '' },
})

const emit = defineEmits(['update:modelValue'])

const handleChange = () => {
  emit('update:modelValue', !props.checked)
}
</script>
