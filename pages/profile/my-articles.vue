<template>
  <div>
    <UITab :model-value="tab" :list="tabList" @update:model-value="changeTab" />
    <div class="container mt-10">
      <h2 class="text-2xl text-center mb-4">{{ translations['articles.title'] }}</h2>
      <div class="overflow-x-auto invisible-scroll">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">#</th>
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.name'] }}</th>
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.step'] }}</th>
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.status'] }}</th>
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.created'] }}</th>
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.changed'] }}</th>
              <th class="p-4 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.practice'] }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd:bg-gray-1 hover:bg-gray-1" v-for="(item, i) in data?.content" :key="i">
              <td class="p-4 text-left">{{ i + 1 }}</td>
              <td class="p-4 text-left">{{ item.title ? item.title : '' }}</td>
              <td class="p-4 text-left">{{ item.state }}</td>
              <td class="p-4 text-left" v-if="!item.isActive">{{ getArticleStatus(item.state) }}</td>
              <td class="p-4 text-left" v-else :class="item.isActive ? ' text-green-500' : ''">{{ translations['articles.banned'] }}</td>
              <td>{{ dayjs(item.createdAt).format('DD.MM.YYYY - hh:mm:ss') }}</td>
              <td>{{ dayjs(item.updatedAt).format('DD.MM.YYYY - hh:mm:ss') }}</td>
              <td class="p-4 text-left cursor-pointer text-primary flex items-center gap-1" @click="goToLink(item.id, item.state)">
                <span class="icon-eye text-sm leading-4"></span>
                {{ translations['articles.views'] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCommonStore } from '@/stores/common.js'

import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

definePageMeta({
  layout: 'profile',
})

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const journalStore = useJournalStore()

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)
const { getMyArticles } = journalStore
const { journals } = storeToRefs(journalStore)

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const tabList = ref(
  journals.value.content.map((journal) => ({
    name: journal.name,
    id: journal.slug,
  })),
)

const tab = ref(tabList.value.length > 0 ? tabList.value[0].id : '')

const changeTab = async (newTab) => {
  tab.value = newTab
  await refresh()
}

const getArticleStatus = (state) => {
  switch (state) {
    case 1:
    case 2:
    case 3:
      return translations.value['articles.unfinished']
    case 4:
      return translations.value['articles.completed']
    default:
      return 'Noma’lum holat'
  }
}

const goToLink = (id, state) => {
  cookieId.value = id
  cookieStep.value = state + 1
  router.push(localePath(`/send-articles/${tab.value}`))
}

const { data, refresh } = useAsyncData('my-articles', async () => await getMyArticles(tab.value), { watch: [tab] })
</script>
