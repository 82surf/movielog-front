<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="username">사용자 이름</label>
      <input
        type="text"
        id="username"
        v-model="credentials.username"
      >
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
        @keyup.enter="login"
      >
    </div>
    <button @click="login">로그인</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/api-token-auth/`,
        data: this.credentials
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$store.dispatch('getUsername', this.credentials.username)
          this.$router.push({ name: 'Profile', params: {username:this.credentials.username} })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
