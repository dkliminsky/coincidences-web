<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  methods: {

  },
  setup() {
    console.log('App setup');
  },
  created() {
    console.log('App created');
  },
  mounted() {
    console.log('App mounted');
  }
}
</script>

<style scoped>

</style>