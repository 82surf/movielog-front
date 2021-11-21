<template>
  <div>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
        
          v-for="movie in movies"
          :key="movie.id"
          data-bs-toggle="modal" 
          :data-bs-target="`#Modal${movie.id}`"
        >
        <img :src="`https://image.tmdb.org/t/p/original/${movie.thumbnail_path}`" alt="" style="width:300px; height:400px">
        <br>
        <p class="text-center">{{ movie.movie_title }}</p>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
      <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
    </div>

    <movie-list-by-likes-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
    ></movie-list-by-likes-item>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'
import MovieListByLikesItem from '@/components/recommend_movie/MovieListByLikesItem.vue'

export default {
  name: 'MovieListBylikeItem',
  components: {
    MovieListByLikesItem,
    swiper,
    swiperSlide
    // Swiper,
    // SwiperSlide
  },
  data : function () {
    return {
      movieData: null,
      swiperOptions: { 
        spaceBetween: 30,
        slidesPerView: 4,
        touchRatio: 0,
        
      
        // freeMode: true,
        // loop: true,
        // loopAdditionalSlides : 1,
        // effect: 'fade',
        // fadeEffect: {
        //   slidesPerView: 4,
        //   spaceBetween: 5,
        //   crossFade: true,
        //   loop:true,
        // },
        // paginationClickable: true,
        // autoplay: {
          //   delay:1000,
        // },
        // effect:'coverflow',
        // coverflowEffect: {
        //   rotate: 30,
        //   slideShadows: false,
        // },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },    
      },
    }
  },
  props: {
    movies: Array,
  },
  methods: {
    ok: function() {
      console.log('dd')
    }
  },
  created: function (){
  }
}
</script>

<style>
.swiper-slide {
  width: 95%
}
</style>