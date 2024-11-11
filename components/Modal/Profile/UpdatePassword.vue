<script setup>
defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const step = ref(1)
const loading = ref(false)

const showConfirmPassword = ref(false)
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  otp: '',
})

const submit = () => {
  if (step.value === 1) {
    sendCode()
  } else {
    verifyCode()
  }
}

function sendCode() {
  step.value = 2
}

function verifyCode() {}

const timer = ref(true)

function timeout() {
  timer.value = false
}
</script>

<template>
  <UIModal title="Parolni o'zgartirish" :model-value @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5">
      <Transition name="fade" mode="out-in">
        <VForm @submit="updatePassword" v-slot="{ errors }" v-if="step === 1">
          <div class="flex flex-col gap-4">
            <VField name="email" rules="required|email" v-model="form.email">
              <FormGroup label="Elektron pochtangizni kiriting" for-id="email">
                <FormInput id="email" v-model="form.email" placeholder="Elektron pochtangizni kiriting" type="email" />
              </FormGroup>
            </VField>
          </div>
        </VForm>
        <div v-else>
          <p class="text-sm leading-5 text-gray-300 mb-3 whitespace-pre-line">SMS-dan tasdiqlash kodini kiriting. Tasdiqlash kodi emailga yuborildi</p>
          <button class="text-sm leading-130 text-dark font-medium px-2 py-1 rounded-lg border border-transparent bg-gray-1 flex items-center gap-1.5 transition-300 hover:border-yellow group" @click="step = 1">
            {{ form.email }}
            <span class="icon-edit text-lg leading-6 text-dark transition-300 hover:text-primary" />
          </button>
          <FormOtp v-model="form.otp" class="my-5" />
          <FormTimer :key="timer" :timer :seconds-val="120" @timeout="timeout" @resend="sendCode" />
        </div>
      </Transition>
      <UIButton class="w-full mt-5 !border-none" :text="step === 1 ? 'Davom etish' : 'Tasdiqlash'" :disabled="step === 2 && !form.otp" :loading @click="submit" />
    </div>
  </UIModal>
</template>
