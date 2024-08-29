<template xmlns="http://www.w3.org/1999/html">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div v-if="degree_name" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title">{{ degree_config().info.title }}</h1>
        </div>

        <div class="modal-body">
          <p v-for="trend in degree().trends" class="mb-0">
            <template v-if="trend.value">
              <template v-if="trend.type === TREND_TYPE_LINK()">
                <DecreeIcon
                    :name="trends_config[trend.code].degree_from"
                    :degrees_config="degrees_config"
                    color="warning"
                    is_button=false
                />
              </template>
              <template v-else-if="trend.type === TREND_TYPE_CONSTANT()">
                <span class="game-badge-icon badge text-bg-warning">
                  <i :class="TREND_CONSTANT_ICON()"></i>
                </span>
              </template>
              <template v-else-if="trend.type === TREND_TYPE_CIRCUMSTANCE()">
                <span class="game-badge-icon badge text-bg-warning">
                  <i :class="TREND_CIRCUMSTANCE_ICON()"></i>
                </span>
              </template>
              <template v-else-if="trend.type === TREND_TYPE_PERSON()">
                <span class="game-badge-icon badge text-bg-warning">
                  <i :class="TREND_PERSON_ICON()"></i>
                </span>
              </template>
              <template v-else-if="trend.type === TREND_TYPE_ACTOR()">
                <span class="game-badge-icon badge text-bg-warning">
                  <i :class="TREND_ACTOR_ICON()"></i>
                </span>
              </template>

              <span class="badge text-bg-secondary">{{ trends_config[trend.code].text.title }}</span>
              <span class="game-badge-number badge text-bg-dark me-1">{{ shiftValue(trend.value) }}</span>
            </template>
          </p>
          <p class="mt-3">
            <template v-if="degree().trend > 0">
              Вероятность повышения: {{ change_probability() }}%
            </template>
            <template v-else-if="degree().trend < 0">
              Вероятность понижения: {{ change_probability() }}%
            </template>
            <template v-else>
              Вероятность изменения: {{ change_probability() }}%
            </template>
          </p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ок</button>
        </div>
      </div>

  </div>
</template>

<script>
import {
  TREND_ACTOR_ICON, TREND_CIRCUMSTANCE_ICON,
  TREND_CONSTANT_ICON,
  TREND_PERSON_ICON,
  TREND_TYPE_ACTOR, TREND_TYPE_CIRCUMSTANCE,
  TREND_TYPE_CONSTANT,
  TREND_TYPE_LINK,
  TREND_TYPE_PERSON
} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  name: "TrendsModal",
  components: {DecreeIcon},
  computed: {

  },
  methods: {
    TREND_CIRCUMSTANCE_ICON() {
      return TREND_CIRCUMSTANCE_ICON
    },
    TREND_TYPE_CIRCUMSTANCE() {
      return TREND_TYPE_CIRCUMSTANCE
    },
    TREND_ACTOR_ICON() {
      return TREND_ACTOR_ICON
    },
    TREND_PERSON_ICON() {
      return TREND_PERSON_ICON
    },
    TREND_TYPE_ACTOR() {
      return TREND_TYPE_ACTOR
    },
    TREND_TYPE_PERSON() {
      return TREND_TYPE_PERSON
    },
    TREND_CONSTANT_ICON() {
      return TREND_CONSTANT_ICON
    },
    TREND_TYPE_LINK() {
      return TREND_TYPE_LINK
    },
    TREND_TYPE_CONSTANT() {
      return TREND_TYPE_CONSTANT
    },
    degree() {
      return this.degrees[this.degree_name];
    },
    degree_config() {
      return this.degrees_config[this.degree_name];
    },
    change_probability: function() {
      return Math.round(Math.abs(this.degree().change_probability) * 100);
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
  emits: [],
  props: ['degrees', 'degrees_config', 'trends_config', 'degree_name'],
}
</script>

