<template>
  <div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-10">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-6">
            <VField name="password" rules="required" v-model="form.password">
              <FormGroup label="Hozirgi parol" for-id="password">
                <FormInput suffix placeholder="Hozirgi parol" id="password" :type="passwordField ? 'text' : 'password'" v-model="form.password" :error="errors.password">
                  <template #suffix>
                    <span :class="['icon', passwordField ? 'icon-eye' : 'icon-eye-off']" @click="passwordSee"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <VField name="newPassword" rules="required" v-model="form.newPassword">
              <FormGroup label="Yangi parol" for-id="newPassword">
                <FormInput suffix placeholder="Yangi parol" id="newPassword" :type="newPasswordField ? 'text' : 'password'" v-model="form.newPassword" :error="errors.newPassword">
                  <template #suffix>
                    <span :class="['icon', newPasswordField ? 'icon-eye' : 'icon-eye-off']" @click="newPasswordSee"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <VField name="newConfirmPassword" rules="required|confirmed:@newPassword" v-model="form.newConfirmPassword">
              <FormGroup label="Yangi parolni takrorlang" for-id="newConfirmPassword">
                <FormInput suffix placeholder="Yangi parolni takrorlang" id="newConfirmPassword" :type="newConfirmPasswordField ? 'text' : 'password'" v-model="form.newConfirmPassword" :error="errors.newConfirmPassword">
                  <template #suffix>
                    <span :class="['icon', newConfirmPasswordField ? 'icon-eye' : 'icon-eye-off']" @click="newConfirmPasswordSee"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
        </div>
        <div class="flex justify-end">
          <UIButton :loading text="Saqlash" type="submit" />
        </div>
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

definePageMeta({
  layout: 'profile',
})

const { showToast } = useCustomToast()

const profileStore = useProfileStore()

const { profileChangePassword } = profileStore
const { loading } = storeToRefs(profileStore)

const form = reactive({
  password: '',
  newPassword: '',
  newConfirmPassword: '',
})

const passwordField = ref(false)
const newPasswordField = ref(false)
const newConfirmPasswordField = ref(false)

const passwordSee = () => {
  passwordField.value = !passwordField.value
}

const newPasswordSee = () => {
  newPasswordField.value = !newPasswordField.value
}

const newConfirmPasswordSee = () => {
  newConfirmPasswordField.value = !newConfirmPasswordField.value
}

const handleSubmitForm = async () => {
  try {
    await profileChangePassword({
      password: form.password,
      newPassword: form.newPassword,
      newPasswordConfirm: form.newConfirmPassword,
    })
    showToast('Profile muvaffaqiyatli yangilandi', 'success')
    form.password = ''
    form.newPassword = ''
    form.newPasswordConfirm = ''
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessages = error.response.data.error
      Object.values(errorMessages).forEach((message) => {
        showToast(message, 'error')
      })
    } else {
      showToast('Anqlanmgan xatolik', 'error')
    }
  }
}
</script>
