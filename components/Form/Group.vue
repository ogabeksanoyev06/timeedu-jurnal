<template>
  <div class="flex flex-col gap-2">
    <div class="flex-center-between gap-4">
      <label :for="forId" class="text-sm leading-5 text-dark" :class="labelClass">
        {{ label }}
      </label>
      <p v-if="infoLabel" class="text-sm leading-5 font-normal text-dark">
        {{ infoLabel }}
      </p>
    </div>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Label',
  },
  labelClass: {
    type: String,
    default: '',
  },
  forId: {
    type: String,
    default: '',
  },
  error: Boolean,
  infoLabel: String,
})
</script>
