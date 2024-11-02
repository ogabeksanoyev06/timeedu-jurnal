<template>
  <Teleport to="body">
    <div
      :class="[wrapperClass, { '!opacity-100 !visible': modelValue }]"
      data-modal="wrapper"
      class="fixed w-full h-full bg-[#151515]/80 flex justify-center z-[100] top-0 left-0 invisible opacity-0 transition-all duration-300 items-center p-3"
      @click="handleOuterClick"
    >
      <Transition :name="isMobile ? 'mobile-modal' : 'modal'" mode="out-in">
        <div v-if="modelValue" class="bg-white w-full lg:max-w-[424px] shadow-xl relative max-h-screen invisible-scroll overflow-y-auto rounded-2xl" :class="[bodyClass, { animated: animationIn }]">
          <!-- Header qismi -->
          <div v-if="!noHeader" class="flex items-center border-b border-gray-1 px-5 py-4 rounded-t-2xl" :class="headerStyle">
            <slot name="header">
              <h3 class="w-full text-sm md:text-xl leading-130 text-dark font-semibold" :class="titleStyle">
                {{ title }}
              </h3>
              <button class="text-base sm:text-2xl shrink-0 flex-center transition-300 active:scale-95 group" @click="$emit('update:modelValue', false)">
                <span class="icon-close text-dark group-hover:text-yellow transition-300" />
              </button>
            </slot>
          </div>

          <!-- Agar header bo‘lmasa, faqat close icon qo‘yiladi -->
          <button v-if="noHeader && hasCloseIcon" class="absolute -top-7 lg:-top-12 -right-0 lg:-right-[80px] active:scale-95 group" @click="$emit('update:modelValue', false)">
            <span class="icon-close text-[32px] icon-close text-dark group-hover:text-blue transition-300"></span>
          </button>

          <!-- Asosiy content -->
          <slot />
          <slot name="footer" />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'

// Propslarni define qilish
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Modal title' },
  wrapperClass: { type: [String, Array], default: '' },
  modalClass: { type: [String, Array], default: '' },
  noHeader: { type: Boolean, default: false },
  disableOuterClose: { type: Boolean, default: false },
  bodyClass: { type: [String, Array], default: '' },
  hasCloseIcon: { type: Boolean, default: true },
  titleStyle: { type: String, default: '' },
  headerStyle: { type: String, default: '' },
})

// Emits funksiyalarni tayyorlash
const emit = defineEmits(['update:modelValue', 'outer-click'])

const { width } = useWindowSize()
const isMobile = ref(width.value <= 768)

// `width` o'zgarishini kuzatamiz
watch(width, (newWidth) => {
  isMobile.value = newWidth <= 768
})

// Animation uchun state
const animationIn = ref(false)

// Modal tashqarisiga bosilganda chaqiriladigan funksiya
function handleOuterClick(e) {
  const target = e.target
  if (target.dataset?.modal === 'wrapper') {
    emit('outer-click')
    if (!props.disableOuterClose) {
      emit('update:modelValue', false)
    } else {
      animationIn.value = true
      setTimeout(() => {
        animationIn.value = false
      }, 500)
    }
  }
}

// `modelValue` ni kuzatish
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  },
)

// Modal komponenti ishga tushganda hodisalarni eshitish
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !props.disableOuterClose) {
      emit('update:modelValue', false)
    }
  })
})
</script>

<style scoped>
@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-active {
  animation: modal 0.3s ease-in-out;
}
.modal-leave-active {
  animation: modal 0.3s ease-in-out reverse;
}

@keyframes mobile-modal {
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes horizontal-shaking {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}

.mobile-modal-enter-active {
  animation: mobile-modal 0.5s ease-in-out;
}
.mobile-modal-leave-active {
  animation: mobile-modal 0.5s ease-in-out reverse;
}

.animated {
  animation: horizontal-shaking 0.4s ease-in-out;
}
</style>
