<template>
  <div>
    <p
      @click="goToProfile"
      v-if="user.username"
    >
      {{ user.username }}
    </p>
    <p v-else>검색결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: 'UserSearchResultItem',
  props: {
    user: Object
  },
  methods: {
    goToProfile: function () {
      this.$router.push({ name: 'Profile', params: { username: this.user.username }})
    }
  },
  
}
</script>

<style>

</style>