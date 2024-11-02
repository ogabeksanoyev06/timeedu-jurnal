<template>
  <div>
    <VueTelInput v-model="phone" v-bind="inputOptions" class="phone-input" :class="{ invalid: !valid, '!border-danger': invalidError || error }" @validate="handleValidatedPhone" />
  </div>
</template>

<script setup>
import '~/assets/vue-tel-input.css'
import { VueTelInput } from 'vue-tel-input'
import { ref, computed, watch, onMounted } from 'vue'

// Propsni aniqlaymiz
const props = defineProps({
  error: Boolean,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const valid = ref(false)
const invalidError = ref(false)
const phone = ref(props.modelValue)

// inputOptions ni computed funksiyasi orqali aniqlash
const inputOptions = computed(() => {
  return {
    defaultCountry: 'uz',
    mode: 'international',
    dropdownOptions: {
      disabledDialCode: true,
      showDialCodeInList: true,
      showFlags: true,
      showSearchBox: true,
    },
    validCharactersOnly: true,
    inputOptions: {
      showDialCode: true,
      placeholder: '__ ___ __ __',
    },
  }
})

// Telefon raqamni kuzatish va uni yangilash
watch(
  () => phone.value,
  (value) => {
    if (!invalidError.value && valid.value) {
      emit('update:modelValue', value)
    }
  },
)

// Telefonga oid ma'lumotlarni qayta ishlash funksiyasi
function handleValidatedPhone(options) {
  valid.value = !!options?.countryCode ?? false
  invalidError.value = !options.valid && !!options?.countryCode
  if (!options.valid) {
    emit('update:modelValue', '')
  }
}

// Komponent yuklanganda boshlang'ich qiymatni belgilash
onMounted(() => {
  if (props.modelValue) {
    phone.value = props.modelValue
  }
})

// props.modelValue ni kuzatish va telefon raqamni formatlash
watch(
  () => props.modelValue,
  (value) => {
    if (value !== phone.value) {
      phone.value = formatPhoneNumber(value.slice(3)) // value dan davlat kodini olib tashlaymiz
    }
  },
)
</script>

<style>
.phone-input {
  @apply rounded-lg bg-gray-1 border border-transparent focus-within:border-blue transition-all duration-300 focus-within:bg-transparent;
}

.phone-input .vti__dropdown {
  @apply transition-all duration-300 rounded-lg;
}

.phone-input input {
  @apply p-3 rounded-lg  w-full text-base sm:text-sm leading-5 text-dark font-medium bg-transparent outline-none placeholder:text-gray-200;
}

/* .phone-input .vti__dropdown .vti__dropdown-arrow {
  @apply;
} */
</style>
