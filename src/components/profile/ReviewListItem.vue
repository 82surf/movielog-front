<template>
  <div class="mx-auto" style="width: 300px; height: 428px">
    <!-- 로딩 화면 -->
    <div class="card" aria-hidden="true" v-if="isLoading">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
      </div>
    </div>

    <!-- 리뷰 카드 -->
    <div v-else>
      <div v-if="!review.is_private||paramUsername===username">
        <div class="review-container" data-bs-toggle="modal" :data-bs-target="`#Modal${review.pk}`">
          <div class="poster-container">
            <img
              class="review-poster"
              v-if="review.thumbnail_path!=='image'"
              :src="`https://image.tmdb.org/t/p/original/${review.thumbnail_path}`"
              alt="profile img"
            >
            <div v-else class="default-poster"></div>
          </div>
          <div class="month-n-date-container">
            <span class="review-month">{{ engMonth }}  </span>
            <span class="review-date">{{ date }}</span>
          </div>
          <p class="review-year">{{ year }}</p>
          <div class="content-container">
            <p class="review-movie-title">{{ review.movie_title }}</p>
            <p class="review-oneline">{{ review.oneline_review }}</p>
          </div>
        </div>
      </div>

      <!-- 모달 -->
      <review-list-item-modal
        :review="review"
        :paramUsername="paramUsername"
        @delete-review="deleteReview"
      ></review-list-item-modal>

    </div>
  </div>
</template>

<script>
import ReviewListItemModal from '@/components/profile/ReviewListItemModal.vue'
export default {
  name: 'ReviewListItem',
  data: function () {
    return {
      isSelected: false,
      isLoading: true,
      year : new Date(this.review.watched_at).getFullYear(),
      month: new Date(this.review.watched_at).getMonth(),
      date: new Date(this.review.watched_at).getDate(),
    }
  },
  components: {
    ReviewListItemModal,
  },
  props: {
    review: Object,
    paramUsername: String,
    username: String,
  },
  methods: {
    // onClick: function(){
    //   this.isSelected = !this.isSelected
    // }
    deleteReview: function(){
      this.$emit('delete-review')
    }
  },
  created: function(){
    setTimeout(() => {
      this.isLoading=false
    }, 0)
  },
  computed: {
    engMonth: function () {
      const encode = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return encode[this.month + 1]
    }
  }
}
</script>

<style scoped>
/* .review-container {
  display: block;
} */
.review-container {
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: .5s;
}
.review-container:hover {
  transform: scale(1.025);
}
.review-container .poster-container {
  position: absolute;
  width: 300px;
  height: 428px;
  overflow: hidden;
}
.review-container .review-poster {
  width: 100%;
  height: 100%;
  filter: brightness(50%);
  transition: .5s;
}
.review-container:hover .review-poster {
  filter: brightness(100%);
}
.review-container .default-poster {
  position: absolute;
  width: 300px;
  height: 428px;
  background-color: gray;
  filter: brightness(50%);
  transition: .5s;
}
.review-container:hover .default-poster {
  filter: brightness(100%);
}
.review-container .month-n-date-container {
  position: absolute;
  top: 24px;
  left: 24px;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -webkit-transition: opacity 1s ease-in-out;
}
.review-container .review-year {
  position: absolute;
  top: 36px;
  right: 24px;
  font-size: 14px;
  color: #f4f4f4;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -webkit-transition: opacity 1s ease-in-out;
}
.review-container .content-container {
  position: absolute;
  bottom: -412px;
  left: 24px;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -webkit-transition: opacity 1s ease-in-out;
}
.review-container .content-container .review-movie-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.review-container .content-container .review-oneline {
  font-size: 14px;
  width: 240px;
}
.review-container:hover .month-n-date-container{
  opacity: 0;
  transition: opacity .5s ease-in-out;
  -moz-transition: opacity .5s ease-in-out;
  -webkit-transition: opacity .5s ease-in-out;
}
.review-container:hover .content-container {
  opacity: 0;
  transition: opacity .5s ease-in-out;
  -moz-transition: opacity .5s ease-in-out;
  -webkit-transition: opacity .5s ease-in-out;
}
.review-container:hover .review-year {
  opacity: 0;
  transition: opacity .5s ease-in-out;
  -moz-transition: opacity .5s ease-in-out;
  -webkit-transition: opacity .5s ease-in-out;
}
</style>