<template>
  <div>
    <h1>Signup</h1>
    <div>
      <label for="name">이름</label>
      <input
        type="text"
        id="name"
        v-model="credentials.name"
      >
    </div>
    <div>
      <label for="email">이메일</label>
      <input
        type="text"
        id="email"
        v-model="credentials.email"
      >
    </div>
    <div>
      <label for="username">아이디</label>
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
      >
    </div>
    <div>
      <label for="passwordConfirmation">비밀번호 확인</label>
      <input
        type="password"
        id="passwordConfirmation"
        v-model="credentials.passwordConfirmation"
        @keyup.enter="signup"
      >
    </div>
    <button @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Singup',
  data: function () {
    return {
      credentials: {
        name: null,
        email: null,
        username: null,
        password: null,
        passwordConfirmation: null,
      }
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/signup/`,
        data: this.credentials
      })
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
