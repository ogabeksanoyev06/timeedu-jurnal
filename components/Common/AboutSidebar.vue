<template>
  <div v-if="currentSlug" class="lg:col-span-4 lg:sticky top-40 h-max bg-gray-1 p-4 shadow-section rounded-xl">
    <UIButton text="Maqolani yuborish" wrapper-class="w-full !bg-secondary rounded-none" />
    <nav class="mt-6">
      <h3 class="bg-secondary py-2 text-white px-4">Biz haqimizda</h3>
      <NuxtLink v-for="link in navLinks" :key="link.path" :to="localePath(`/journal/${currentSlug}${link.path}`)" class="py-3 px-4 block border-b hover:text-primary [&.router-link-exact-active]:text-primary">
        {{ link.title }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const localePath = useLocalePath()

const currentSlug = ref(props.slug)

const navLinks = [
  { path: '/about', title: 'Jurnal haqida' },
  { path: '/editorialTeam', title: 'Tahririyat jamoasi' },
  { path: '/privacy', title: 'Maxfiylik bayonoti' },
  { path: '/contact', title: 'Kontaktlar' },
]

watchEffect(() => {
  currentSlug.value = route.params.slug || props.slug
})
</script>
