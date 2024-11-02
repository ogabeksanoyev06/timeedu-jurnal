<template>
  <div class="flex-y-center gap-3">
    <UIButton text="Kirish" wrapper-class="!bg-secondary border !border-accent-1" @click="$router.push(localePath('/auth/login'))" />
    <UIButton text="Ro‘yhatdan o‘tish" wrapper-class="!bg-[#EEE8F2] !text-secondary" @click="$router.push(localePath('/auth/register'))" />
  </div>
  <UIDropdown :show="showDropdown" :head-class="['flex items-center flex-shrink-0 gap-1 text-gray-5 cursor-pointer transition-300 ', {}]" body-class="!w-[220px]" @toggle="handleDropdownToggle">
    <template #head>
      <div class="w-9 h-9 rounded-full linear-border-image cursor-pointer">
        <img src="https://web.xolodilnikgo.uz/web/image/res.partner/4351/image_1024/" alt="user" class="w-full h-full object-cover rounded-full" />
      </div>
    </template>
    <template #body>
      <NuxtLink :to="localePath('/profile')" class="flex items-center gap-2 p-3 cursor-pointer transition-300 hover:bg-gray-1">
        <span class="icon-user text-xl leading-5"></span>
        <div class="flex items-center gap-2">Mening ma'lumotlarim</div>
      </NuxtLink>
      <hr class="w-full border-none h-px bg-gray-1" />
      <div class="flex items-center gap-2 p-3 cursor-pointer transition-300 hover:text-red-500 hover:bg-gray-1">
        <span class="icon-logout text-xl leading-5 rotate-180 text-red-500"></span>
        <div class="flex items-center gap-2">Hisobdan chiqish</div>
      </div>
    </template>
  </UIDropdown>
</template>

<script setup>
const localePath = useLocalePath()

const showDropdown = ref(false)

function handleDropdownToggle(val) {
  showDropdown.value = val
}
</script>

<style>
.linear-border-image {
  background:
    radial-gradient(circle at 100% 100%, #fff 0, #fff 17px, transparent 0) 0 0 / 19px 19px no-repeat,
    radial-gradient(circle at 0 100%, #fff 0, #fff 17px, transparent 0) 100% 0 / 19px 19px no-repeat,
    radial-gradient(circle at 100% 0, #fff 0, #fff 17px, transparent 0) 0 100% / 19px 19px no-repeat,
    radial-gradient(circle at 0 0, #fff 0, #fff 17px, transparent 0) 100% 100% / 19px 19px no-repeat,
    linear-gradient(#fff, #fff) 50% 50% / calc(100% - 4px) calc(100% - 38px) no-repeat,
    linear-gradient(#fff, #fff) 50% 50% / calc(100% - 38px) calc(100% - 4px) no-repeat,
    linear-gradient(#fff, #fff);
  border-radius: 19px;
  box-sizing: border-box;
  padding: 2px;
}
</style>
