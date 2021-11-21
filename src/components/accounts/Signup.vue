<template>
  <div>
    <!-- 회원가입 모달 -->
    <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signupModalLabel">Sign up</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
              <p v-if="!isUniqueUsername">아이디 중복 체크 필요</p>
              <p v-else>아이디 중복 체크 완료</p>
              <label for="username">아이디</label>
              <input
                type="text"
                id="username"
                v-model="inputUsername"
              >
              <button @click="usernameValid">아이디 중복 체크</button>
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
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="checkValid" data-bs-dismiss="modal">Sign up</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 회원가입 완료 모달 -->
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
      },
      isUniqueUsername: false,
      inputUsername: null,
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
          for (let credential in this.credentials) {
            this.credentials[credential] = null
          }
          this.inputUsername = null
          const loginBtn = document.querySelector('#loginBtn')
          console.log(document)
          console.log(loginBtn)
          loginBtn.click()
        })
        .catch(err => {
          console.log(err)
        })
    },
    usernameValid: function () {
      // 빈 값 확인
      if (!this.inputUsername) {
        alert('아이디를 입력해주세요.')
        return false
      }
      // 공백 포함 확인
      if (this.inputUsername.search(/\s/) != -1) {
        alert('아이디에는 공백이 포함될 수 없습니다.')
      }
      // 유저네임(아이디) 형식 확인
      const userNameCheck =  /^[a-z]+[a-z0-9]{5,19}$/g
      if (!userNameCheck.test(this.inputUsername)) {
        alert('아이디는 영문자로 시작하는 영문자, 숫자 조합으로 6~19자리를 사용해주세요.')
        return false
      }
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/check-username/${this.inputUsername}`,
      })
        .then(res => {
          this.isUniqueUsername = res.data.isUnique
          this.credentials.username = this.inputUsername
          if (!this.isUniqueUsername) {
            alert('이미 존재하는 아이디입니다.')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkValid: function () {
      // 빈 값 확인
      if (!(this.credentials.email && this.credentials.name && this.credentials.password && this.credentials.passwordConfirmation)) {
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

      // 이름 형식 확인
      const nameCheck = /^[가-힣]{2,6}$/
      if (!nameCheck.test(this.credentials.name)) {
        alert('이름은 한글 2~6자로 작성해주세요.')
        return false
      }

      // 이메일 형식 확인
      const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      if (!emailCheck.test(this.credentials.email)) {
        alert('이메일 형식이 올바르지 않습니다.')
        return false
      }

      // 비밀번호 형식 확인
      const pwdCheck = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[~!@#$%^*?+=-])(?!.*[^a-zA-z0-9$`~!@#$%^*?+=-]).{6,25}$/
      if (!pwdCheck.test(this.credentials.password)) {
        alert('비밀번호는 영문자, 숫자, 특수문자 조합으로 6~25자리를 사용해주세요.')
        return false
      }

      // 비밀번호 확인
      if (this.credentials.password !== this.credentials.passwordConfirmation) {
        alert('비밀번호가 일치하지 않습니다.')
        return false
      }

      // 아이디 중복검사 통과 여부
      if (!this.isUniqueUsername) {
        alert('아이디 중복검사를 통과하지 못했습니다.')
        return false
      }
      this.signup()
    },
  },
  watch: {
    inputUsername: function (newVal) {
      if (newVal !== this.credentials.username) {
        this.isUniqueUsername = false
      }
    }
  }
}
</script>
