<template>

  <span v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE()">
    <DecreeIcon
        :name="effect.degree_name"
        :degrees_config="degrees_config"
        color="primary"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[effect.degree_name].info.title }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ shift_value() }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_TAKE_ACTION_BY_CODE()">
    <span class="game-badge-icon badge text-bg-success"><i class="fa-solid fa-circle-down"></i></span>
    <span class="badge text-bg-secondary">{{ cards_map[effect.code].text.title }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE()">
    <span class="game-badge-icon badge text-bg-success"><i class="fa-solid fa-circle-down"></i></span>
    <span class="badge text-bg-secondary">{{ cards_map[effect.code].text.title }}</span>
  </span>

<!--  <span v-else-if="effect.type === EFFECT_TYPE_PROTECT_DEGREE()">-->
<!--    {{ degree_config().info.title }}-->
<!--  </span>-->

  <span v-else>
    For debug: {{ effect.type }}
  </span>

</template>

<script>

import {
  EFFECT_TYPE_INCREASE_HAND,
  EFFECT_TYPE_INCREASE_HOLD, EFFECT_TYPE_INCREASE_TAKE,
  EFFECT_TYPE_PROTECT_DEGREE,
  EFFECT_TYPE_SHIFT_DEGREE, EFFECT_TYPE_TAKE_ACTION_BY_CODE, EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE
} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  name: "Effect",
  components: {DecreeIcon},
  methods: {
    EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE() {
      return EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE
    },
    EFFECT_TYPE_TAKE_ACTION_BY_CODE() {
      return EFFECT_TYPE_TAKE_ACTION_BY_CODE
    },
    EFFECT_TYPE_INCREASE_TAKE() {
      return EFFECT_TYPE_INCREASE_TAKE
    },
    EFFECT_TYPE_INCREASE_HOLD() {
      return EFFECT_TYPE_INCREASE_HOLD
    },
    EFFECT_TYPE_INCREASE_HAND() {
      return EFFECT_TYPE_INCREASE_HAND
    },
    EFFECT_TYPE_PROTECT_DEGREE() {
      return EFFECT_TYPE_PROTECT_DEGREE
    },
    EFFECT_TYPE_SHIFT_DEGREE() {
      return EFFECT_TYPE_SHIFT_DEGREE
    },
    degree_config() {
      return this.degrees_config[this.effect.degree_name];
    },
    shift_value() {
      if (this.effect.shift_value > 0) {
        return '+' + this.effect.shift_value.toString();
      }
      return this.effect.shift_value;
    },
  },
  mounted() {
  },
  props: ['effect', 'degrees_config', 'cards_map']
}
</script>
