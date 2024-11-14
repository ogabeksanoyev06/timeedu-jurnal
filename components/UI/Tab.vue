<template>
  <div class="relative p-1 bg-gray-100 rounded-xl inline-flex overflow-x-scroll invisible-scroll">
    <div :class="activeClass" class="absolute h-[calc(100%_-_8px)] rounded-xl bg-white shadow-[0px_0px_5px_0px_#C5CFDD] -translate-y-1/2 top-1/2 transition-all duration-300" :style="{ width: `${active.width}px`, left: `${active.left}px` }"></div>
    <button
      v-for="(tab, idx) in list"
      :id="`item-${randomNumber}_${tab.id}`"
      :key="idx"
      class="transition-300 text-sm leading-130 z-10 px-4 py-2 whitespace-nowrap font-medium"
      :class="[itemClass, modelValue === tab.id ? `${activeItemsClass ?? ''}` : '']"
      @click="pick(tab.id, $event)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [Number, String],
  list: Array,
  itemClass: String,
  activeClass: String,
  activeItemsClass: String,
})

const emit = defineEmits(['update:modelValue'])

const randomNumber = ref(0)
const active = ref({ left: 0, width: 0 })

const pick = (tab, e) => {
  const target = e.target
  active.value = {
    left: target.offsetLeft,
    width: target.offsetWidth,
  }
  emit('update:modelValue', tab)
}

onMounted(() => {
  randomNumber.value = Math.floor(Math.random() * 101)
  setTimeout(() => {
    const item = document.getElementById(`item-${randomNumber.value}_${props.modelValue}`)
    pick(props.modelValue, { target: item })
  }, 300)
})
</script>

<style>
/* Hide scrollbar for WebKit browsers (Chrome, Safari, Edge) */
.invisible-scroll {
  overflow: auto;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling */
}

.invisible-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* Hide scrollbar for Firefox */
.invisible-scroll {
  overflow: auto;
  scrollbar-width: none; /* Hide scrollbar */
  -ms-overflow-style: none; /* Hide scrollbar in IE 10+ */
}

.invisible-scroll::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Firefox */
}
</style>
