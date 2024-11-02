<template>
  <div>
    <DatePicker
      @open="handleOpen"
      @closed="handleClose"
      v-model="selectedDate"
      :locale="localeOptions"
      :format-locale="formatLocale"
      :format="dateFormat"
      cancel-text="Yopish"
      select-text="Tanlash"
      now-button-label="Hozirgi vaqt"
      week-num-name="Hafta"
      v-bind="{
        dateFormat,
        escClose,
        transitions,
        range,
        noToday,
        disabled,
        readonly,
        placeholder,
        name,
        hideNavigation,
        allowStopPropagation,
        closeOnScroll,
        modeHeight,
        allowPreventDefault,
        closeOnClearValue,
        closeOnAutoApply,
        noSwipe,
        keepActionRow,
        onClickOutside,
        tabOutClosesMenu,
        arrowLeft,
        keepViewOnOffsetClick,
        timeArrowHoldThreshold,
        shadowDom,
      }"
      :class="{ invalid: !valid, '!border-danger': invalidError || error }"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { uz, enUS, ru } from 'date-fns/locale'

const { locale } = useI18n()

const props = defineProps({
  error: Boolean,
  range: Boolean,
  noToday: Boolean,
  placeholder: String,
  name: String,
  hideNavigation: [String, Array],
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  modelValue: [String, Array],
  dateFormat: {
    type: String,
    default: 'MM/dd/yyyy HH:mm',
  },
  escClose: {
    type: Boolean,
    default: true,
  },
  transitions: {
    type: Object,
    default: () => ({}),
  },
  allowStopPropagation: {
    type: Boolean,
    default: true,
  },
  closeOnScroll: {
    type: Boolean,
    default: false,
  },
  modeHeight: {
    type: Number,
    default: 255,
  },
  allowPreventDefault: {
    type: Boolean,
    default: false,
  },
  closeOnClearValue: {
    type: Boolean,
    default: true,
  },
  closeOnAutoApply: {
    type: Boolean,
    default: true,
  },
  noSwipe: {
    type: Boolean,
    default: false,
  },
  keepActionRow: {
    type: Boolean,
    default: false,
  },
  onClickOutside: {
    type: Function,
    default: undefined,
  },
  tabOutClosesMenu: {
    type: Boolean,
    default: true,
  },
  arrowLeft: {
    type: Function,
    default: undefined,
  },
  keepViewOnOffsetClick: {
    type: Boolean,
    default: false,
  },
  timeArrowHoldThreshold: {
    type: Number,
    default: 0,
  },
  shadowDom: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const valid = ref(true)
const invalidError = ref(false)
const selectedDate = ref(props.modelValue)

const localeOptions = computed(() => {
  switch (locale.value) {
    case 'uz':
      return 'uz'
    case 'ru':
      return 'ru'
    case 'en':
      return 'enUS'
    default:
      return 'uz'
  }
})

const formatLocale = computed(() => {
  switch (locale.value) {
    case 'uz':
      return uz
    case 'ru':
      return ru
    case 'en':
      return enUS
    default:
      return uz
  }
})

watch(
  () => selectedDate.value,
  (value) => {
    if (!invalidError.value && valid.value) {
      emit('update:modelValue', value)
    }
  },
)

const handleClose = () => {
  document.body.style.overflow = 'auto'
}

const handleOpen = () => {
  document.body.style.overflow = 'hidden'
}

onMounted(() => {
  if (props.modelValue) {
    selectedDate.value = props.modelValue
  }
})
</script>

<style>
.dp__theme_light {
  --dp-primary-color: #f5c502;
  --dp-background-color: #f3f6fc;
  --dp-text-color: #011432;
  --dp-border-color: transparent;
  --dp-border-color-focus: #1976d2;
  --dp-border-color-hover: #f3f6fc;
  --dp-input-padding: 12px 30px 12px 12px;
  --dp-border-radius: 8px;
  --dp-cell-border-radius: 8px;
  --dp-font-size: 14px;
  --dp-font-family: 'Roboto', sans-serif;
  --dp-icon-color: #4b5970;
}

.dp__input {
  line-height: inherit;
  &::placeholder {
    color: #011432;
    opacity: 100;
  }
}

.input:focus {
  border-color: var(--dp-border-color-focus);
  --dp-background-color: #fff;
}
</style>
