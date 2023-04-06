<template>
  <div v-bind:id="effect.id" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">

      <i :class="effect_config().info.fontawesome_icon"></i>&nbsp;

      <span v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE()">
        {{ degree_config().info.title }} {{ shift_value() }}
      </span>
      <span v-else-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE_EVENT()">
        {{ degree_config().info.title }} {{ shift_value() }}
      </span>
      <span v-else-if="effect.type === EFFECT_TYPE_PROTECT_DEGREE()">
        {{ degree_config().info.title }}
      </span>
      <span v-else-if="effect.type === EFFECT_TYPE_INCREASE_HAND()">
        {{ effect_config().info.title }}
      </span>
      <span v-else-if="effect.type === EFFECT_TYPE_INCREASE_HOLD()">
        {{ effect_config().info.title }}
      </span>
      <span v-else-if="effect.type === EFFECT_TYPE_INCREASE_TAKE()">
        {{ effect_config().info.title }}
      </span>

<!--      <button type="button" class="btn btn-primary" data-bs-dismiss="toast">OK</button>-->
<!--      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>-->
    </div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";
import {
  EFFECT_TYPE_INCREASE_HAND,
  EFFECT_TYPE_INCREASE_HOLD, EFFECT_TYPE_INCREASE_TAKE,
  EFFECT_TYPE_PROTECT_DEGREE,
  EFFECT_TYPE_SHIFT_DEGREE, EFFECT_TYPE_SHIFT_DEGREE_EVENT
} from "@/const";

export default {
  name: "Effect",
  methods: {
    EFFECT_TYPE_SHIFT_DEGREE_EVENT() {
      return EFFECT_TYPE_SHIFT_DEGREE_EVENT
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
    let toast = new Toast(document.getElementById(this.effect.id), {delay: 3000});
    toast.show();
  },
  props: ['effect', 'effects_config', 'degrees_config']
}
</script>

<style scoped>

</style>