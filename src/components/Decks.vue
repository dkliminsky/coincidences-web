<template>
  <div class="d-flex justify-content-center">

    <div class="container-fluid">
      <div class="row">

        <div class="col text-nowrap">

          <div class="text-nowrap mb-2">
            <div type="button" class="btn btn-outline-success me-1">
              Взять
              <i class="fa-solid fa-circle-down"></i> {{ context.actions_take }}
            </div>
            <div type="button" class="btn btn-outline-info me-1">
              Активировать
              <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}
            </div>
            <div type="button" class="btn btn-outline-warning me-1">
              Отложить
              <i class="fa-solid fa-reply"></i> {{ context.actions_hold }}
            </div>
            <div type="button" class="btn btn-outline-primary me-3">
              Карты на руках
              <i class="fa-solid fa-hand"></i>
              {{ cards.length }} из {{ context.hand_size }}
            </div>
          </div>

<!--        </div>-->
<!---->
<!--        <div class="col">-->
          <div type="button" class="btn btn-outline-success me-1">
            Усиление
            <i class="fa-solid fa-hand-fist"></i>
            {{ decks[DECK_NAME_STRENGTHENING].deck_size }}/{{ decks[DECK_NAME_STRENGTHENING].hold_size }}
          </div>
          <button v-if="decks[DECK_NAME_STRENGTHENING].can_take" @click="$emit('takeCardEvent', DECK_NAME_STRENGTHENING)" class="btn btn-success me-3">
            <i class="fa-regular fa-circle-down"></i>
          </button>
          <button v-else class="btn btn-outline-primary me-3 disabled">
            <i class="fa-regular fa-circle-down"></i>
          </button>

          <div type="button" class="btn btn-outline-success me-1">
            Решение
            <i class="fa-solid fa-list-check"></i>
            {{ decks[DECK_NAME_SOLUTION].deck_size }}/{{ decks[DECK_NAME_SOLUTION].hold_size }}
          </div>
          <button v-if="decks[DECK_NAME_SOLUTION].can_take" @click="$emit('takeCardEvent', DECK_NAME_SOLUTION)" class="btn btn-success me-3">
            <i class="fa-regular fa-circle-down"></i>
          </button>
          <button v-else class="btn btn-outline-primary me-3 disabled">
            <i class="fa-regular fa-circle-down"></i>
          </button>
<!--        </div>-->
<!---->
<!--        <div class="col text-nowrap">-->
          <div type="button" class="btn btn-outline-success me-1">
            Эффективность
            <i class="fa-solid fa-gears"></i>
            {{ decks[DECK_NAME_EFFICIENCY].deck_size }}/{{ decks[DECK_NAME_EFFICIENCY].hold_size }}
          </div>
          <button v-if="decks[DECK_NAME_EFFICIENCY].can_take" @click="$emit('takeCardEvent', DECK_NAME_EFFICIENCY)" class="btn btn-success me-3">
            <i class="fa-regular fa-circle-down"></i>
          </button>
          <button v-else class="btn btn-outline-primary me-3 disabled">
            <i class="fa-regular fa-circle-down"></i>
          </button>

          <div type="button" class="btn btn-outline-success me-1">
            Супер проект
            <i class="fa-solid fa-chart-line"></i>
            {{ decks[DECK_NAME_SUPER_PROJECT].deck_size }}/{{ decks[DECK_NAME_SUPER_PROJECT].hold_size }}
          </div>
          <button v-if="decks[DECK_NAME_SUPER_PROJECT].can_take" @click="$emit('takeCardEvent', DECK_NAME_SUPER_PROJECT)" class="btn btn-success me-3">
            <i class="fa-regular fa-circle-down"></i>
          </button>
          <button v-else class="btn btn-outline-primary me-3 disabled">
            <i class="fa-regular fa-circle-down"></i>
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {DECK_NAME_EFFICIENCY, DECK_NAME_SOLUTION, DECK_NAME_STRENGTHENING, DECK_NAME_SUPER_PROJECT} from "../const";

export default {
  name: "Decks",
  computed: {
    DECK_NAME_STRENGTHENING() {
      return DECK_NAME_STRENGTHENING;
    },
    DECK_NAME_SOLUTION() {
      return DECK_NAME_SOLUTION;
    },
    DECK_NAME_EFFICIENCY() {
      return DECK_NAME_EFFICIENCY;
    },
    DECK_NAME_SUPER_PROJECT() {
      return DECK_NAME_SUPER_PROJECT;
    },
  },
  methods: {
  },
  props: ['context', 'cards', 'decks',]
}
</script>
