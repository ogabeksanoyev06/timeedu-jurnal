<template>
  <UIDropdown :show="showDropdown" :reversePosition="reversePosition" :head-class="['flex items-center flex-shrink-0 gap-1 text-gray-5 cursor-pointer transition-300']" body-class="!min-w-[220px]" @toggle="handleDropdownToggle">
    <template #head>
      <span class="text-sm text-white leading-150">{{ title }}</span>
      <svg class="transition-300" :class="showDropdown ? 'rotate-180' : ''" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 10L12 14L8 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </template>

    <template #body>
      <div class="flex flex-col divide-y divide-gray-1">
        <div v-for="(item, index) in menuItems" :key="index" class="group">
          <NuxtLink :to="item.path" class="flex items-center px-4 py-2 text-sm text-dark hover:bg-gray-1 transition-300">
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </UIDropdown>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Biz haqimizda',
  },
  reversePosition: {
    type: Boolean,
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) => {
      return value.every((item) => typeof item === 'object' && 'title' in item && 'path' in item)
    },
  },
})

const showDropdown = ref(false)

const menuItems = computed(() => props.items)

function handleDropdownToggle(val) {
  showDropdown.value = val
}
</script>
