<script setup>
import { useCountriesStore } from '@/stores/countries.js'
import { useCommonStore } from '@/stores/common.js'

const localePath = useLocalePath()
const { locale } = useI18n()

const countriesStore = useCountriesStore()
const commonStore = useCommonStore()

const { getCountries } = countriesStore
const { getTranslations } = commonStore

const { translations } = storeToRefs(commonStore)

const { data } = await useAsyncData(
  'layoutAuth',
  async () => {
    const [countries, translation] = await Promise.all([getCountries(), getTranslations()])
    return { countries, translation }
  },
  { watch: [locale] },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex-1 min-h-screen flex justify-center relative py-10">
      <div class="container">
        <div class="flex justify-end">
          <LayoutHeaderLanguageSwitcher />
        </div>
        <div class="max-w-[710px] mx-auto mt-10">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
