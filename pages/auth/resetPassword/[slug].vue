<template>
  <div>
    <div class="flex-center-between gap-2 mb-10">
      <h3 class="section-title">Parolni o'zgartirish</h3>
    </div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-10">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-6">
            <VField name="newPassword" rules="required" v-model="form.newPassword">
              <FormGroup label="Parol" for-id="newPassword">
                <FormInput suffix placeholder="Parol" id="newPassword" :type="showPassword ? 'text' : 'password'" v-model="form.newPassword" :error="errors.newPassword">
                  <template #suffix>
                    <span :class="['icon', showPassword ? 'icon-eye' : 'icon-eye-off']" @click="showPassword = !showPassword"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <VField name="newPasswordConfirm" rules="required|confirmed:@newPassword" v-model="form.newPasswordConfirm">
              <FormGroup label="Parolni takrorlang" for-id="newPasswordConfirm">
                <FormInput suffix placeholder="Parolni takrorlang" id="newPasswordConfirm" :type="showConfirmPassword ? 'text' : 'password'" v-model="form.newPasswordConfirm" :error="errors.newPasswordConfirm">
                  <template #suffix>
                    <span :class="['icon', showConfirmPassword ? 'icon-eye' : 'icon-eye-off']" @click="showConfirmPassword = !showConfirmPassword"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
        </div>
        <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
          <UIButton text="Bekor qilish" variant="outline" wrapper-class="sm:max-w-[167px] w-full" />
          <UIButton :loading type="submit" text="Davom etish" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
    <ModalProfileUpdatePassword v-model="isModal" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
})

const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const { showToast } = useCustomToast()

const authStore = useAuthStore()

const { changePassword } = authStore
const { loading } = storeToRefs(authStore)

const showConfirmPassword = ref(false)
const showPassword = ref(false)

const form = reactive({
  newPassword: '',
  newPasswordConfirm: '',
})

const isModal = ref(false)

const handleSubmitForm = async () => {
  loading.value = true
  try {
    const response = await changePassword(route.params.slug, form)
    if (response.message === 'success') {
      router.push(localePath('/auth/login'))
      showToast('Parol muvaffaqiyatli o`zgardi', 'success')
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessages = error.response.data.error
      Object.values(errorMessages).forEach((message) => {
        showToast(message, 'error')
      })
    }
  } finally {
    loading.value = false
  }
}
</script>
