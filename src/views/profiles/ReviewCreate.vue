<template>
  <div class="container">
    <h2 class="py-5 text-center">리뷰 작성</h2>
    <div class="border rounded">
      <div class="d-md-flex p-3">
        <div class="d-flex justify-content-center">
          <img :src="`https://image.tmdb.org/t/p/original/${movieData.poster_path}`" style="width: 300px;" alt="poster image">
        </div>
        <review-form @create-review="createReview"></review-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ReviewForm from '@/components/review_create/ReviewForm.vue'

export default {
  name:'ReviewCreate',
  components: {
    ReviewForm
  },
  data: function() {
    return {
      reviewData: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    createReview: function(sendData) {
      this.reviewData = sendData
      
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/profiles/reviews/${this.username}/`,
        data: this.reviewData,
        headers: this.setToken(),
      })
        .then(() => {
          this.$router.push({ name: 'Profile', params : { username: this.username }})
        })
        .catch(err => {
          console.log(err)
        })
      console.log(sendData)
    }
  },
  computed: {
    ...mapState([
      'movieData',
      'username'
    ])
  }
}
</script>

<style>

</style>