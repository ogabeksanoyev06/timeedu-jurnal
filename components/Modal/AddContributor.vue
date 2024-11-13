<script setup>
defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const roleList = [
  {
    name: 'Muallif',
    id: 'AUTHOR',
  },
  {
    name: 'Tahrirchi',
    id: 'Editor',
  },
]

const form = reactive({
  email: '',
  name: '',
  role: '',
})

const handleSubmitForm = () => {}
</script>

<template>
  <UIModal title="Ishtirokchi qo'shish" :model-value @update:model-value="emit('update:modelValue', $event)" body-class="lg:!max-w-[480px]">
    <div class="pt-4 p-5">
      <VForm @submit="handleSubmitForm" v-slot="{ errors }">
        <div class="grid gap-4">
          <VField name="name" rules="required" v-model="form.name">
            <FormGroup label="Foydalanuvchi ismi" for-id="name">
              <FormInput placeholder="Foydalanuvchi ismi" id="prefiks" v-model="form.name" :error="errors.name" />
            </FormGroup>
          </VField>
          <VField name="email" rules="required|email" v-model="form.email">
            <FormGroup label="Elektron pochtangizni kiriting" for-id="email">
              <FormInput id="email" v-model="form.email" placeholder="Elektron pochtangizni kiriting" type="email" :error="errors.email" />
            </FormGroup>
          </VField>
          <VField name="role" rules="required" v-model="form.role">
            <FormGroup label="Foydalanuvchi roli" for-id="role">
              <FormSelect :options="roleList" label-key="name" value-key="id" placeholder="Foydalanuvchi rolini tanlang" id="role" v-model="form.role" :error="errors.role" />
            </FormGroup>
          </VField>
          <UIButton type="submit" class="w-full mt-4" text="Qo'shish" />
        </div>
      </VForm>
    </div>
  </UIModal>
</template>
