<template>
  <div>
    <!-- <div v-if="isLoading">
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div> -->
    <div>
      <button v-if="username===paramUsername" @click="goToReviewForm">리뷰 작성하기</button>
      <select v-model="status">
        <option value="watched_at_desc">관람일 내림차순</option>
        <option value="watched_at_asc">관람일 오름차순</option>
        <option value="like_count">좋아요 많은순</option>
        <option value="comment_count">댓글갯수 순</option>
        <option value="created_at_asc">작성일 오름차순</option>
        <option value="created_at_desc">작성일 내림차순</option>
        <option value="rank_desc">별점순</option>
      </select>
      <review-list-item
        v-for="review of reviews"
        :key="review.pk"
        :review="review"
        :paramUsername="paramUsername"
        @delete-review="getReviews"
        :username="username"
      >
      </review-list-item>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import ReviewListItem from '@/components/profile/ReviewListItem.vue'

export default {
  name:'ReviewList',
  components: {
    ReviewListItem,
  },
  data: function () {
    return {
      reviews: null,
      status: 'watched_at_desc',
      isLoading: true,
    }
  },
  props: {
    paramUsername: String,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getReviews: function () {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/reviews/${this.paramUsername}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          if (this.status==='created_at_desc'){
            this.reviews = _.orderBy(res.data, ['created_at'], ['desc'])
          } else if(this.status==='created_at_asc'){
            this.reviews = _.orderBy(res.data, ['created_at'], ['asc'])
          } else if(this.status==='like_count'){
            this.reviews = _.orderBy(res.data, ['like_count'], ['desc'])
          } else if(this.status==='watched_at_desc'){
            this.reviews = _.orderBy(res.data, ['watched_at'], ['desc'])
          } else if(this.status==='watched_at_asc'){
            this.reviews = _.orderBy(res.data, ['watched_at'], ['asc'])
          } else if(this.status==='comment_count'){
            this.reviews = _.orderBy(res.data, ['comment_count'], ['desc'])
          } else if(this.status==='rank_desc'){
            this.reviews = _.orderBy(res.data, ['rank'], ['desc'])
          }
          setTimeout(() =>{
            this.isLoading = false
          }, 1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToReviewForm: function () {
      this.$router.push({ name: 'MovieSearch' })
    },
  },
  created: function () {
    this.getReviews()
  },
  watch: {
    paramUsername: function () {
      this.getReviews()
    },
    status: function() {
      if (this.status==='created_at_desc'){
        this.reviews = _.orderBy(this.reviews, ['created_at'], ['desc'])
      } else if(this.status==='created_at_asc'){
        this.reviews = _.orderBy(this.reviews, ['created_at'], ['asc'])
      } else if(this.status==='like_count'){
        this.reviews = _.orderBy(this.reviews, ['like_count'], ['desc'])
      } else if(this.status==='watched_at_desc'){
        this.reviews = _.orderBy(this.reviews, ['watched_at'], ['desc'])
      } else if(this.status==='watched_at_asc'){
        this.reviews = _.orderBy(this.reviews, ['watched_at'], ['asc'])
      } else if(this.status==='comment_count'){
        this.reviews = _.orderBy(this.reviews, ['comment_count'], ['desc'])
      } else if(this.status==='rank_desc'){
        this.reviews = _.orderBy(this.reviews, ['rank'], ['desc'])
      }
    }
  },
  computed: {
    username : function() {
      return this.$store.state.username
    },
  },
}
</script>

<style>

</style>