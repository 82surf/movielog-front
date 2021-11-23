<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid d-flex justify-content-between">
        <router-link class="navbar-brand" :to="{ name: 'Landing'}">movielog</router-link>
        <!-- 유저 검색창 -->
        <form class="d-none d-md-block d-flex mt-2 mt-lg-0 mx-auto" @submit.prevent v-if="username">
          <input v-model="inputUsername" @keyup.enter="searchUser" class="form-control me-2" type="search" placeholder="친구 검색하기" aria-label="Search">
        </form>
        <ul v-if="isLogin" class="nav">
          <!-- 영화 추천 -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'RecommendMovie' }">MovieRecommend</router-link>
          </li>
          <!-- 내 프로필 -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Profile', params: {username: username}}">My profile</router-link>
          </li>
          <!-- 로그아웃 -->
          <li class="nav-item">
            <router-link class="nav-link" @click.native="logout" to="#">Logout</router-link>
          </li>
        </ul>
        <ul v-else class="nav">
          <!-- 회원가입 -->
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</a>
          </li>
          <!-- 로그인 -->
          <li class="nav-item">
            <a id="loginBtn" class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
    <!-- 로그인 모달 -->
    <login @login="isLogin=true"></login>
    <!-- 회원가입 모달 -->
    <signup></signup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '@/components/accounts/Login.vue'
import Signup from '@/components/accounts/Signup.vue'

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      inputUsername: null,
    }
  },
  components: {
    Login,
    Signup,
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$store.dispatch('getUsername', '')
      this.$router.push({ name: 'Landing' })  // 메인페이지로 push
    },
    searchUser: function () {
      this.$router.push({ name: 'UserSearchResult', params: { username: this.inputUsername }})
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
    }
  }
}
</script>

<style>
#app {
  background-color: #fafafa;
}
.navbar-brand {
  font-family: 'Reem Kufi', sans-serif;
  font-size: 1.2rem;
}
</style>
