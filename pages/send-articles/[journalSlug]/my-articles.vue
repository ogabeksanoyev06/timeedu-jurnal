<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumb" class="mb-10" />
    <div class="container max-w-[952px]">
      <h2 class="section-title text-center mb-4">{{ translations['articles.title'] }}</h2>
      <div class="overflow-x-auto invisible-scroll">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">#</th>
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.name'] }}</th>
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.step'] }}</th>
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.status'] }}</th>
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.created'] }}</th>
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.changed'] }}</th>
              <th class="p-3 text-left text-neutral font-medium text-sm uppercase">{{ translations['articles.practice'] }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="(item, i) in data?.content" :key="i">
              <td class="p-3 text-left">{{ i + 1 }}</td>
              <td class="p-3 text-left">{{ item.title }}</td>
              <td class="p-3 text-left">{{ item.state }}</td>
              <td class="p-3 text-left" v-if="!item.isActive">{{ getArticleStatus(item.state) }}</td>
              <td class="p-3 text-left" v-else :class="item.isActive ? ' text-green-500' : ''">{{ translations['articles.banned'] }}</td>
              <td>{{ dayjs(item.createdAt).format('DD.MM.YYYY - hh:mm:ss') }}</td>
              <td>{{ dayjs(item.updatedAt).format('DD.MM.YYYY - hh:mm:ss') }}</td>
              <td class="p-3 text-left cursor-pointer text-primary flex items-center gap-1" @click="goToLink(item.id, item.state)">
                <span class="icon-eye text-sm leading-4"></span>
                Ko'rish
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useJournalStore } from '@/stores/journals.js'
import dayjs from 'dayjs'

definePageMeta({
  middleware: 'auth',
})

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)

const breadcrumb = computed(() => [
  {
    title: translations.value['articles.title'],
    link: '',
  },
])

watch(
  () => translations.value,
  (newTranslations) => {
    breadcrumb.value = [
      {
        title: newTranslations['articles.title'],
        link: '',
      },
    ]
  },
  { deep: true },
)

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const journalStore = useJournalStore()

const { getMyArticles } = journalStore

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
  router.push(localePath(`/send-articles/${route.params.journalSlug}`))
}

const { data } = await useAsyncData('my-articles', async () => {
  return await getMyArticles(route.params.journalSlug)
})
</script>
