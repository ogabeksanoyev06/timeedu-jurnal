<template>
  <div>
    <NuxtLink :to="localePath('/')" class="header-left flex flex-col gap-1 mx-auto max-w-[150px] transition-300 mb-6">
      <img src="/assets/svg/logo-dark.svg" class="w-full flex-shrink-0" alt="timeedu.uz" />
    </NuxtLink>
    <div class="flex-center-between gap-2 mb-10">
      <h3 class="section-title">{{ translations['profile.login'] }}</h3>
      <button class="text-primary" @click="isModal = true">{{ translations['profile.change-password'] }}</button>
    </div>
    <VForm @submit="loginToSystem" v-slot="{ errors }">
      <div class="grid gap-10">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-6">
            <VField name="email" rules="required|email" v-model="form.email">
              <FormGroup :label="translations['profile.email']" for-id="email">
                <FormInput :placeholder="translations['profile.email']" id="email" type="email" v-model="form.email" :error="errors.email" />
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <VField name="password" rules="required" v-model="form.password">
              <FormGroup :label="translations['profile.password']" for-id="password">
                <FormInput suffix :placeholder="translations['profile.password']" id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password" :error="errors.password">
                  <template #suffix>
                    <span :class="['icon', showPassword ? 'icon-eye' : 'icon-eye-off']" @click="showPassword = !showPassword"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
        </div>
        <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
          <UIButton @click="$router.push(localePath('/auth/register'))" :text="translations['profile.register']" variant="outline" wrapper-class="sm:max-w-[167px] w-full" />
          <UIButton :loading type="submit" :text="translations['profile.login']" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
    <ModalProfileUpdatePassword v-model="isModal" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useProfileStore } from '@/stores/profile.js'
import { useCommonStore } from '@/stores/common.js'

definePageMeta({
  layout: 'auth',
})

const localePath = useLocalePath()
const router = useRouter()

const { showToast } = useCustomToast()

const authStore = useAuthStore()
const profileStore = useProfileStore()
const commonStore = useCommonStore()

const { login } = authStore
const { getProfile } = profileStore
const { loading, accessTokenCookie, refreshTokenCookie } = storeToRefs(authStore)
const { translations } = storeToRefs(commonStore)

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)

const isModal = ref(false)

const loginToSystem = async () => {
  loading.value = true
  try {
    const response = await login(form)
    accessTokenCookie.value = response.accessToken
    refreshTokenCookie.value = response.refreshToken
    router.push(localePath('/'))
    showToast(translations.value['alert.login'], 'success')
  } catch (error) {
    console.log(error)
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
