<template>
  <UIDropdown :show="showDropdown" :head-class="['flex items-center flex-shrink-0 gap-1 text-gray-5 cursor-pointer transition-300 ', {}]" body-class="!w-[160px]" @toggle="handleDropdownToggle">
    <template #head>
      <img src="/assets/svg/flags/uz.svg" alt="" class="w-5 h-4" />
      <span :class="isAuthLayout ? 'text-dark' : 'text-white'" class="text-sm leading-150"> {{ currentLanguage?.name }} </span>
      <svg class="transition-300" :class="showDropdown ? ' rotate-180' : ''" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 10L12 14L8 10" :stroke="isAuthLayout ? 'black' : 'white'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </template>
    <template #body>
      <div v-for="(lang, index) in languagesList" :key="index" class="">
        <div class="flex items-center justify-between gap-2 py-1.5 px-2 cursor-pointer transition-300 hover:bg-gray-1" :class="{ 'bg-gray-1': currentLanguage.code === lang.code }" @click="onChangeLocale(lang?.code)">
          <div class="flex items-center gap-2">
            <img :src="lang.flag" :alt="lang.name" class="w-5 h-5" />
            <span class="text-left text-sm font-medium text-dark">
              {{ lang.name }}
            </span>
          </div>
        </div>
        <hr class="ml-2 w-full border-none h-px bg-white-100 group-last:hidden" />
      </div>
    </template>
  </UIDropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguageSwitcher } from '@/composables/useLanguageSwitcher'

const route = useRoute()

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

const showDropdown = ref(false)

const isAuthLayout = computed(() => route.name?.startsWith('auth'))

function handleDropdownToggle(val) {
  showDropdown.value = val
}

function onChangeLocale(code) {
  if (currentLanguage.value?.code !== code) {
    showDropdown.value = false
    changeLocale(code)
  }
}
</script>
