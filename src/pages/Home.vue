<template>
  <button type="button" class="btn btn-success" @click="createGame()">Начать игру</button>
</template>

<script>

export default {
  name: "Home",
  methods: {
    createGame() {
      this.$router.push({name: 'create_game'})
    },
  }
}
</script>

<style scoped>

</style>