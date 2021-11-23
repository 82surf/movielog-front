<template>
  <div>
    <!-- 비밀번호 확인 모달 -->
    <div class="modal fade" id="checkPasswordModal" tabindex="-1" aria-labelledby="checkPasswordModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="checkPasswordModalLabel">비밀번호 확인</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearDataSet"></button>
          </div>
          <!-- 모달 바디 -->
          <div class="modal-body">
            <p>회원정보를 안전하게 보호하기 위해 비밀번호를 한 번 더 입력해주세요.</p>
            <div class="form-floating">
              <input type="password" class="form-control" placeholder="pw" id="password-label" v-model="dataSet.password" @keyup.enter="checkPassword">
              <label fro="password-label">비밀번호를 입력해주세요.</label>
            </div>
            <p v-if="errMsgFlag && !isValid">비밀번호가 틀렸습니다.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="checkPassword">비밀번호 확인</button>
          </div>
        </div>
      </div>
    </div>

    <!--
      회원정보 수정 모달 켜는 버튼
      checkPassword 메서드의 클릭 이벤트로만 트리거 되도록 display: none 처리
    -->
    <button
      id="updateUserInfoBtn"
      data-bs-toggle="modal"
      data-bs-target="#updateUserInfoModal"
      style="display: none;"
    ></button>

    <!-- 회원 정보 수정 모달 -->
    <update-user-info
      :dataSet="dataSet"
      :username="username"
      @clear-data-set="clearDataSet"
      @get-user-info="getUserInfo"
    >
    </update-user-info>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import UpdateUserInfo from '@/components/accounts/UpdateUserInfo.vue'

export default {
  name: 'CheckPassword',
  components: {
    UpdateUserInfo,
  },
  data: function () {
    return {
      dataSet: {
        password: null,
        name: null,
        email: null,
        isPrivate: null,
      },
      isValid: false,
      errMsgFlag: false,
    }
  },
  methods: {
    getUserInfo: function () {
      this.$emit('get-user-info')
    },
    clearDataSet: function () {
      for (let key in this.dataSet) {
        this.dataSet[key] = null,
        this.isValid = false
        this.errMsgFlag = false
      }
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    checkPassword: function () {
      const sendData = { 'password': this.dataSet.password }
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/check-password/${this.username}/`,
        data: sendData,
        headers: this.setToken()
      })
        .then(res => {
          this.isValid = res.data.isValid
          this.errMsgFlag = res.data.errMsgFlag
          this.dataSet.name = res.data.name
          this.dataSet.email = res.data.email
          this.dataSet.isPrivate = res.data.isPrivate

          // 비밀번호 일치하면 updateUserInfo 모달 트리거
          if (this.isValid) {
            const updateUserInfoBtn = document.querySelector('#updateUserInfoBtn')
            updateUserInfoBtn.click()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  computed: {
    ...mapState([
      'username'
    ])
  },
}
</script>

<style>

</style>