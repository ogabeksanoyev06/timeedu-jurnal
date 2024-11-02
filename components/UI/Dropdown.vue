<template>
  <div ref="target" class="relative" data-dropdown="0" tabindex="0">
    <div :class="headClass" @click.stop="toggleShow">
      <slot name="head"></slot>
    </div>
    <Transition name="dropdown" mode="out-in">
      <div v-if="showBody" class="absolute right-0 w-max min-w-full translate-y-full border border-transparent bg-white rounded-lg overflow-hidden z-[11] shadow-dropdown -bottom-1" :class="[bodyClass]" data-dropdown-body>
        <slot name="body" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'

// Props with default values
const props = defineProps({
  headClass: {
    type: [String, Array],
    default: '',
  },
  bodyClass: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: undefined,
  },
  withTrigger: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])

const showBody = ref(props.show ?? false)

const toggleShow = () => {
  if (!props.withTrigger) {
    if (props.show === undefined) {
      showBody.value = !showBody.value
    } else {
      emit('toggle', !props.show)
    }
  }
}

watch(
  () => props.show,
  (newValue) => {
    showBody.value = newValue
  },
)

const target = ref(null)
onClickOutside(target, () => {
  if (props.show === undefined) {
    showBody.value = false
  } else {
    emit('toggle', false)
  }
})
</script>

<style scoped>
@keyframes dropdown {
  0% {
    opacity: 0;
    bottom: -12px;
  }
  100% {
    opacity: 1;
    bottom: -4px;
  }
}

.dropdown-enter-active {
  animation: dropdown 0.3s ease-in-out;
}

.dropdown-leave-active {
  animation: dropdown 0.3s ease-in-out reverse;
}
</style>
