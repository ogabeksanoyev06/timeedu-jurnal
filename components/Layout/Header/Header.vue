<template>
  <div class="sticky top-0 z-[90]">
    <header class="relative bg-secondary z-[100] w-full py-4 transition-300">
      <div class="container flex-y-center gap-16">
        <NuxtLink to="/" class="header-left">
          <img src="/assets/svg/logo.svg" class="w-full max-w-[150px] flex-shrink-0" alt="timeedu.uz" />
        </NuxtLink>
        <div class="header-right flex-1">
          <div class="header-top flex items-center justify-between pb-4 border-b border-accent-1 gap-6">
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
            <div class="flex-y-center justify-end gap-6 flex-1">
              <FormInput suffix inputClass="!text-gray-3 placeholder:text-white" wrapperClass="!bg-[#3E3F7A] !border-accent-1 !max-w-[460px] w-full" placeholder="Qidiring yoki toping">
                <template #suffix>
                  <span class="icon-search text-xl leading-5 text-white"></span>
                </template>
              </FormInput>
              <LayoutHeaderLanguageSwitcher />
            </div>
          </div>
          <div class="header-bottom pt-4 flex items-center justify-between">
            <nav class="flex-y-center space-x-8 sm:text-base">
              <NuxtLink to="/" class="transition-300 text-white hover:text-gray-5">Joriy nashr</NuxtLink>
              <NuxtLink to="/" class="transition-300 text-white hover:text-gray-5">Arxivlar</NuxtLink>
              <NuxtLink to="/" class="transition-300 text-white hover:text-gray-5">Ilm-fan</NuxtLink>
              <LayoutHeaderNavbarDropdown
                title="Biz haqimizda"
                :items="[
                  { title: 'Jurnal haqida', path: '/about-journal' },
                  { title: 'Tahririyat jamoasi', path: '/editorial-team' },
                  { title: 'Maxfiylik bayonoti', path: '/privacy-policy' },
                  { title: 'Kontaktlar', path: '/contacts' },
                ]"
              />
              <LayoutHeaderNavbarDropdown
                title="Mualliflar uchun"
                :items="[
                  { title: 'Talablar', path: '/requirements' },
                  { title: 'Tarqiz', path: '/review' },
                  { title: 'To\'lov', path: '/payment' },
                ]"
              />
              <LayoutHeaderNavbarDropdown
                title="Saytdagi Jurnallar"
                :items="[
                  {
                    title: 'Ilg\'or iqtisodiyot va pedagogik texnologiyalar',
                    path: '/journals/economics-pedagogy',
                  },
                  {
                    title: 'Nashrlar',
                    path: '/journals/publications',
                  },
                ]"
              />
            </nav>
            <LayoutHeaderAuthorization />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup></script>
