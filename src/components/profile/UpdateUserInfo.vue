<template>
  <div>
    <h1>회원 정보 수정</h1>
    <input type="file" @change="onFileSelected">
    <div>
      <p v-if="!isUniqueUsername">아이디 중복 체크 필요</p>
      <p v-else>아이디 중복 체크 완료</p>
      <label for="username">아이디</label>
      <input v-model="inputUsername" type="text" id="username">
      <button @click="usernameValid">아이디 중복 검사</button>
    </div>
    <div>
      <label for="email">이메일</label>
      <input v-model="newUserInfo.email" type="text" id="email">
    </div>
    <div>
      <label for="name">이름</label>
      <input v-model="newUserInfo.name" type="text" id="name">
    </div>
    <div>
      <p>프로필 공개 여부</p>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="not-private" v-model="newUserInfo.isPrivate">
        <label class="form-check-label" for="not-private">페이지 팔로워공개</label>
      </div>
    </div>
    <button @click="checkValid">수정 완료</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateUserInfo',
  data: function () {
    return {
      newUserInfo: {
        // 중복검사를 통과한 아이디
        username: null,
        email: this.dataSet.email,
        name: this.dataSet.name,
        isPrivate: this.dataSet.isPrivate,
      },
      selectedImage: null,
      // 아이디 중복 검사 통과 여부
      isUniqueUsername: false,
      // 입력창에 입력된 아이디
      // props에서 받은 username이 들어가있다.
      inputUsername: this.username,
    }
  },
  props: {
    username: String,
    dataSet: Object,
  },
  methods: {
    // 클라에서 선택된 파일을 데이터에 저장
    onFileSelected: function (event) {
      this.selectedImage = event.target.files[0]
    },
    // 로컬 스토리지에서 토큰 가져오기
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    // 아이디 유효성 검사 및 중복 검사 요청
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
        alert('아이디는 영문자, 숫자 조합으로 5~19자리를 사용해주세요.')
        return false
      }
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/check-username/${this.inputUsername}`,
      })
        .then(res => {
          // 아이디 중복 검사를 통과하면 newUserInfo에 유저네임 저장
          this.isUniqueUsername = res.data.isUnique
          this.newUserInfo.username = this.inputUsername
          if (!this.isUniqueUsername) {
            alert('이미 존재하는 아이디입니다.')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkValid: function () {
      // 이름, 이메일 빈 값 확인
      if (!(this.newUserInfo.email && this.newUserInfo.name)) {
        alert('빈 항목이 있습니다.')
        return false
      }
      // 이메일 공백 포함 확인
      if (this.newUserInfo.email.search(/\s/) != -1) {
        alert('이메일에 공백이 포함되어 있습니다.')
        return false
      }
      // 이메일 형식 확인
      const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      if (!emailCheck.test(this.newUserInfo.email)) {
        alert('이메일 형식이 올바르지 않습니다.')
        return false
      }
      // 이름 공백 포함 확인
      if (this.newUserInfo.name.search(/\s/) != -1) {
        alert('이름에 공백이 포함되어 있습니다.')
        return false
      }
      // 이름 형식 확인
      const nameCheck = /^[가-힣]{2,6}$/
      if (!nameCheck.test(this.newUserInfo.name)) {
        alert('이름은 한글 2~6자로 작성해주세요.')
        return false
      }
      // 아이디 중복 검사 통과 여부
      if (!this.isUniqueUsername) {
        alert('아이디 중복검사를 통과하지 못했습니다.')
        return false
      }
      // 모든 유효성 검사를 통과하면 업데이트 요청
      this.updateUser()
    },
    // 업데이트 요청
    updateUser: function () {
      // 이미지 formdata에 담기
      const userData = new FormData()
      // 이름을 django 모델의 필드명과 동일하게 맞춰줘야 함
      if (this.selectedImage) {
        userData.append('profile_image', this.selectedImage, this.selectedImage.name)
      }
      userData.append('username', this.newUserInfo.username)
      userData.append('email', this.newUserInfo.email)
      userData.append('name', this.newUserInfo.name)
      userData.append('is_private', this.newUserInfo.isPrivate)
      // api 요청
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/update/${this.username}/`,
        data: userData,
        headers: {
          ...this.setToken(),
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          this.login()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 로그인
    login: function () {
      const credentials = {
        'username': this.newUserInfo.username,
        'password': this.dataSet.password
      }
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
  watch: {
    inputUsername: function (newVal) {
      if (newVal !== this.newUserInfo.username) {
        this.isUniqueUsername = false
      }
    }
  }
}
</script>

<style>

</style>