<script setup>
import { useJournalStore } from '@/stores/journals.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { useCommonStore } from '@/stores/common.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: [Number, String],
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'create-collaborator'])

const journalStore = useJournalStore()
const commonStore = useCommonStore()

const { updateCollaborator, getArticlesView, collaboratorId } = journalStore

const { loading } = storeToRefs(journalStore)
const { translations } = storeToRefs(commonStore)

const { showToast } = useCustomToast()

const cookieId = useCookie('id')

const roleList = [
  { name: 'Muallif', id: 'AUTHOR' },
  { name: 'Tahrirchi', id: 'TRANSLATOR' },
]

const form = reactive({
  email: '',
  name: '',
  role: '',
})

watch(
  () => props.modelValue,
  async (newValue) => {
    if (newValue) {
      const res = await collaboratorId(props.userId)
      form.name = res.name || ''
      form.email = res.email || ''
      form.role = res.role || ''
    }
  },
  { immediate: true },
)

const handleSubmitForm = async () => {
  try {
    const res = await updateCollaborator(props.userId, {
      name: form.name,
      email: form.email,
      role: form.role,
    })
    await getArticlesView(cookieId.value, 3)
    emit('update:modelValue', false)
    showToast('Muvaffaqiyatli', 'success')
    form.name = ''
    form.email = ''
    form.role = ''
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <UIModal :title="translations['profile.add-people']" :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }">
        <div class="grid gap-4">
          <VField name="name" rules="required" v-model="form.name">
            <FormGroup :label="translations['profile.name']" for-id="name">
              <FormInput :placeholder="translations['profile.name']" id="prefiks" v-model="form.name" :error="errors.name" />
            </FormGroup>
          </VField>
          <VField name="email" rules="required|email" v-model="form.email">
            <FormGroup :label="translations['profile.email']" for-id="email">
              <FormInput id="email" v-model="form.email" :placeholder="translations['profile.email']" type="email" :error="errors.email" />
            </FormGroup>
          </VField>
          <VField name="role" rules="required" v-model="form.role">
            <FormGroup :label="translations['profile.user-role']" for-id="role">
              <FormSelect :options="roleList" label-key="name" value-key="id" :placeholder="translations['profile.user-role']" id="role" v-model="form.role" :error="errors.role" />
            </FormGroup>
          </VField>
          <UIButton :loading="loading" type="submit" class="w-full mt-4" :text="translations['profile.save-button']" />
        </div>
      </VForm>
    </div>
  </UIModal>
</template>
