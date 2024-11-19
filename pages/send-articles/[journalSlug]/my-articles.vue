<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container max-w-[952px]">
      <h2 class="section-title text-center mb-4">Mening maqolalarim</h2>
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="p-3 text-left text-neutral font-medium text-sm uppercase">#</th>
            <th class="p-3 text-left text-neutral font-medium text-sm uppercase">Nomi</th>
            <th class="p-3 text-left text-neutral font-medium text-sm uppercase">Qadam</th>
            <th class="p-3 text-left text-neutral font-medium text-sm uppercase">Status</th>
            <th class="p-3 text-left text-neutral font-medium text-sm uppercase">Yaratilgan</th>
            <th class="p-3 text-left text-neutral font-medium text-sm uppercase">O'zgartirilgan</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b" v-for="(item, i) in data?.content" :key="i">
            <td class="p-3 text-left">{{ i + 1 }}</td>
            <td class="p-3 text-left">{{ item.title }}</td>
            <td class="p-3 text-left">{{ item.state }}</td>
            <td class="p-3 text-left" :class="item.isActive ? ' text-green-500' : ''">{{ getArticleStatus(item.state) }}</td>
            <td>{{ dayjs(item.createdAt).format('DD.MM.YYYY - hh:mm:ss') }}</td>
            <td>{{ dayjs(item.updatedAt).format('DD.MM.YYYY - hh:mm:ss') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import dayjs from 'dayjs'

const breadcrumb = [{ title: 'Mening maqolalarim', link: '' }]

const journalStore = useJournalStore()

const { getMyArticles } = journalStore

const route = useRoute()

const getArticleStatus = (state) => {
  switch (state) {
    case 1:
      return 'Boshlang‘ich'
    case 2:
      return 'Ish jarayonida'
    case 3:
      return 'Tekshirishda'
    case 4:
      return 'Tugallangan'
    default:
      return 'Noma’lum holat'
  }
}

const { data } = await useAsyncData('my-articles', async () => {
  return await getMyArticles(route.params.journalSlug)
})
</script>
