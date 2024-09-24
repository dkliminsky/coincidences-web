<template>

  <span v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE()">
    <DecreeIcon
        :name="effect.degree_name"
        :degrees_config="degrees_config"
        color="primary"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[effect.degree_name].info.title }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ shiftValue(effect.shift_value) }}</span>
  </span>

  <div v-else-if="effect.type === PROPAGANDA()">
    <DecreeIcon
        :name="effect.degree_name"
        :degrees_config="degrees_config"
        color="primary"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degree_title(effect.degree_name) }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ effect.shift_value }}</span>
  </div>

  <span v-else-if="effect.type === EFFECT_TYPE_TAKE_ACTION_BY_CODE()">
    <span class="game-badge-icon badge text-bg-success"><i class="fa-solid fa-circle-down"></i></span>
    <span class="badge text-bg-secondary">{{ cards_map[effect.code].text.title }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE()">
    <span class="game-badge-icon badge text-bg-success"><i class="fa-solid fa-circle-down"></i></span>
    <span class="badge text-bg-secondary">{{ cards_map[effect.code].text.title }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_CIRCUMSTANCE()">
    <DecreeIcon
        :name="trends_config[effect.trend_code].degree_name"
        :degrees_config="degrees_config"
        color="warning"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[trends_config[effect.trend_code].degree_name].info.title }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ shiftValue(trends_config[effect.trend_code].value) }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_APPEAR_ACTOR()">
    <DecreeIcon
        :name="trends_config[effect.trend_code].degree_name"
        :degrees_config="degrees_config"
        color="warning"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[trends_config[effect.trend_code].degree_name].info.title }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ shiftValue(trends_config[effect.trend_code].value) }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_DISAPPEAR_ACTOR()">
    <DecreeIcon
        :name="trends_config[effect.trend_code].degree_name"
        :degrees_config="degrees_config"
        color="warning"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[trends_config[effect.trend_code].degree_name].info.title }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ shiftValue(-trends_config[effect.trend_code].value) }}</span>
  </span>

  <span v-else-if="effect.type === EFFECT_TYPE_PERSON()">
    <DecreeIcon
        :name="trends_config[effect.trend_code].degree_name"
        :degrees_config="degrees_config"
        color="warning"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[trends_config[effect.trend_code].degree_name].info.title }}</span>
    <span class="game-badge-number badge text-bg-dark me-1">{{ shiftValue(trends_config[effect.trend_code].value) }}</span>
  </span>

<!--  <span v-else>-->
<!--    For debug: {{ effect.type }}-->
<!--  </span>-->

</template>

<script>

import {
  EFFECT_TYPE_APPEAR_ACTOR, EFFECT_TYPE_CIRCUMSTANCE, EFFECT_TYPE_DISAPPEAR_ACTOR, EFFECT_TYPE_PERSON,
  EFFECT_TYPE_SHIFT_DEGREE, EFFECT_TYPE_TAKE_ACTION_BY_CODE, EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE, PROPAGANDA
} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  name: "Effect",
  components: {DecreeIcon},
  methods: {
    EFFECT_TYPE_PERSON() {
      return EFFECT_TYPE_PERSON
    },
    EFFECT_TYPE_DISAPPEAR_ACTOR() {
      return EFFECT_TYPE_DISAPPEAR_ACTOR
    },
    PROPAGANDA() {
      return PROPAGANDA
    },
    EFFECT_TYPE_CIRCUMSTANCE() {
      return EFFECT_TYPE_CIRCUMSTANCE
    },
    EFFECT_TYPE_APPEAR_ACTOR() {
      return EFFECT_TYPE_APPEAR_ACTOR
    },
    EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE() {
      return EFFECT_TYPE_TAKE_TEMP_ACTION_BY_CODE
    },
    EFFECT_TYPE_TAKE_ACTION_BY_CODE() {
      return EFFECT_TYPE_TAKE_ACTION_BY_CODE
    },
    EFFECT_TYPE_SHIFT_DEGREE() {
      return EFFECT_TYPE_SHIFT_DEGREE
    },
    degree_config() {
      return this.degrees_config[this.effect.degree_name];
    },
    degree_title(name) {
      return this.degrees_config[name].info.title;
    },
    shiftValue(value) {
      if (value > 0) {
        return '+' + value.toString();
      }
      else {
        return value;
      }
    },
  },
  mounted() {
  },
  props: ['effect', 'degrees_config', 'trends_config', 'cards_map']
}
</script>
