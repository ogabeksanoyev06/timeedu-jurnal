<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useCommonStore } from '@/stores/common.js'

defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const { showToast } = useCustomToast()

const authStore = useAuthStore()
const commonStore = useCommonStore()

const { resetPassword } = authStore
const { loading } = storeToRefs(authStore)
const { translations } = storeToRefs(commonStore)

const form = reactive({
  email: '',
})

const handleSubmitForm = async () => {
  loading.value = true
  try {
    const response = await resetPassword(form)
    if (response.message === 'success') {
      showToast('Parol o`zgartirish uchum emailga xabar yuborildi', 'success')
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UIModal :title="translations['profile.change-password']" :model-value @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }" class="w-full">
        <div class="grid gap-6">
          <VField name="email" rules="required|email" v-model="form.email">
            <FormGroup :label="translations['profile.email']" for-id="email">
              <FormInput :placeholder="translations['profile.email']" id="email" type="email" v-model="form.email" :error="errors.email" />
            </FormGroup>
          </VField>

          <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
            <UIButton :loading type="submit" :text="translations['profile.continue']" wrapper-class="sm:max-w-[167px] w-full" />
          </div>
        </div>
      </VForm>
    </div>
  </UIModal>
</template>
