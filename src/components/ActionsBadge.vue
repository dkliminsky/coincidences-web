<template>
  <span v-if="context.phase === GAME_PHASE_TAKING_CARDS()">
    <span class="game-badge-icon game-button badge text-bg-success me-1">
      <i class="fa-solid fa-circle-down"></i>
      {{ context.actions_take }}
    </span>
  </span>

<!--  <span v-if="context.phase === GAME_PHASE_APPLYING_CARDS()">-->
    <span class="game-badge-icon game-button badge text-bg-info me-1 disabled">
      <i class="fa-solid fa-square-check"></i>
      {{ context.actions_apply }}
    </span>

    <span class="game-badge-icon game-button badge text-bg-info me-1">
      <i class="fa-solid fa-scale-balanced"></i>
      {{ context.actions_apply_law }}
    </span>

    <span v-if="context.is_war" class="game-badge-icon game-button badge text-bg-info me-1">
      <i class="fa-solid fa-person-rifle"></i>
      0
    </span>
<!--  </span>-->

  <!--        <span class="game-badge-icon game-button badge text-bg-warning me-1">-->
  <!--          <i class="fa-solid fa-reply"></i>-->
  <!--          {{ context.actions_discard }}-->
  <!--        </span>-->
</template>

<script>
import {Tooltip} from "bootstrap";
import {GAME_PHASE_APPLYING_CARDS, GAME_PHASE_TAKING_CARDS} from "@/const";

export default {
  name: "ActionsBadge",
  props: ['context', ],
  methods: {
    GAME_PHASE_APPLYING_CARDS() {
      return GAME_PHASE_APPLYING_CARDS
    },
    GAME_PHASE_TAKING_CARDS() {
      return GAME_PHASE_TAKING_CARDS
    },
    tooltip_html() {
      return 'Текущий ход / Сколько ходов до победы';
    },
  },
  mounted() {
    // let tooltip = new Tooltip(document.getElementById("rounds-badge"));
    let tooltip = new Tooltip("#rounds-badge");
  }
}
</script>
