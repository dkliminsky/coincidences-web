<template>
  <div id="end-game-modal" class="modal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div v-if="context.status === GAME_STATUS_WIN()" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Победа!</h5>
        </div>
        <div class="modal-body">
          <p>
            next
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$router.push({name: 'home'})">На главную</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('newGameEvent')">Попробовать еще раз</button>
        </div>
      </div>

      <div v-if="context.status === GAME_STATUS_LOSE()" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Поражение</h5>
        </div>
        <div class="modal-body">
          <p>
            text
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$router.push({name: 'home'})">На главную</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('newGameEvent')">Попробовать еще раз</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {GAME_STATUS_LOSE, GAME_STATUS_WIN, LOSE_REASON_ELECTIVITY,} from "@/const";

export default {
  name: "EndGameModal",
  computed: {

  },
  methods: {
    LOSE_REASON_ELECTIVITY() {
      return LOSE_REASON_ELECTIVITY
    },
    GAME_STATUS_LOSE() {
      return GAME_STATUS_LOSE
    },
    GAME_STATUS_WIN() {
      return GAME_STATUS_WIN
    },
  },
  emits: ['newGameEvent',],
  props: ['context', 'config']
}
</script>

<style scoped>

</style>