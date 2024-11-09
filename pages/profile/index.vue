<template>
  <div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="grid gap-10">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 sm:col-span-6">
            <VField name="firstName" rules="required" v-model="form.firstName">
              <FormGroup label="Ism" for-id="firstName">
                <FormInput placeholder="Ism" id="firstName" v-model="form.firstName" :error="errors.firstName" />
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <VField name="lastName" rules="required" v-model="form.lastName">
              <FormGroup label="Familiya" for-id="lastName">
                <FormInput placeholder="Familiya" id="lastName" v-model="form.lastName" :error="errors.lastName" />
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <VField name="companyName" rules="required" v-model="form.companyName">
              <FormGroup label="Tashkilotingiz" for-id="companyName">
                <FormInput placeholder="Tashkilotingiz" id="companyName" v-model="form.companyName" :error="errors.companyName" />
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
                <FormInput disabled suffix placeholder="E-pochtangizni kiriting" id="email" type="email" v-model="form.email" :error="errors.email">
                  <template #suffix>
                    <span class="icon-edit text-xl leading-5" @click="isModal = true"></span>
                  </template>
                </FormInput>
              </FormGroup>
            </VField>
          </div>
          <div class="col-span-12">
            <VField name="interests" rules="required" v-model="form.interests">
              <FormGroup label="Ma'lumot" for-id="interests">
                <FormTextarea rows="6" suffix placeholder="Ma'lumot" id="interests" v-model="form.interests" :error="errors.interests" />
              </FormGroup>
            </VField>
          </div>
        </div>

        <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
          <UIButton :loading type="submit" text="Saqlash" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
    <ModalProfileEditEmail v-model="isModal" />
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { useCountriesStore } from '@/stores/countries.js'

definePageMeta({
  layout: 'profile',
})

const { showToast } = useCustomToast()
const profileStore = useProfileStore()
const countriesStore = useCountriesStore()

const { getProfile, updateProfile } = profileStore
const { user, loading } = storeToRefs(profileStore)
const { countries } = storeToRefs(countriesStore)

const form = reactive({
  firstName: '',
  lastName: '',
  companyName: '',
  phone: '',
  email: '',
  countryId: '',
  interests: '',
})

const selectData = [
  { id: 'UZ', title: 'O‘zbekiston' },
  { id: 'RU', title: 'Rossiya' },
  { id: 'USA', title: 'AQSh' },
]

const isModal = ref(false)

const populateForm = () => {
  form.firstName = user.value.firstName || ''
  form.lastName = user.value.lastName || ''
  form.companyName = user.value.companyName || ''
  form.phone = removePhonePrefix(user.value.phone) || ''
  form.email = user.value.email || ''
  form.countryId = user.value.countryId || ''
  form.interests = user.value.interests || ''
}

const handleSubmitForm = async () => {
  try {
    const res = await updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.companyName,
      phone: '+998' + form.phone,
      email: form.email,
      countryId: form.countryId,
      interests: form.interests,
    })
    await getProfile()
    populateForm()
    showToast('Profil muvaffaqiyatli yangilandi', 'success')
  } catch (error) {
    showToast(error || 'Profilni yangilashda xatolik yuz berdi', 'error')
  }
}
populateForm()
</script>
