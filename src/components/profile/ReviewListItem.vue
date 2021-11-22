<template>
  <div style="height: 416px">
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
        <div class="review-wrapper" data-bs-toggle="modal" :data-bs-target="`#Modal${review.pk}`">
          <img
            class="review-poster"
            v-if="review.thumbnail_path"
            :src="`https://image.tmdb.org/t/p/original/${review.thumbnail_path}`"
            alt="profile img"
          >
          <div v-else class="default-poster"></div>
          <div class="review-month-n-date">
            <span class="review-month">{{ engMonth }}  </span>
            <span class="review-date">{{ date }}</span>
          </div>
          <div class="content-wrapper">
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
.review-wrapper {
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
.review-wrapper .review-poster {
  position: absolute;
  width: 280px;
  filter: brightness(50%);
}
.review-wrapper .default-poster {
  position: absolute;
  width: 280px;
  height: 375px;
  background-color: gray;
}
.review-wrapper .review-month-n-date {
  position: absolute;
  top: 24px;
  left: 24px;
}
.review-wrapper .review-date {
  position: absolute;
  left: 52px;
}
.review-wrapper .content-wrapper {
  position: absolute;
  bottom: -400px;
  left: 24px;
}
.review-wrapper .content-wrapper .review-movie-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.review-wrapper .content-wrapper .review-oneline {
  font-size: 14px;
  width: 240px;
}
</style>