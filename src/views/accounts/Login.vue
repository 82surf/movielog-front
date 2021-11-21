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
    <button @click="checkValid">로그인</button>
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
    checkValid: function () {
      // 빈 값 확인
      if (!(this.credentials.username && this.credentials.password)) {
        alert('빈 항목이 있습니다.')
        return false
      }
      // 공백 포함 확인
      const vals = Object.values(this.credentials)
      for (let val of vals) {
        if (val.search(/\s/) != -1) {
          alert('공백이 포함된 항목이 있습니다.')
          return false
        }
      }
      // 아이디 형식 확인
      const userNameCheck =  /^[a-z]+[a-z0-9]{5,19}$/g
      if (!userNameCheck.test(this.credentials.username)) {
        alert('아이디는 영문자, 숫자 조합으로 5~19자리를 사용해주세요.')
        return false
      }
      // 비밀번호 형식 확인
      const pwdCheck = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[~!@#$%^*?+=-])(?!.*[^a-zA-z0-9$`~!@#$%^*?+=-]).{6,25}$/
      if (!pwdCheck.test(this.credentials.password)) {
        alert('비밀번호는 영문자, 숫자, 특수문자 조합으로 6~25자리를 사용해주세요.')
        return false
      }
    },
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
          alert('아이디/패스워드가 틀렸습니다.')
        })
    }
  }
}
</script>
