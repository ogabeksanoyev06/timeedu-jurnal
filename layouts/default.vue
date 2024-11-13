<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useProfileStore } from '@/stores/profile.js'
import { useCommonStore } from '@/stores/common.js'

const { y } = useWindowScroll()

const { locale } = useI18n()

const profileStore = useProfileStore()
const commonStore = useCommonStore()
const journalStore = useJournalStore()

const { getProfile } = profileStore
const { getLanguages } = commonStore
const { getJournals } = journalStore

const { user } = storeToRefs(profileStore)

const dark = computed(() => y.value > 30)

const { data } = await useAsyncData(
  'layout',
  async () => {
    const [profile, language, journals] = await Promise.all([getProfile(), getLanguages(), getJournals()])
    return { profile, language, journals }
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
