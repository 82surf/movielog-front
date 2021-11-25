<template>
  <div>
    <!-- 회원 정보 수정 모달 -->
    <div class="modal fade" id="updateUserInfoModal" tabindex="-1" aria-labelledby="updateUserInfoModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateUserInfoModalLabel">설정</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('clear-data-set')"></button>
          </div>
          <div class="modal-body">
            <h5>프로필 이미지 변경</h5>
            <div class="input-group mb-3">
              <!-- <span class="input-group-text" id="file-label">Profile Image</span> -->
              <input type="file" class="form-control" aria-describedby="file-label" @change="onFileSelected">
            </div>
            <hr>
            <h5>회원 정보 수정</h5>
            <div>
              <div class="my-2">
                <button v-show="isInputUsernameChanged" @click="usernameValid" class="btn btn-outline-warning btn-sm me-2">아이디 중복 확인</button>
                <span v-if="!isUniqueUsername && isInputUsernameChanged" style="color: red">아이디 중복 체크 필요</span>
                <span v-else-if="isInputUsernameChanged">아이디 중복 체크 완료</span>
              </div>
              <div class="form-floating">
                  <input type="text" class="form-control" id="username-label" placeholder="name@example.com" v-model="inputUsername">
                  <label for="username-label">ID</label>
              </div>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="email-label" placeholder="name@example.com" v-model="dataSet.email">
              <label for="email-label">Email</label>
            </div>
            <div class="form-floating">
              <input type="text" class="form-control" id="name-label" placeholder="name@example.com" v-model="dataSet.name">
              <label for="name-label">Name</label>
            </div>
            <hr>
            <h5>프로필 공개 여부</h5>
            <div>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="not-private-update-input" v-model="dataSet.isPrivate">
                <label v-show="dataSet.isPrivate" class="form-check-label" for="not-private-update-input">프로필이 비공개 상태입니다.</label>
                <label v-show="!dataSet.isPrivate" class="form-check-label" for="not-private-update-input">프로필이 공개 상태입니다.</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="checkValid">회원 정보 수정</button>
            <a
              id="updateModalCloseBtn"
              data-bs-dismiss="modal" style="display: none;"
            >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateUserInfo',
  data: function () {
    return {
      // 선택된 이미지
      selectedImage: null,
      // 중복검사를 통과한 아이디
      validUsername: null,
      // 아이디 중복 검사 통과 여부
      isUniqueUsername: false,
      // 입력창에 입력된 아이디
      inputUsername: this.username,
      // 입력창 수정 여부
      isInputUsernameChanged: false,
    }
  },
  props: {
    username: String,
    dataSet: Object,
  },
  methods: {
    clearInput: function () {
      this.$emit('clear-data-set')
      this.selectedImage = null
      this.validUsername = null
      this.isUniqueUsername = false
      this.inputUsername = this.username
      this.isInputUsernameChanged = false
    },
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
        alert('아이디는 영문자로 시작하는 영문자, 숫자 조합으로 6~19자리를 사용해주세요.')
        return false
      }
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/check-username/${this.inputUsername}/`,
      })
        .then(res => {
          // 아이디 중복 검사를 통과하면 validUsername에 유저네임 저장
          this.isUniqueUsername = res.data.isUnique
          if (!this.isUniqueUsername) {
            alert('이미 존재하는 아이디입니다.')
          } else {
            this.validUsername = this.inputUsername
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkValid: function () {
      // 이름, 이메일 빈 값 확인
      if (!(this.dataSet.email && this.dataSet.name)) {
        alert('빈 항목이 있습니다.')
        return false
      }
      // 이메일 공백 포함 확인
      if (this.dataSet.email.search(/\s/) != -1) {
        alert('이메일에 공백이 포함되어 있습니다.')
        return false
      }
      // 이메일 형식 확인
      const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      if (!emailCheck.test(this.dataSet.email)) {
        alert('이메일 형식이 올바르지 않습니다.')
        return false
      }
      // 이름 공백 포함 확인
      if (this.dataSet.name.search(/\s/) != -1) {
        alert('이름에 공백이 포함되어 있습니다.')
        return false
      }
      // 이름 형식 확인
      const nameCheck = /^[가-힣]{2,6}$/
      if (!nameCheck.test(this.dataSet.name)) {
        alert('이름은 한글 2~6자로 작성해주세요.')
        return false
      }
      // 아이디 중복 검사 통과 여부
      if (!this.isUniqueUsername && this.isInputUsernameChanged) {
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
      userData.append('username', this.inputUsername)
      userData.append('email', this.dataSet.email)
      userData.append('name', this.dataSet.name)
      userData.append('is_private', this.dataSet.isPrivate)
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
          const updateModalCloseBtn = document.querySelector('#updateModalCloseBtn')
          updateModalCloseBtn.click()
          this.login()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 로그인
    login: function () {
      const credentials = {
        'username': this.inputUsername,
        'password': this.dataSet.password
      }
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/api-token-auth/`,
        data: credentials
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$store.dispatch('getUsername', this.inputUsername)
          this.$router.push({ name: 'Profile', params: {username:this.inputUsername}}).catch(() => {})
          this.$emit('get-user-info')
          this.$emit('clear-data-set')
          alert('회원정보 수정이 완료되었습니다.')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    inputUsername: function (newVal) {
      this.isInputUsernameChanged = true
      if (newVal === this.username) {
        this.isUniqueUsername = true
      } else if (newVal !== this.validUsername) {
        this.isUniqueUsername = false
      }
    },
  }
}
</script>

<style>
.file_input_textbox {
   float:left; height:29px; 
   } 
.file_input_div { 
  position:relative; width:80px; height:36px; overflow:hidden; 
  } 
.file_input_img_btn {
  padding:0 0 0 5px; 
  } .file_input_hidden {
  font-size:29px; position:absolute; right:0px; top:0px; opacity:0; filter: alpha(opacity=0); -ms-filter: alpha(opacity=0); cursor:pointer; 
}

</style>