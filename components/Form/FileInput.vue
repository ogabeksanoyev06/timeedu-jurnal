<template>
  <div class="relative" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @dragenter.prevent="handleDragEnter" @dragleave.prevent="handleDragLeave">
    <div
      class="flex items-center cursor-pointer gap-2 border border-dashed border-primary bg-white rounded-lg py-6 px-6 relative"
      :class="[
        {
          '!border-red-500': error,
          '!border-dashed': dragging,
          '!border-dashed': dashed,
        },
      ]"
      @click="getFile"
    >
      
      <div class="flex-center-between flex-1 gap-2">
        <div
          class="font-medium text-primary leading-130 text-sm transition-300 flex flex-col items-center justify-center mx-auto gap-2"
          :class="{
            '!text-red': dragging,
          }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15.5V12M12 12V8.5M12 12H15.5M12 12H8.5M18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364Z"
              stroke="#8959C6"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Fayl biriktiring
        </div>
        <!-- <button v-if="modelValue" type="button" class="duration-200 transition-all group w-5 h-5 flex items-center justify-center rounded cursor-pointer border border-transparent hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path
              d="M4.16667 5.5L4.16667 12.1667C4.16667 12.9407 4.16667 13.3277 4.20944 13.6526C4.50483 15.8963 6.27037 17.6618 8.51404 17.9572C8.83895 18 9.22597 18 10 18V18C10.774 18 11.1611 18 11.486 17.9572C13.7296 17.6618 15.4952 15.8963 15.7906 13.6526C15.8333 13.3277 15.8333 12.9407 15.8333 12.1667L15.8333 5.5M4.16667 5.5H2.5M4.16667 5.5H7.5M15.8333 5.5H17.5M15.8333 5.5H12.5M7.5 5.5V5.5C7.5 5.03534 7.5 4.80302 7.53843 4.60982C7.69624 3.81644 8.31644 3.19624 9.10982 3.03843C9.30302 3 9.53535 3 10 3V3C10.4647 3 10.697 3 10.8902 3.03843C11.6836 3.19624 12.3038 3.81644 12.4616 4.60982C12.5 4.80302 12.5 5.03534 12.5 5.5V5.5M7.5 5.5L12.5 5.5M7.91667 8.41667L7.91667 14.25M12.0833 8.41667L12.0833 14.25"
              stroke="#EB5757"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button> -->
      </div>
    </div>
    <input id="media" ref="mediaInput" :accept="accept" class="w-0 h-0 absolute opacity-0" :multiple="multiple" name="file" type="file" @change="handleFile" @click="$event.target.value = ''" />
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'

const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: [Object, String, File],
  accept: {
    type: String,
    default: 'image/*, pdf/*',
  },
  error: Boolean,
  dashed: Boolean,
  multiple: Boolean,
  maxSize: {
    type: Number,
    default: 1024 * 1024 * 10,
  },
})

const emit = defineEmits(['update:modelValue', 'error', 'fileUpload'])

const isMaxSize = ref(false)
const mediaInput = ref(null)
const btnClearer = ref(false)
const media = reactive({
  media: '',
  file: null,
})
const currentTarget = ref(null)
const dragging = ref(false)

const handleFile = async (event) => {
  const target = event?.target
  if (target?.files === null) {
    return
  }
  if (target?.files) {
    handleUploader(target)
  }
}

const handleUploader = (target) => {
  const file = target.files?.[0]
  if (file?.size > props.maxSize) {
    isMaxSize.value = true
    emit('error', true)
    return
  }
  emit('error', false)
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(target?.files[0])
    reader.onerror = (error) => reject(error)
  })
    .then(() => {
      media.media = file?.name
      media.file = file
      emit('update:modelValue', file)
      emit('fileUpload', file)
    })
    .catch((err) => {
      console.log(err)
    })
}

const getFile = () => {
  mediaInput?.value?.click()
}

const clearForm = () => {
  media.file = null
  media.media = ''
  emit('update:modelValue', '')
}

const btnHandler = () => {
  if (media.media && media.file) {
    clearForm()
  } else if (media.media && !media.file) {
    clearForm()
  } else {
    getFile()
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
}

const handleDragEnter = (e) => {
  dragging.value = true
  currentTarget.value = e?.target
}

const handleDragLeave = (e) => {
  if (e?.target === currentTarget.value) {
    currentTarget.value = null
    dragging.value = false
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  dragging.value = false
  const files = event.dataTransfer?.items
  if (files) {
    handleUploader(event.dataTransfer)
  }
}

watch(
  () => media.media,
  (val) => {
    if (media.media && media.file) {
      btnClearer.value = true
    } else if (media.media && !media.file) {
      btnClearer.value = true
      emit('update:modelValue', media.media)
    } else {
      btnClearer.value = false
    }
    if (!val) {
      clearForm()
    }
  },
)

onMounted(() => {
  if (typeof props.modelValue === 'object') {
    media.media = props.modelValue?.name
    media.file = props.modelValue
  } else {
    media.media = props.modelValue
  }
})
</script>
