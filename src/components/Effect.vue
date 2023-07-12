<template>

  <i :class="effect_config().info.fontawesome_icon"></i>&nbsp;

  <span v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE()">
    {{ effect.title }}
<!--    {{ degrees_config[effect.degree_name].info.title }}: -->
    [
    <i :class="degrees_config[effect.degree_name].info.fontawesome_icon"></i>&nbsp;
    {{ degrees_config[effect.degree_name].info.title_short }}
    {{ shift_value() }}
    ]
  </span>
  <span v-else-if="effect.type === EFFECT_TYPE_PROTECT_DEGREE()">
    {{ degree_config().info.title }}
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
  EFFECT_TYPE_SHIFT_DEGREE
} from "@/const";

export default {
  name: "Effect",
  methods: {
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
    effect_config() {
      return this.effects_config[this.effect.type];
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
  props: ['effect', 'effects_config', 'degrees_config']
}
</script>

<style scoped>

</style>