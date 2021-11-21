<template>
  <div>
    <user-info :paramUsername="getUsername" @togglePrivate="togglePrivate"></user-info>
    <review-list
      v-if="!(getUsername!==username && isPrivate)"
      :paramUsername="getUsername"
    >
    </review-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReviewList from '@/components/profile/ReviewList.vue'
import UserInfo from '@/components/profile/UserInfo.vue'

export default {
  name: 'Profile',
  components: {
    ReviewList,
    UserInfo,
  },
  data: function () {
    return {
      isPrivate: null,
    }
  },
  methods: {
    togglePrivate: function (privateBoolData) {
      this.isPrivate = privateBoolData
    }
  },
  computed: {
    ...mapState([
      'username'
    ]),
    getUsername: function () {
      return this.$route.params.username
    }
  },
}
</script>

<style>

</style>