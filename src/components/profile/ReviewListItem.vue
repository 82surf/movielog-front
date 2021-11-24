<template>
  <div class="review-item mx-auto" style="width: 300px; height: 428px">

    <!-- 리뷰 카드 -->
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

      <!-- 모달 -->
      <review-list-item-modal
        :review="review"
        :paramUsername="paramUsername"
        @delete-review="deleteReview"
      ></review-list-item-modal>

    </div>
    <div v-else>
      <div class="private-review-container">
        <div class="private-review-poster"></div>
        <i class="private-review-ico material-icons">lock</i>
        <div class="private-review-label">비공개 리뷰입니다.</div>
      </div>
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
  computed: {
    engMonth: function () {
      const encode = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return encode[this.month]
    }
  }
}
</script>

<style scoped>
.review-item {
  box-shadow: rgb(0 0 0 / 69%) 8px 8px 10px -10px;
}
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
  width: 240px;
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
.private-review-container {
  position: relative;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: .5s;
}
.private-review-container .private-review-poster {
  position: absolute;
  width: 300px;
  height: 428px;
  background-color: gray;
  filter: brightness(50%);
  transition: .5s;
}
.private-review-container:hover .private-review-poster {
  filter: brightness(100%);
}
.private-review-container .private-review-ico {
  position: absolute;
  font-size: 36px;
  width: 36px;
  left: 0;
  right: 0;
  top: 12rem;
  margin: 0 auto;
}
.private-review-container .private-review-label {
  position: absolute;
  width: 127px;
  font-size: 16px;
  text-align: center;
  left: 0;
  right: 0;
  top: 15rem;
  margin: 0 auto;
}
</style>