<template>
  <div class="container mb-20 lg:mb-24 xl:mb-[120px]">
    <h3 class="section-title text-center mb-10">Indeksatsiya</h3>
    <Swiper v-bind="settings" class="">
      <SwiperSlide v-for="key in 6" :key>
        <a href="#">
          <img src="/assets/images/google.png" alt="" class="mx-auto object-contain" />
        </a>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
const settings = {
  slidesPerView: 1,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1440: {
      slidesPerView: 5,
    },
  },
  spaceBetween: 20,
  loop: true,
  grabCursor: false,
  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
  },
  modules: [SwiperAutoplay],
}
</script>
