<template>
  <div class="relative overflow-hidden bg-cover bg-no-repeat p-12 min-h-[500px] z-10" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed z-[5]">
      <div class="container h-full" v-if="!hidden">
        <div class="flex flex-col h-full items-start justify-center gap-6 max-w-[650px] text-white">
          <h2 class="text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-110 font-bold">{{ title }}</h2>
          <div class="sm:text-base" v-html="description" />
          <UIButton :text="translations['main.submit-article']" @click="clearCookies" />
        </div>
      </div>
    </div>
    <div class="absolute inset-0 bg-black/20 z-[-1]" v-if="!hidden"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useCommonStore } from '@/stores/common.js'

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)

defineProps({
  backgroundImage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  buttonSlug: {
    type: String,
    default: 'Maqola yuborish',
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const clearCookies = () => {
  router.push(localePath(`/send-articles/${route.params.journalSlug}`))
  cookieStep.value = 1
  cookieId.value = null
}
</script>
