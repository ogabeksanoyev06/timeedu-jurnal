<template>
  <div>
    <h3 class="section-title mb-10">Ro'yhatdan o'tish</h3>
    <VForm @submit="registerToSystem" v-slot="{ errors }">
      <div class="grid gap-10">
        <div class="grid gap-6">
          <h3 class="text-xl font-medium text-secondary">Profilingiz ma'lumotlari</h3>

          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-6">
              <VField name="firstName" rules="required" v-model="form.firstName">
                <FormGroup label="Ismingiz" for-id="firstName">
                  <FormInput placeholder="Ismingizni kiriting" id="firstName" v-model="form.firstName" :error="errors.firstName" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="lastName" rules="required" v-model="form.lastName">
                <FormGroup label="Familyangiz" for-id="lastName">
                  <FormInput placeholder="Familyangizni kiriting" id="lastName" v-model="form.lastName" :error="errors.lastName" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="companyName" rules="required" v-model="form.companyName">
                <FormGroup label="Tashkilotingiz" for-id="companyName">
                  <FormInput placeholder="Tashkilotingizni kiriting" id="companyName" v-model="form.companyName" :error="errors.companyName" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="countryId" rules="required" v-model="form.countryId">
                <FormGroup label="Mamlakatingiz" for-id="countryId">
                  <FormSelect :options="countries?.content" label-key="name" value-key="id" placeholder="Mamlakatingizni tanlang" id="countryId" v-model="form.countryId" :error="errors.countryId" />
                </FormGroup>
              </VField>
            </div>
          </div>
        </div>

        <div class="grid gap-6">
          <h3 class="text-xl font-medium text-secondary">Kirish uchun ma'lumotlari</h3>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-6">
              <VField name="phone" rules="required|phone" v-model="form.phone">
                <FormGroup label="Telefon raqamingiz" for-id="phone">
                  <FormInput prefix placeholder="Telefon raqamingizni kiriting" id="phone" v-model="form.phone" :error="errors.phone" v-maska="'#########'">
                    <template #prefix>+998</template>
                  </FormInput>
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="email" rules="required|email" v-model="form.email">
                <FormGroup label="Elektron pochtangiz" for-id="email">
                  <FormInput placeholder="E-pochtangizni kiriting" id="email" type="email" v-model="form.email" :error="errors.email" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="password" rules="required" v-model="form.password">
                <FormGroup label="Parol" for-id="password">
                  <FormInput suffix placeholder="Parol" id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password" :error="errors.password">
                    <template #suffix>
                      <span :class="['icon', showPassword ? 'icon-eye' : 'icon-eye-off']" @click="showPassword = !showPassword"></span>
                    </template>
                  </FormInput>
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="passwordConfirm" rules="required|confirmed:@password" v-model="form.passwordConfirm">
                <FormGroup label="Parolni takrorlang" for-id="passwordConfirm">
                  <FormInput suffix placeholder="Parolni takrorlang" id="passwordConfirm" :type="showConfirmPassword ? 'text' : 'password'" v-model="form.passwordConfirm" :error="errors.passwordConfirm">
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
          <UIButton type="button" text="Bekor qilish" variant="outline" wrapper-class="sm:max-w-[167px] w-full" />
          <UIButton :loading type="submit" text="Ro'yhatdan o'tish" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useCountriesStore } from '@/stores/countries.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

definePageMeta({
  layout: 'auth',
})
const localePath = useLocalePath()
const router = useRouter()

const { showToast } = useCustomToast()

const authStore = useAuthStore()
const countriesStore = useCountriesStore()

const { register } = authStore
const { loading } = storeToRefs(authStore)
const { countries } = storeToRefs(countriesStore)

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
    console.log(response)
    // accessTokenCookie.value = response.accessToken
    // refreshTokenCookie.value = response.refreshToken
    // router.push(localePath('/auth/login'))
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
