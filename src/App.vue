<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid d-flex justify-content-between">
        <!-- 홈 버튼(로고) -->
        <router-link v-if="isLogin" class="navbar-brand" :to="{ name: 'Profile', params: {username: username}}">movielog</router-link>
        <router-link v-else class="navbar-brand" :to="{ name: 'Landing'}">movielog</router-link>
        <!-- 반응형 로고 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <!-- 유저 검색창 -->
          <form class="d-flex mt-3 mt-lg-0 mx-auto" @submit.prevent v-if="username">
            <input v-model="inputUsername" @keyup.enter="searchUser" class="form-control me-2" type="search" placeholder="친구 검색하기" aria-label="Search">
          </form>
          <ul v-if="isLogin" class="navbar-nav">
            <!-- 영화 추천 -->
            <li class="nav-item">
              <router-link class="nav-link mt-3 mt-lg-0" :to="{ name: 'RecommendMovie' }">영화 추천</router-link>
            </li>
            <!-- 내 프로필 -->
            <li class="nav-item">
              <router-link class="nav-link mt-3 mt-lg-0" :to="{ name: 'Profile', params: {username: username}}">내 프로필</router-link>
            </li>
            <!-- 로그아웃 -->
            <li class="nav-item">
              <router-link class="nav-link my-3 my-lg-0" @click.native="logout" to="#">로그아웃</router-link>
            </li>
          </ul>
          <ul v-else class="navbar-nav ms-auto">
            <!-- 로그인 -->
            <li class="nav-item">
              <a id="loginBtn" class="nav-link login-btn me-3 mt-3 mt-lg-0" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</a>
            </li>
            <!-- 회원가입 -->
            <li class="nav-item">
              <a id="signupBtn" class="btn btn-primary me-3 my-3 my-lg-0" data-bs-toggle="modal" data-bs-target="#signupModal">지금 시작하기</a>
            </li>
          </ul>
        </div>
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
      alert('로그아웃 되었습니다.')
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

<style scoped>
.navbar-light {
  background-color: #fafafa;
}
.navbar-brand {
  font-family: 'Reem Kufi', sans-serif;
  font-size: 1.2rem;
}
.navbar-light .navbar-nav .nav-link {
  color: black;
}
.signup-btn {
  color: white;
  background-color: #5cb1ff;
}
.login-btn {
  cursor: pointer;
}
</style>
