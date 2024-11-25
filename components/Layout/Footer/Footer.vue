<template>
  <footer class="bg-secondary transition-300">
    <div class="container">
      <!-- <div class="grid lg:grid-cols-[162px_minmax(0,1fr)] gap-10 lg:gap-20">
        <NuxtLink :to="localePath('/')">
          <img src="/assets/svg/logo.svg" class="w-full max-w-[162px]" alt="timeedu.uz" />
        </NuxtLink>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
          <li class="flex flex-col gap-4">
            <h3 class="text-base font-semibold text-white">Biz haqimizda</h3>
            <nav class="flex flex-col gap-4 sm:text-base">
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Talabalar</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Taqriz</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">To’lov</NuxtLink>
            </nav>
          </li>
          <li class="flex flex-col gap-4">
            <h3 class="text-base font-semibold text-white">Mualliflar uchun</h3>
            <nav class="flex flex-col gap-4 sm:text-base">
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Jurnal haqida</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Tahririyat jamoasi</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Maxfiylik bayonoti</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Kontaktlar</NuxtLink>
            </nav>
          </li>
          <li class="flex flex-col gap-4">
            <h3 class="text-base font-semibold text-white">Saytdagi jurnallari</h3>
            <nav class="flex flex-col gap-4 sm:text-base">
              <NuxtLink :to="localePath(`/journal/${item.slug}`)" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5" v-for="item in journals.content" :key="item.id">
                {{ item.name }}
              </NuxtLink>
            </nav>
          </li>
          <li class="flex flex-col gap-4">
            <h3 class="text-base font-semibold text-white">Navigatsiya</h3>
            <nav class="flex flex-col gap-4 sm:text-base">
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Joriy nashrlar</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Arxivlar</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Jumal haqida</NuxtLink>
              <NuxtLink :to="localePath('/')" class="footer-link transition-300 text-white transition-300 flex items-center gap-2 hover:text-gray-5">Kontaktlar</NuxtLink>
            </nav>
          </li>
        </ul>
      </div> -->
      <div class="flex-center-between max-lg:flex-col py-4 sm:py-10 gap-4 text-center">
        <p class="text-gray-3 text-sm leading-150">© Copyright 2024 Iqtisodiy taraqqiyot va tahlil All Rights Reserved</p>
        <nav class="flex-center flex-wrap gap-2 sm:gap-6 leading-150">
          <a href="#" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
            <span class="icon-phone text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
            +998 94 643 30 39
          </a>
          <hr class="h-[18px] w-px bg-accent-1 max-sm:hidden" />
          <a href="#" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
            <span class="icon-message text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
            e-itt@mail.ru
          </a>
          <hr class="h-[18px] w-px bg-accent-1 max-sm:hidden" />
          <a href="#" target="_blank" class="flex-center gap-2 transition-300 text-white hover:text-gray-5 group">
            <span class="icon-telegram text-xl leading-5 text-accent-2 transition-300 group-hover:text-gray-5"></span>
            @e_itt_manager
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useJournalStore } from '@/stores/journals.js'

const localePath = useLocalePath()
const route = useRoute()

const journalStore = useJournalStore()

const { journals } = storeToRefs(journalStore)
</script>
