<template>
  <div class="max-w-[580px] mx-auto flex items-center flex-col justify-center">
    <p class="mb-8 text-lg leading-140 text-center">
      {{ translations['profile.confirm-email'] }}
    </p>
    <!-- c703d2b7-135a-42df-96d9-44e3530a4d2f -->
    <VForm @submit="handleSubmitForm" v-slot="{ errors }" class="w-full">
      <div class="grid gap-6">
        <VField name="email" rules="required|email" v-model="form.email">
          <FormGroup :label="translations['profile.email']" for-id="email">
            <FormInput :placeholder="translations['profile.email']" id="email" type="email" v-model="form.email" :error="errors.email" />
          </FormGroup>
        </VField>
        <VField name="password" rules="required" v-model="form.password">
          <FormGroup :label="translations['profile.password']" for-id="password">
            <FormInput suffix :placeholder="translations['profile.password']" id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password" :error="errors.password">
              <template #suffix>
                <span :class="['icon', showPassword ? 'icon-eye' : 'icon-eye-off']" @click="showPassword = !showPassword"></span>
              </template>
            </FormInput>
          </FormGroup>
        </VField>
        <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
          <UIButton :loading type="submit" text="Emailni tasdiqlash" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common.js'
import { useAuthStore } from '@/stores/auth.js'

definePageMeta({
  layout: 'auth',
  middleware: [],
})

const commonStore = useCommonStore()

const { translations } = storeToRefs(commonStore)

const accessTokenCookie = useCookie('access_token')
const refreshTokenCookie = useCookie('refresh_token')

const localePath = useLocalePath()
const { showToast } = useCustomToast()

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const { confirmEmail } = authStore
const { loading } = storeToRefs(authStore)

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)

const handleSubmitForm = async () => {
  loading.value = true
  try {
    const response = await confirmEmail(route.params.slug, form)
    accessTokenCookie.value = response.accessToken
    refreshTokenCookie.value = response.refreshToken
    router.push(localePath('/'))
    showToast(translations.value['alert.login'], 'success')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessages = error.response.data.error
      Object.values(errorMessages).forEach((message) => {
        showToast(message, 'error')
      })
    }
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
