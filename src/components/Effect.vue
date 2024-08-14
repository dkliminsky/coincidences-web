<template>

  <span v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE()">
    <i :class="degrees_config[effect.degree_name].info.fontawesome_icon"></i>&nbsp;
    {{ degrees_config[effect.degree_name].info.title }}
    {{ shift_value() }}
  </span>
  <span v-else-if="effect.type === EFFECT_TYPE_PROTECT_DEGREE()">
    {{ degree_config().info.title }}
  </span>
  <span v-else-if="effect.type === EFFECT_TYPE_TAKE_ACTION_BY_CODE()">
    <i class="fa-solid fa-circle-down"></i>
    Получена карта "{{ cards_map[effect.code].text.title }}"
  </span>
  <span v-else-if="effect.type === EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE()">
    <i class="fa-solid fa-circle-down"></i>
    Получена временная карта "{{ cards_map[effect.code].text.title }}"
  </span>
  <span v-else>
    {{ effect.type }}
  </span>

</template>

<script>

import {
  EFFECT_TYPE_INCREASE_HAND,
  EFFECT_TYPE_INCREASE_HOLD, EFFECT_TYPE_INCREASE_TAKE,
  EFFECT_TYPE_PROTECT_DEGREE,
  EFFECT_TYPE_SHIFT_DEGREE, EFFECT_TYPE_TAKE_ACTION_BY_CODE, EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE
} from "@/const";

export default {
  name: "Effect",
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
