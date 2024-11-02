<template>
  <Transition name="fade" mode="out-in">
    <div v-if="timer" class="flex items-center gap-1">
      <p class="font-semibold text-base leading-130 text-dark">Qolgan vaqt</p>
      <p class="text-gray-300 font-semibold text-base leading-130">
        {{ time }}
      </p>
    </div>
    <button v-else class="inline-flex items-center group gap-2 bg-gray-1 border border-transparent rounded-lg py-1 px-2  transition-300 hover:border-yellow font-medium text-sm leading-130 text-dark" @click="$emit('resend')">Qayta yuborish
      <span class="icon-refresh-2 text-dark  transition-300"></span>
    </button>
  </Transition>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'

const props = defineProps({
  secondsVal: Number,
  timer: Boolean,
})

const emit = defineEmits(['timeout', 'resend'])

const seconds = ref(0)
const time = ref('')

const countDown = () => {
  seconds.value--

  const mm = Math.floor(seconds.value / 60)
  const ss = Math.floor(seconds.value % 60)

  time.value = `${mm > 9 ? mm : '0' + mm}:${ss > 9 ? ss : '0' + ss}`
}

watch(
  () => props.secondsVal,
  () => {
    seconds.value = props.secondsVal
    countDown()
  },
  { immediate: true },
)

let interval

onBeforeMount(() => {
  interval = setInterval(() => {
    countDown()

    if (seconds.value < 1) {
      clearInterval(interval)
      time.value = '00:00'
      emit('timeout')
    }
  }, 1000)
})
</script>
