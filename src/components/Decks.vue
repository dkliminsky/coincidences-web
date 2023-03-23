<template>
<!--  <div type="button" class="btn btn-outline-success me-1">-->
<!--    Взять-->
<!--    <i class="fa-solid fa-circle-down"></i> {{ context.actions_take }}-->
<!--  </div>-->
<!--  <div type="button" class="btn btn-outline-info me-1">-->
<!--    Активировать-->
<!--    <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}-->
<!--  </div>-->
<!--  <div type="button" class="btn btn-outline-warning me-1">-->
<!--    Отложить-->
<!--    <i class="fa-solid fa-reply"></i> {{ context.actions_hold }}-->
<!--  </div>-->

  <div type="button" class="btn btn-outline-light me-3 d-none d-xl-inline">
    <span class="d-none d-xl-inline">
      Карты
    </span>
    <i class="fa-solid fa-hand"></i>
    {{ cards.length }} / {{ context.hand_size }}
  </div>

  <Deck
      :context="context"
      :decks="decks"
      :deck_name="DECK_NAME_STRENGTHENING"
      title="Усиление"
      icon="fa-solid fa-hand-fist"
      @takeCardEvent="takeCard"
  />

  <Deck
      :context="context"
      :decks="decks"
      :deck_name="DECK_NAME_SOLUTION"
      title="Решение"
      icon="fa-solid fa-list-check"
      @takeCardEvent="takeCard"
  />

  <Deck
      :context="context"
      :decks="decks"
      :deck_name="DECK_NAME_EFFICIENCY"
      title="Эффективность"
      icon="fa-solid fa-gears"
      @takeCardEvent="takeCard"
  />

  <Deck
      :context="context"
      :decks="decks"
      :deck_name="DECK_NAME_SUPER_PROJECT"
      title="Супер проект"
      icon="fa-solid fa-chart-line"
      @takeCardEvent="takeCard"
  />

  <Deck
      :context="context"
      :decks="decks"
      :deck_name="DECK_NAME_PROPAGANDA"
      title="Пропаганда"
      icon="fa-solid fa-book"
      @takeCardEvent="takeCard"
  />

</template>

<script>
import {
  DECK_NAME_EFFICIENCY,
  DECK_NAME_PROPAGANDA,
  DECK_NAME_SOLUTION,
  DECK_NAME_STRENGTHENING,
  DECK_NAME_SUPER_PROJECT
} from "@/const";
import Deck from "@/components/Deck.vue";

export default {
  name: "Decks",
  components: {Deck},
  emits: ["takeCardEvent", "finishYearEvent"],
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
    DECK_NAME_PROPAGANDA() {
      return DECK_NAME_PROPAGANDA
    },
  },
  methods: {
    takeCard(deck_name) {
      this.$emit('takeCardEvent', deck_name);
    }
  },
  props: ['context', 'cards', 'decks',]
}
</script>
