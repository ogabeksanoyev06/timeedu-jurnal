<template>
  <div class="code-input" :class="error ? 'error' : ''">
    <label v-if="label" class="mb-2 block text-sm leading-130 font-medium text-dark" :for="`verification-input-${randomNumber}`">
      {{ label }}
    </label>
    <div class="flex-y-center gap-4">
      <template v-for="(v, index) in values" :key="index">
        <div class="relative overflow-hidden !rounded-none">
          <input
            :id="`verification-input-${randomNumber + index}`"
            :ref="
              (el) => {
                if (el) inputs[index + 1] = el
              }
            "
            class="w-full text-center outline-none transition-300 border border-gray-2 bg-white rounded-lg h-14 focus-within:border-primary focus-within:bg-white font-semibold text-xl text-dark leading-140 overflow-hidden"
            :class="inputClass"
            pattern="[0-9]"
            :autoFocus="autoFocus && index === autoFocusIndex"
            :data-id="index"
            :value="v"
            :required="props.required"
            :disabled="props.disabled"
            maxlength="1"
            @input="onValueChange"
            @focus="onFocus($event, index)"
            @keydown="onKeyDown"
            @paste="pasteDigits"
            @blur="activeIndex = null"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUpdate, onMounted, ref, toRef, watch } from 'vue'

const props = defineProps({
  className: String,
  inputClass: String,
  step: Number,
  fields: {
    type: Number,
    default: 6,
  },
  title: String,
  error: Boolean,
  label: {
    type: String,
    required: false,
    default: '',
  },
})
const emit = defineEmits(['change', 'complete', 'update:modelValue'])

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

const randomNumber = Math.floor(Math.random() * 101)
const values = ref([]) // Input maydonlaridagi qiymatlarni saqlaydi
const iRefs = ref([]) // Input maydonlarini o'zida saqlaydi
const inputs = ref([]) // Input elementlari uchun ishorat
const fields = toRef(props, 'fields')
const autoFocusIndex = ref(0)
const autoFocus = true
const activeIndex = ref(0)

const initVals = () => {
  let vals
  if (values.value && values.value.length) {
    vals = []
    for (let i = 0; i < fields.value; i++) {
      vals.push(values.value[i] || '')
    }
    autoFocusIndex.value = values.value.length >= fields.value ? 0 : values.value.length
  } else {
    vals = Array(fields.value).fill('') // Har bir maydon uchun bo'sh qiymat
  }
  iRefs.value = []
  for (let i = 0; i < fields.value; i++) {
    iRefs.value.push(i + 1)
  }
  values.value = vals
}

const onFocus = (e, index) => {
  activeIndex.value = index
  e.target.select(e) // Kursor input maydonidagi qiymatni tanlaydi
}

const onValueChange = (e) => {
  const index = parseInt(e.target.dataset.id)
  e.target.value = e.target.value.replace(/[^\d]/gi, '') // Faqat raqam qabul qilish uchun
  if (e.target.value === '' || !e.target.validity.valid) {
    return
  }
  let next
  const value = e.target.value
  values.value = Object.assign([], values.value)
  if (value.length > 1) {
    let nextIndex = value.length + index - 1
    if (nextIndex >= fields.value) {
      nextIndex = fields.value - 1
    }
    next = iRefs.value[nextIndex]
    const split = value.split('')
    split.forEach((item, i) => {
      const cursor = index + i
      if (cursor < fields.value) {
        values.value[cursor] = item
      }
    })
  } else {
    next = iRefs.value[index + 1]
    values.value[index] = value
  }
  if (next) {
    const element = inputs.value[next]
    element.focus()
    element.select()
  }
  triggerChange(values.value)
}

const onKeyDown = (e) => {
  const index = parseInt(e.target.dataset.id)
  const prevIndex = index - 1
  const nextIndex = index + 1
  const prev = iRefs.value[prevIndex]
  const next = iRefs.value[nextIndex]
  switch (e.keyCode) {
    case KEY_CODE.backspace: {
      e.preventDefault()
      const vals = [...values.value]
      if (values.value[index]) {
        vals[index] = ''
        values.value = vals
        triggerChange(vals)
      } else if (prev) {
        vals[prevIndex] = ''
        inputs.value[prev].focus()
        values.value = vals
        triggerChange(vals)
      }
      break
    }
    case KEY_CODE.left:
      e.preventDefault()
      if (prev) {
        inputs.value[prev].focus()
      }
      break
    case KEY_CODE.right:
      e.preventDefault()
      if (next) {
        inputs.value[next].focus()
      }
      break
    default:
      break
  }
}

const triggerChange = (values = values.value) => {
  const val = values.join('')
  emit('update:modelValue', val)
  if (val.length >= fields.value) {
    emit('complete', val)
  }
}

initVals()

watch(
  () => props.step,
  (newValue) => {
    if (newValue === 2) {
      document.getElementById(`verification-input-${randomNumber}`).autofocus
    }
  },
  { immediate: true },
)

onBeforeUpdate(() => {
  inputs.value = []
})

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      if (inputs.value && inputs.value[1]) {
        inputs.value[1]?.focus()
      }
    }, 500)
  })
})

const pasteDigits = (e) => {
  e.preventDefault()
  const pastedData = e.clipboardData.getData('text')

  if (/^\d{6}$/.test(pastedData)) {
    for (let i = 0; i < fields.value; i++) {
      values.value[i] = pastedData[i]
    }

    triggerChange(values.value)
  }
}
</script>
