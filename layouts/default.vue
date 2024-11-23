<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useProfileStore } from '@/stores/profile.js'
import { useCommonStore } from '@/stores/common.js'

const { y } = useWindowScroll()

const { locale } = useI18n()

const profileStore = useProfileStore()
const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { getProfile } = profileStore
const { getJournals } = journalStore
const { getTranslations } = commonStore

const dark = computed(() => y.value > 30)

const { data } = await useAsyncData(
  'layout',
  async () => {
    const [journals, translation] = await Promise.all([getJournals(), getTranslations()])
    return { journals, translation }
  },
  { watch: [locale] },
)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutHeader />
    <div class="flex-1 relative mb-20">
      <slot />
    </div>
    <!-- <SectionIndexation class="mt-[120px]" /> -->
    <LayoutFooter />
  </div>
</template>
