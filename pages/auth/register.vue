<template>
  <div>
    <NuxtLink :to="localePath('/')" class="header-left flex flex-col gap-1 mx-auto max-w-[150px] transition-300 mb-6">
      <img src="/assets/svg/logo-dark.svg" class="w-full flex-shrink-0" alt="timeedu.uz" />
    </NuxtLink>
    <h3 class="section-title mb-10">{{ translations['profile.register'] }}</h3>
    <VForm @submit="registerToSystem" v-slot="{ errors }">
      <div class="grid gap-10">
        <div class="grid gap-6">
          <h3 class="text-xl font-medium text-secondary">{{ translations['profile.profile-information'] }}</h3>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-6">
              <VField name="firstName" rules="required" v-model="form.firstName">
                <FormGroup :label="translations['profile.name']" for-id="firstName">
                  <FormInput :placeholder="translations['profile.name']" id="firstName" v-model="form.firstName" :error="errors.firstName" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="lastName" rules="required" v-model="form.lastName">
                <FormGroup :label="translations['profile.surname']" for-id="lastName">
                  <FormInput :placeholder="translations['profile.surname']" id="lastName" v-model="form.lastName" :error="errors.lastName" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="companyName" rules="required" v-model="form.companyName">
                <FormGroup :label="translations['profile.company-name']" for-id="companyName">
                  <FormInput :placeholder="translations['profile.company-name']" id="companyName" v-model="form.companyName" :error="errors.companyName" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="countryId" rules="required" v-model="form.countryId">
                <FormGroup :label="translations['profile.state']" for-id="countryId">
                  <FormSelect :options="countries?.content" label-key="name" value-key="id" :placeholder="translations['profile.state']" id="countryId" v-model="form.countryId" :error="errors.countryId" />
                </FormGroup>
              </VField>
            </div>
          </div>
        </div>
        <div class="grid gap-6">
          <h3 class="text-xl font-medium text-secondary">{{ translations['profile.login-information'] }}</h3>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-6">
              <VField name="phone" rules="required|phone" v-model="form.phone">
                <FormGroup :label="translations['profile.phone']" for-id="phone">
                  <FormInput prefix :placeholder="translations['profile.phone']" id="phone" v-model="form.phone" :error="errors.phone" v-maska="'#########'">
                    <template #prefix>+998</template>
                  </FormInput>
                </FormGroup>
              </VField>
            </div>
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
            <div class="col-span-12 sm:col-span-6">
              <VField name="passwordConfirm" rules="required|confirmed:@password" v-model="form.passwordConfirm">
                <FormGroup :label="translations['profile.repeat-pass']" for-id="passwordConfirm">
                  <FormInput suffix :placeholder="translations['profile.repeat-pass']" id="passwordConfirm" :type="showConfirmPassword ? 'text' : 'password'" v-model="form.passwordConfirm" :error="errors.passwordConfirm">
                    <template #suffix>
                      <span :class="['icon', showConfirmPassword ? 'icon-eye' : 'icon-eye-off']" @click="showConfirmPassword = !showConfirmPassword"></span>
                    </template>
                  </FormInput>
                </FormGroup>
              </VField>
            </div>
          </div>
        </div>
        <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
          <UIButton @click="$router.push(localePath('/auth/login'))" type="button" :text="translations['profile.login']" variant="outline" wrapper-class="sm:max-w-[167px] w-full" />
          <UIButton :loading type="submit" :text="translations['profile.register']" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
    <ModalRegisterInfo v-model="isModal" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useCountriesStore } from '@/stores/countries.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { useCommonStore } from '@/stores/common.js'

definePageMeta({
  layout: 'auth',
})
const localePath = useLocalePath()
const router = useRouter()

const isModal = ref(false)

const { showToast } = useCustomToast()

const authStore = useAuthStore()
const countriesStore = useCountriesStore()
const commonStore = useCommonStore()

const { register } = authStore
const { loading } = storeToRefs(authStore)
const { countries } = storeToRefs(countriesStore)
const { translations } = storeToRefs(commonStore)

const form = reactive({
  firstName: '',
  lastName: '',
  companyName: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirm: '',
  countryId: '',
  interests: '',
})

const showConfirmPassword = ref(false)
const showPassword = ref(false)

const status = ref(false)

const registerToSystem = async () => {
  loading.value = true
  try {
    const response = await register({
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.companyName,
      phone: '+998' + form.phone,
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
      countryId: form.countryId,
      interests: form.interests,
    })
    isModal.value = true
    showToast('Pochtangizga tasdiqlash so`rovi yuborildi', 'success')
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessages = error.response.data.error
      Object.values(errorMessages).forEach((message) => {
        showToast(message, 'error')
      })
    } else {
      showToast('Anqlanmgan xatolik', 'error')
    }
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
