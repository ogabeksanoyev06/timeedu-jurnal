<template>
  <div>
    <div class="container max-w-[952px] mt-10">
      <h2 class="section-title text-center mb-4">{{ translations['addacticles.article-preparation'] }}</h2>
      <NuxtLink class="mb-12 block text-center underline text-primary text-base mx-auto" :to="localePath(`/send-articles/${route.params.journalSlug}/my-articles`)"> {{ translations['addacticles.my-acrticles'] }}</NuxtLink>
      <ul class="flex items-center invisible-scroll justify-between gap-6 text-nowrap overflow-x-auto relative w-full overflow-hidden">
        <li v-for="(step, index) in steps" :key="index" class="flex items-center gap-1 transition-300 group relative cursor-pointer" @click="handleStepChange(index + 1)">
          <button class="inline-flex flex-col items-center gap-2">
            <span
              class="h-11 w-11 p-2 flex items-center justify-center border rounded-full font-medium text-xl flex-shrink-0 transition-300"
              :class="{
                'border-primary bg-primary text-white': step.status,
                'border-primary bg-gray-2 text-primary': currentStep === index + 1 && !step.status,
                'group-hover:border-primary group-hover:bg-gray-2 group-hover:text-primary': !step.status && currentStep !== index + 1,
              }"
            >
              {{ index + 1 }}
            </span>
            <span class="text-base transition-300" :class="step.status ? 'text-primary font-medium' : 'text-secondary group-hover:text-primary'">
              {{ step.title }}
            </span>
          </button>
        </li>
      </ul>
      <div class="my-10 w-full bg-gray-4 h-0.5"></div>
      <transition :name="transitionName" mode="out-in">
        <component :is="currentStepContent" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useCommonStore } from '@/stores/common.js'
import StepContentOne from '@/components/StepContent/One.vue'
import StepContentTwo from '@/components/StepContent/Two.vue'
import StepContentThree from '@/components/StepContent/Three.vue'
import StepContentFour from '@/components/StepContent/Four.vue'
import StepContentFive from '@/components/StepContent/Five.vue'

definePageMeta({
  middleware: 'auth',
})

const localePath = useLocalePath()
const route = useRoute()

const commonStore = useCommonStore()
const { translations } = storeToRefs(commonStore)

const steps = reactive([
  { title: 'Boshlash', status: false },
  { title: 'Materialni yuklash', status: false },
  { title: 'Metadata kiritish', status: false },
  { title: 'Tasdiqlash', status: false },
  { title: 'Keyingi qadamlar', status: false },
])

const cookieStep = useCookie('step', { default: () => 1 })
const cookieStepTab = useCookie('stepTab', { default: () => 1 })
const currentStep = ref(cookieStep.value)
const direction = ref('next')

const transitionName = computed(() => {
  return direction.value === 'next' ? 'slide-right' : 'slide-left'
})

const currentStepContent = computed(() => {
  switch (currentStep.value || cookieStepTab.value) {
    case 1:
      return StepContentOne
    case 2:
      return StepContentTwo
    case 3:
      return StepContentThree
    case 4:
      return StepContentFour
    case 5:
      return StepContentFive
    default:
      return StepContentOne
  }
})

function handleStepChange(step) {
  if (step <= cookieStep.value) {
    cookieStepTab.value = step
    direction.value = currentStep.value < step ? 'next' : 'prev'
    currentStep.value = step
    updateStepsStatus()
  }
}

function updateStepsStatus() {
  steps.forEach((step, index) => {
    step.status = index < currentStep.value - 1
  })
}

watch(
  () => translations.value,
  (newTranslations) => {
    steps[0].title = newTranslations['addacticles.start'] || 'Boshlash'
    steps[1].title = newTranslations['addacticles.upload'] || 'Materialni yuklash'
    steps[2].title = newTranslations['addacticles.metadata'] || 'Metadata kiritish'
    steps[3].title = newTranslations['addacticles.confirm'] || 'Tasdiqlash'
    steps[4].title = newTranslations['addacticles.nextSteps'] || 'Keyingi qadamlar'
  },
  { immediate: true },
)

watch(
  () => [cookieStep.value],
  ([newStep]) => {
    currentStep.value = newStep
    updateStepsStatus()
  },
  { immediate: true },
)

const { data } = await useAsyncData('language', async () => {
  return await commonStore.getLanguages()
})
</script>

<style scoped>
/* Slide right transition */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0); /* Next transition */
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0); /* Prev transition */
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0); /* Prev transition */
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0); /* Next transition */
}
</style>
