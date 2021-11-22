<template>
  <div class="container">
    <img :src="`https://image.tmdb.org/t/p/original/${movieData.poster_path}`" style="width:200px; float:left;" alt="poster image">
    <review-form @create-review="createReview"></review-form>
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