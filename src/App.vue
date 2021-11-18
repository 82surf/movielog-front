<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid d-flex justify-content-between">
        <router-link class="navbar-brand" :to="{ name: 'Landing'}">movielog</router-link>
        <form class="d-flex mt-2 mt-lg-0 mx-auto" @submit.prevent>
          <input v-model="inputUsername" @keyup.enter="searchUser" class="form-control me-2" type="search" placeholder="친구 검색하기" aria-label="Search">
        </form>
        <ul v-if="isLogin" class="nav">
          <li class="nav-item mr-2z" id="profile" role="tabpanel">
            <router-link :to="{ name: 'Profile', params: {username: username}}">My profile</router-link>
          </li>
          <li class="nav-item">
            <router-link @click.native="logout" to="#">Logout</router-link>
          </li>
        </ul>
        <ul v-else class="nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Signup'}">Sign up</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Login' }">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view @login="isLogin=true"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      inputUsername: null,
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$store.dispatch('getUsername', '')
      this.$router.push({ name: 'Login' })  // 메인페이지로 push
    },
    searchUser: function () {
      this.$router.push({ name: 'UserSearchResult', params: { username: this.inputUsername}})
      this.inputUsername = null
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.isLogin = true
      console.log('로그인 됨!')
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
