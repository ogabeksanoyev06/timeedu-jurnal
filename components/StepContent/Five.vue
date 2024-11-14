<template>
  <div class="border rounded-lg p-6 grid gap-4">
    <h3 class="text-base font-medium">Yuborish tugallandi</h3>
    <p>"Iqtisodiy rivojlanish va tahlil"da nashr etishga qiziqishingiz uchun tashakkur.</p>
    <div class="w-full h-[1px] bg-gray-4"></div>
    <h3 class="text-base font-medium">Keyin nima qiladi?</h3>
    <p>Jurnal sizning materialingizni yuborganingiz to'g'risida xabardor qilindi, yozuvni tasdiqlash sizga yuborildi elektron pochta. Muharrir sizning materialingizni ko'rib chiqqandan so'ng, biz siz bilan bog'lanamiz.</p>
    <p>Ayni paytda siz quyidagilarni qilishingiz mumkin:</p>
    <nav class="flex flex-col gap-2">
      <NuxtLink to="/" class="flex items-center gap-3 text-primary underline">
        <span class="w-1 h-1 bg-primary rounded-full"></span>
        Ushbu tarkibni ko'ring
      </NuxtLink>
      <NuxtLink to="/" class="flex items-center gap-3 text-primary underline">
        <span class="w-1 h-1 bg-primary rounded-full"></span>
        Taqdim etish uchun yangi material yarating
      </NuxtLink>
      <NuxtLink :to="localePath('/profile')" class="flex items-center gap-3 text-primary underline">
        <span class="w-1 h-1 bg-primary rounded-full"></span>
        Shaxsiy hisobingizga qayting
      </NuxtLink>
    </nav>
    <div class="flex items-center justify-end sm:flex-row flex-col gap-3 mt-10">
      <UIButton text="Yakunlash" @click="handleComplete" />
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()

const cookieId = useCookie('id')
const cookieStep = useCookie('step')

const handleComplete = () => {
  cookieId.value = null
  cookieStep.value = null
  navigateTo(localePath('/'))
}
</script>
