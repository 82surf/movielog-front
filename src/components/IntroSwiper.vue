<template>
  <swiper ref="introSwiper" :options="swiperOption">
    <swiper-slide>1</swiper-slide>
    <swiper-slide>2</swiper-slide>
    <swiper-slide>3</swiper-slide>
    <swiper-slide>4</swiper-slide>
    <swiper-slide>5</swiper-slide>
    <swiper-slide>6</swiper-slide>
    <swiper-slide>7</swiper-slide>
    <swiper-slide>8</swiper-slide>
    <swiper-slide>9</swiper-slide>
    <swiper-slide>10</swiper-slide>
    <swiper-slide>11</swiper-slide>
    <swiper-slide>12</swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'IntroSwiper',
  props: {
    swiperOption: {
      type: Object
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>