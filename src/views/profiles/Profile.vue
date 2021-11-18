<template>
  <div>
    <user-info :paramUsername="getUsername"></user-info>
    <review-list :paramUsername="getUsername"></review-list>
  </div>
</template>

<script>
import ReviewList from '@/components/profile/ReviewList.vue'
import UserInfo from '@/components/profile/UserInfo.vue'
export default {
  name: 'Profile',
  components: {
    ReviewList,
    UserInfo,
  },
  computed: {
    getUsername: function () {
      return this.$route.params.username
    }
  }
}
</script>

<style>

</style>