<template>
  <div v-bind:id="effect.id" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">

      <i class="fa-solid fa-square-check"></i>&nbsp;text

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
  EFFECT_TYPE_SHIFT_DEGREE
} from "@/const";

export default {
  name: "EffectToast",
  methods: {
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
  props: ['effect', 'degrees_config']
}
</script>

<style scoped>

</style>