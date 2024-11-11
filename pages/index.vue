<template>
  <div>
    <section class="mb-[120px]">
      <SectionHeroBanner :hidden="true" :background-image="'/images/background.png'" />
    </section>
    <section class="container grid gap-6">
      <CardJournal v-for="(journal, i) in data?.journals?.content" :key="i" :journal="journal" />
    </section>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'

const journalStore = useJournalStore()

const { getJournals } = journalStore

const { data } = await useAsyncData('home', async () => {
  const [journals] = await Promise.all([getJournals()])
  return { journals }
})
</script>
