<template>
  <div
    class="container mx-auto mt-4"
    style="width: 30rem"
  >
    <h3 class="text-center">검색 결과</h3>
    <user-search-result-item
      v-for="user in users"
      :key="user.id"
      :user="user"
    >
    </user-search-result-item>
    <h5 class="text-center mt-4">추천 유저</h5>
    <recommend-user
      v-for="recommendUser in recommendUsers"
      :key="recommendUser.id"
      :recommendUser="recommendUser"
    >
    </recommend-user>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import UserSearchResultItem from '@/components/user_search_result/UserSearchResultItem.vue'
import RecommendUser from '@/components/user_search_result/RecommendUser.vue'

export default {
  name: 'UserSearchResult',
  components: {
    UserSearchResultItem,
    RecommendUser
  },
  data: function () {
    return {
      users: null,
      recommendUsers: null,
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
    getSearchResults: function () {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/search/${this.username}/`,
        headers: this.setToken()
      })
        .then(res => {
          this.users = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRecommendResult: function() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/recommend/search/`,
        headers: this.setToken()
      })
        .then(res => {
          const users = res.data
          this.recommendUsers = _.sampleSize(users,5)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    username: function() {
      return this.$route.params.username
    }
  },
  watch: {
    username: function () {
      this.getSearchResults()
      this.getRecommendResult()
    }
  },
  created: function () {
    this.getSearchResults()
    this.getRecommendResult()
  },
}
</script>

<style>

</style>