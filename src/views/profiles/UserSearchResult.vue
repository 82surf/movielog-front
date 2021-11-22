<template>
  <div
    class="container mx-auto mt-4"
    style="width: 30rem"
  >
    <h3 style="text-align: center">검색 결과</h3>
    <user-search-result-item
      v-for="user in users"
      :key="user.id"
      :user="user"
    >
    </user-search-result-item>
  </div>
</template>

<script>
import axios from 'axios'
import UserSearchResultItem from '@/components/user_search_result/UserSearchResultItem.vue'

export default {
  name: 'UserSearchResult',
  components: {
    UserSearchResultItem
  },
  data: function () {
    return {
      users: null,
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
    }
  },
  created: function () {
    this.getSearchResults()
  },
}
</script>

<style>

</style>