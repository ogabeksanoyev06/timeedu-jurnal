<template>
  <div ref="select" class="relative" :class="wrapperStyles">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-white border border-gray-4 transition-300 rounded-lg px-3 py-2.5 cursor-pointer flex items-center justify-between gap-3"
      :class="[selectedOptionStyles, { '!border-red-500 bg-red-500/10': error }, { '!border-primary': showOptions }]"
      @click="toggleSelect(!showOptions)"
    >
      <slot name="selectedOption" :value="value">
        <div class="flex-y-center gap-1.5">
          <slot name="prefix" />
          <div v-if="!value" class="truncate text-base sm:text-sm leading-5 whitespace-nowrap" :class="placeholderClass">
            {{ placeholder }}
          </div>
          <slot v-else name="selectedOptionInner" :value="value">
            <div class="w-full text-base sm:text-sm leading-5 text-dark ">
              {{ value[labelKey] || value }}
            </div>
          </slot>
        </div>
        <span class="transition-300" :class="{ 'rotate-180': showOptions }">
          <slot name="chevron">
            <svg class="transition-all duration-200 inline-block text-gray w-[18px] h-[18px]" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9.32532L12 15.3253L18 9.32532" stroke="#354052" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </slot>
        </span>
      </slot>
    </div>

    <!--  OPTIONS  -->
    <Transition name="select">
      <div v-if="showOptions" :key="showOptions" class="absolute shadow-lg w-full bg-white border border-gray-100 rounded-lg z-50 overflow-x-hidden max-h-[220px] scroll-style top-full translate-y-1">
        <slot name="options">
          <template v-if="options?.length">
            <div v-for="(option, idx) in options" :key="idx" class="transition-all duration-200 px-3 py-2.5 hover:bg-gray-1 cursor-pointer flex-center-between border-b border-gray-100 last:border-[0px] group" @click="onSelect(option)">
              <slot name="option" :option="option" :index="idx">
                <p class="text-base sm:text-sm leading-5 text-dark font-normal select-none" :class="{ 'font-medium': isActive(option) }">
                  {{ option[labelKey] }}
                </p>
              </slot>
              <svg v-if="isActive(option)" class="icon-tick text-blue block text-sm" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
              </svg>
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">No data</div>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full" />
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: { type: [String, Number, Object], default: undefined },
  error: { type: Boolean, default: false },
  options: { type: Array, required: true },
  labelKey: { type: String, default: 'name' },
  valueKey: { type: String, default: 'id' },
  selectedOptionStyles: { type: String, default: '' },
  placeholder: { type: String, default: undefined },
  infiniteScroll: { type: Boolean, default: false },
  searchText: { type: String, default: '' },
  noDataText: { type: String, default: 'no_search_data' },
  wrapperStyles: { type: String, default: '' },
  position: { type: String, default: 'bottom' },
  placeholderClass: { type: String, default: '' },
})

const emit = defineEmits(['on-toggle', 'on-select', 'update:modelValue', 'infinite-scroll'])

const showOptions = ref(false)
const target = ref(null)

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

defineExpose({ toggleSelect })

function findOption(option) {
  return props.options?.find((o) => o === option || o[props.valueKey] === option)
}

const value = computed({
  get() {
    return findOption(props.modelValue)
  },
  set(newValue) {
    emit('update:modelValue', newValue?.[props.valueKey] ?? newValue)
  },
})

function onSelect(option) {
  value.value = option
  toggleSelect(false)
  emit('on-select', option)
}

const select = ref()
onClickOutside(select, () => toggleSelect(false))

function isActive(option) {
  return option === value.value || (value.value && value.value?.[props.valueKey] === option?.[props.valueKey]) || option?.[props.valueKey] === value.value
}
</script>

<style scoped>
.scroll-style::-webkit-scrollbar {
  display: none;
}
</style>
