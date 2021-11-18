<template>
  <div>
    <h1>회원 정보 수정</h1>
    <p>
      <label for="username">아이디</label>
      <input v-model="newUserInfo.username" type="text" id="username">
    </p>
    <p>
      <label for="email">이메일</label>
      <input v-model="newUserInfo.email" type="text" id="email">
    </p>
    <p>
      <label for="name">이름</label>
      <input v-model="newUserInfo.name" type="text" id="name">
    </p>
    <button @click="updateUser">수정 완료</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'UpadateUserInfo',
  data: function () {
    return {
      newUserInfo: {
        username: null,
        email: null,
        name: null,
      },
    }
  },
  props: {
    password: String
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    updateUser: function () {
      axios({
        method: 'put',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/update/${this.username}/`,
        data: this.newUserInfo,
        headers: this.setToken()
      })
        .then(() => {
          // console.log(res)
          this.login()
        })
        .catch(err => {
          console.log(err)
        })
    },
    login: function () {
      const credentials = {
        'username': this.newUserInfo.username,
        'password': this.password
      }
      console.log(credentials)
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/api-token-auth/`,
        data: credentials
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$store.dispatch('getUsername', credentials.username)
          this.$router.push({ name: 'Profile', params: {username:credentials.username} })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState([
      'username'
    ])
  }
}
</script>

<style>

</style>