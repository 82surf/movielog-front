<template>
  <div>
    <!-- 로그인 모달 -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">로그인</h5>
            <button id="login-close-btn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearInput"></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="form-floating mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  id="username-login-input" 
                  v-model="credentials.username"
                  placeholder="id"
                >
                <label for="username-login-label">아이디</label>
              </div>
            </div>
            <div>
              <div class="form-floating mb-3">
                <input 
                  type="password" 
                  class="form-control" 
                  id="password-login-input" 
                  v-model="credentials.password"
                  placeholder="pw"
                  @keyup.enter="checkValid"
                >
                <label for="password-login-input">비밀번호</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="checkValid">로그인</button>
          </div>
        </div>
      </div>
    </div>
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
    clearInput: function () {
      this.credentials.username = null,
      this.credentials.password = null
    },
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
      this.login()
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
          const loginCloseBtn = document.querySelector('#login-close-btn')
          loginCloseBtn.click()
        })
        .catch(err => {
          console.log(err)
          alert('아이디/패스워드가 틀렸습니다.')
        })
    }
  }
}
</script>
