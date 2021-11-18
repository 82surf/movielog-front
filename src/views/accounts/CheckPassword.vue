<template>
  <div>
    <div v-if="!isValid">
      <h1>비밀번호를 입력해주세요.</h1>
      <p v-if="errMsgFlag">비밀번호가 틀렸습니다.</p>
      <input
        type="password"
        v-model="password"
        @keyup.enter="checkPassword"
      >
    </div>
    <div v-else>
      <update-user-info :password="password"></update-user-info>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import UpdateUserInfo from '@/components/profile/UpdateUserInfo.vue'

export default {
  name: 'CheckPassword',
  components: {
    UpdateUserInfo,
  },
  data: function () {
    return {
      password: null,
      isValid: false,
      errMsgFlag: false,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    checkPassword: function () {
      const sendData = { 'password': this.password }
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/check-password/${this.username}/`,
        data: sendData,
        headers: this.setToken()
      })
        .then(res => {
          this.isValid = res.data.isValid
          this.errMsgFlag = res.data.errMsgFlag
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
  },
}
</script>

<style>

</style>