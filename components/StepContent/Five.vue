<template>
  <div class="border rounded-lg p-6 grid gap-4">
    <h3 class="text-base font-medium">{{ translations['addacticles.submission-completed'] }}</h3>
    <p>{{ translations['addacticles.thank-you'] }}</p>
    <div class="w-full h-[1px] bg-gray-4"></div>
    <h3 class="text-base font-medium">{{ translations['addacticles.what-will-he'] }}</h3>
    <p>{{ translations['addacticles.the-journal'] }}</p>
    <nav class="flex flex-col gap-2">
      <NuxtLink :to="localePath(`/send-articles/${route.params.journalSlug}/my-articles`)" class="flex items-center gap-3 text-primary underline">
        <span class="w-1 h-1 bg-primary rounded-full"></span>
        {{ translations['addacticles.view-content'] }}
      </NuxtLink>
      <div @click="handleComplete" class="cursor-pointer flex items-center gap-3 text-primary underline">
        <span class="w-1 h-1 bg-primary rounded-full"></span>
        {{ translations['addacticles.create-new-material'] }}
      </div>
      <NuxtLink :to="localePath('/profile')" class="flex items-center gap-3 text-primary underline">
        <span class="w-1 h-1 bg-primary rounded-full"></span>
        {{ translations['addacticles.return-personal-account'] }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'

const localePath = useLocalePath()

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)

const cookieId = useCookie('id')
const cookieStep = useCookie('step')
const cookieStepTab = useCookie('stepTab')

const route = useRoute()

const handleComplete = () => {
  cookieId.value = null
  cookieStep.value = 1
  navigateTo(localePath(`/send-articles/${route.params.journalSlug}`))
}
</script>
