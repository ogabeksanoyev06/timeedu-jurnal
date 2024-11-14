<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const props = defineProps({
  modelValue: Boolean,
  userId: {
    type: [Number, String],
    required: true,
  },
})

const cookieId = useCookie('id')

const emit = defineEmits(['update:modelValue', 'create-collaborator'])

const journalStore = useJournalStore()

const { deleteCollaborator, getArticlesView } = journalStore

const { loading } = storeToRefs(journalStore)

const { showToast } = useCustomToast()

const handleSubmitForm = async () => {
  try {
    const res = await deleteCollaborator(props.userId)
    console.log(res)
    await getArticlesView(cookieId.value, 3)
    emit('update:modelValue', false)
    showToast('Muvaffaqiyatli', 'success')
  } catch (error) {
    console.log(error)
  }
}

const handleCloseModal = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <UIModal title="Malumotni ochirishni xohlaysizmi" :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5 flex justify-end gap-4">
      <UIButton class="" text="Yoq" wrapper-class="!bg-red-500" @click="handleCloseModal" />
      <UIButton :loading="loading" class="" text="Ha" @click="handleSubmitForm" />
    </div>
  </UIModal>
</template>
