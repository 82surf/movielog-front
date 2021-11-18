<template>
  <div>
    <p
      @click="goToProfile"
    >
      {{ user.username }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'UserSearchResultItem',
  props: {
    user: {
      type: Object
    }
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