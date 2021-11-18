<template>
  <div>
    <button @click="goToReviewForm">리뷰 작성하기</button>
    <review-list-item
      v-for="review in reviews"
      :key="review.id"
      :review="review"
      :paramUsername="paramUsername"
      @delete-review="getReviews"
    >
    </review-list-item>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewListItem from '@/components/profile/ReviewListItem.vue'

export default {
  name:'ReviewList',
  components: {
    ReviewListItem,
  },
  data: function () {
    return {
      reviews: null,
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
          this.reviews = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    goToReviewForm: function () {
      this.$router.push({ name: 'MovieSearch' })
    }
  },
  created: function () {
    this.getReviews()
  },
  watch: {
    paramUsername: function () {
      this.getReviews()
    },

  },
}
</script>

<style>

</style>