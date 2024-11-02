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
              <VField name="organization" rules="required" v-model="form.organization">
                <FormGroup label="Tashkilotingiz" for-id="organization">
                  <FormInput placeholder="Tashkilotingizni kiriting" id="organization" v-model="form.organization" :error="errors.organization" />
                </FormGroup>
              </VField>
            </div>
            <div class="col-span-12 sm:col-span-6">
              <VField name="country" rules="required" v-model="form.country">
                <FormGroup label="Mamlakatingiz" for-id="country">
                  <FormSelect :options="selectData" label-key="title" value-key="id" placeholder="Mamlakatingizni tanlang" id="country" v-model="form.country" :error="errors.country" />
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
              <VField name="confirmPassword" rules="required|confirmed:@password" v-model="form.confirmPassword">
                <FormGroup label="Parolni takrorlang" for-id="confirmPassword">
                  <FormInput suffix placeholder="Parolni takrorlang" id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword" :error="errors.confirmPassword">
                    <template #suffix>
                      <span :class="['icon', showConfirmPassword ? 'icon-eye' : 'icon-eye-off']" @click="showConfirmPassword = !showConfirmPassword"></span>
                    </template>
                  </FormInput>
                </FormGroup>
              </VField>
            </div>
          </div>
        </div>

        <div class="grid gap-6">
          <h3 class="text-xl font-medium text-secondary">Bu saytdagi qaysi jurnallarda ro'yxatdan o'tishni xohlaysiz?</h3>

          <div class="grid gap-6">
            <div class="grid gap-4">
              <h4 class="text-base font-medium text-dark">Iqtisodiy taraqqiyot va tahlil</h4>
              <VField name="journal1" rules="required|requiredArray" v-model="form.journal1">
                <FormCheckbox :checked="form.journal1.includes('reader')" label="Reader" value="reader" @update:model-value="updateJournal('journal1', $event, 'reader')" />
                <FormCheckbox :checked="form.journal1.includes('reviewer')" label="Reviewer" value="reviewer" @update:model-value="updateJournal('journal1', $event, 'reviewer')" />
                <FormCheckbox
                  :checked="form.journal1.includes('consent')"
                  label="Ha, men o'z ma'lumotimni ushbu jurnalning maxfiylik bayonnomasiga muvofiq yig'ish va saqlashga roziman."
                  value="consent"
                  @update:model-value="updateJournal('journal1', $event, 'consent')"
                />
              </VField>
            </div>
            <div class="grid gap-4">
              <h4 class="text-base font-medium text-dark">Ilgʻor iqtisodiyot va pedagogik texnologiyalar</h4>
              <VField name="journal2" rules="required|requiredArray" v-model="form.journal2">
                <FormCheckbox :checked="form.journal2.includes('reader')" label="Reader" value="reader" @update:model-value="updateJournal('journal2', $event, 'reader')" />
                <FormCheckbox :checked="form.journal2.includes('reviewer')" label="Reviewer" value="reviewer" @update:model-value="updateJournal('journal2', $event, 'reviewer')" />
                <FormCheckbox
                  :checked="form.journal2.includes('consent')"
                  label="Ha, men o'z ma'lumotimni ushbu jurnalning maxfiylik bayonnomasiga muvofiq yig'ish va saqlashga roziman."
                  value="consent"
                  @update:model-value="updateJournal('journal2', $event, 'consent')"
                />
              </VField>
            </div>
            <div class="grid gap-4">
              <h4 class="text-base font-medium text-dark">Nashrlar</h4>
              <VField name="journal3" rules="required|requiredArray" v-model="form.journal3">
                <FormCheckbox :checked="form.journal3.includes('reader')" label="Reader" value="reader" @update:model-value="updateJournal('journal3', $event, 'reader')" />
                <FormCheckbox :checked="form.journal3.includes('reviewer')" label="Reviewer" value="reviewer" @update:model-value="updateJournal('journal3', $event, 'reviewer')" />
                <FormCheckbox
                  :checked="form.journal3.includes('consent')"
                  label="Ha, men o'z ma'lumotimni ushbu jurnalning maxfiylik bayonnomasiga muvofiq yig'ish va saqlashga roziman."
                  value="consent"
                  @update:model-value="updateJournal('journal3', $event, 'consent')"
                />
              </VField>
            </div>
          </div>
          <div class="grid gap-2">
            <VField name="interests">
              <FormGroup label="Qiziqishingiz" for-id="interests">
                <FormTextarea placeholder="Qiziqishingizni yozing..." id="interests" rows="6" v-model="form.interests" />
              </FormGroup>
            </VField>
            <p class="text-sm text-neutral">Agar siz biron bir jurnalda sharhlovchi bo'lishni so'rasangiz, iltimos, o'z qiziqishlaringizni kiriting.</p>
          </div>
        </div>

        <div class="w-full flex max-sm:flex-col sm:justify-end gap-3">
          <UIButton type="button" text="Bekor qilish" variant="outline" wrapper-class="sm:max-w-[167px] w-full" />
          <UIButton type="submit" text="Ro'yhatdan o'tish" wrapper-class="sm:max-w-[167px] w-full" />
        </div>
      </div>
    </VForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

definePageMeta({
  layout: 'auth',
})

const form = reactive({
  firstName: '',
  lastName: '',
  organization: '',
  country: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  journal1: [],
  journal2: [],
  journal3: [],
  interests: '',
})

const showConfirmPassword = ref(false)
const showPassword = ref(false)

const selectData = [
  { id: 'UZ', title: 'O‘zbekiston' },
  { id: 'RU', title: 'Rossiya' },
  { id: 'USA', title: 'AQSh' },
]

const updateJournal = (journal, value, id) => {
  if (value) {
    form[journal].push(id)
  } else {
    form[journal] = form[journal].filter((item) => item !== id)
  }
}

const registerToSystem = () => {
  // Foydalanuvchini ro'yhatga olish funktsiyasi
  console.log(form.value)
}
</script>
