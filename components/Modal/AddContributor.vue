<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const journalStore = useJournalStore()

const { createCollaborator, getArticlesView } = journalStore

const { loading } = storeToRefs(journalStore)

const { showToast } = useCustomToast()

const cookieId = useCookie('id')

const roleList = [
  {
    name: 'Muallif',
    id: 'AUTHOR',
  },
  {
    name: 'Tahrirchi',
    id: 'TRANSLATOR',
  },
]

const form = reactive({
  email: '',
  name: '',
  role: '',
})

const handleSubmitForm = async () => {
  try {
    const res = await createCollaborator({
      articleId: cookieId.value,
      name: form.name,
      email: form.email,
      role: form.role,
    })
    showToast('Muvaffaqiyatli', 'success')
    form.name = ''
    form.email = ''
    form.role = ''
    form.articleId = null
    await getArticlesView(cookieId.value, 3)
    emit('update:modelValue', false)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <UIModal title="Ishtirokchi qo'shish" :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }">
        <div class="grid gap-4">
          <VField name="name" rules="required" v-model="form.name">
            <FormGroup label="Foydalanuvchi ismi" for-id="name">
              <FormInput placeholder="Foydalanuvchi ismi" id="prefiks" v-model="form.name" :error="errors.name" />
            </FormGroup>
          </VField>
          <VField name="email" rules="required|email" v-model="form.email">
            <FormGroup label="Elektron pochtangizni kiriting" for-id="email">
              <FormInput id="email" v-model="form.email" placeholder="Elektron pochtangizni kiriting" type="email" :error="errors.email" />
            </FormGroup>
          </VField>
          <VField name="role" rules="required" v-model="form.role">
            <FormGroup label="Foydalanuvchi roli" for-id="role">
              <FormSelect :options="roleList" label-key="name" value-key="id" placeholder="Foydalanuvchi rolini tanlang" id="role" v-model="form.role" :error="errors.role" />
            </FormGroup>
          </VField>
          <UIButton :loading type="submit" class="w-full mt-4" text="Qo'shish" />
        </div>
      </VForm>
    </div>
  </UIModal>
</template>
