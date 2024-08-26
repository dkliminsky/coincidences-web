<template>
  <tr>
    <td>
      <DecreeIcon
          :name="degree.name"
          :degrees_config="degrees_config"
          color="primary"
          is_button=true
      />
    </td>
    <td class="text-nowrap d-none d-lg-table-cell">
      {{ degree_config.info.title }}
    </td>
    <td class="text-nowrap d-lg-none">
      {{ degree_config.info.title_short }}
    </td>
    <td style="width: 100%; min-width: 40px;">
      <div class="progress" role="progressbar" :aria-label="degree.name" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div :class="'progress-bar progress-bar-striped progress-bar-animated bg-' + color()" :style="'width:' + percent() + '%'"></div>
      </div>
    </td>

    <td class="text-nowrap">

      <span class="game-badge-number badge text-bg-dark">{{ degree.value }}</span>

      <template v-if="degree_type === DEGREE_TYPE_POWER() || degree_type === DEGREE_TYPE_PROBLEMS()">
        <span class="game-badge-trend game-button badge text-bg-warning ms-1" @click="showTrendsModal(degree.name)">
          <i :class="trend_icon()"></i>
          {{ degree.trend }}
<!--          <span class="d-none d-sm-inline">-->
<!--            ( {{ change_probability() }}% )-->
<!--          </span>-->
        </span>
        <template v-for="trend in degree.trends">
          <span v-if="trend.value !== 0" class="game-badge-icon badge text-bg-dark ms-1 d-none d-sm-inline">
            <template v-if="trend.type === TREND_TYPE_CONSTANT()">
              <i :class="TREND_CONSTANT_ICON()"></i>
            </template>
            <template v-else-if="trend.type === TREND_TYPE_PERSON()">
              <i :class="TREND_PERSON_ICON()"></i>
            </template>
            <template v-else-if="trend.type === TREND_TYPE_ACTOR()">
              <i :class="TREND_ACTOR_ICON()"></i>
            </template>
            <template v-else-if="trend.type === TREND_TYPE_LINK()">
              <i :class="trend_link_icon(trend)"></i>
            </template>

            {{ trend.value }}
          </span>
        </template>

      </template>

    </td>

  </tr>
</template>

<script>
import {
  BENEFIT_DIRECTION_DECREASE,
  BENEFIT_DIRECTION_INCREASE,
  DEGREE_NAME_CRISIS,
  DEGREE_NAME_EGO,
  DEGREE_TYPE_POWER,
  DEGREE_TYPE_PROBLEMS, TREND_ACTOR_ICON,
  TREND_CONSTANT_ICON,
  TREND_PERSON_ICON,
  TREND_TYPE_ACTOR,
  TREND_TYPE_CONSTANT,
  TREND_TYPE_LINK,
  TREND_TYPE_PERSON
} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  name: "Degree",
  components: {DecreeIcon},
  data() {
    return {

    }
  },
  computed: {
    degree_config() {
      return this.degrees_config[this.degree.name]
    },
  },
  methods: {
    TREND_ACTOR_ICON() {
      return TREND_ACTOR_ICON
    },
    TREND_PERSON_ICON() {
      return TREND_PERSON_ICON
    },
    TREND_CONSTANT_ICON() {
      return TREND_CONSTANT_ICON
    },
    TREND_TYPE_LINK() {
      return TREND_TYPE_LINK
    },
    TREND_TYPE_ACTOR() {
      return TREND_TYPE_ACTOR
    },
    TREND_TYPE_PERSON() {
      return TREND_TYPE_PERSON
    },
    TREND_TYPE_CONSTANT() {
      return TREND_TYPE_CONSTANT
    },
    DEGREE_TYPE_PROBLEMS() {
      return DEGREE_TYPE_PROBLEMS
    },
    DEGREE_TYPE_POWER() {
      return DEGREE_TYPE_POWER
    },
    percent: function() {
      return this.degree.value / this.degree_config.value_max * 100;
    },
    change_probability: function() {
      return Math.round(Math.abs(this.degree.change_probability) * 100);
    },
    trend_icon: function() {
      if (this.degree.trend > 0) {
        return 'fa-solid fa-arrow-up';
      }
      else if (this.degree.trend < 0) {
        return 'fa-solid fa-arrow-down';
      }
      return '';
    },
    degree_icon(name) {
      return this.degrees_config[name].info.fontawesome_icon;
    },
    trend_link_icon(link_trends) {
      let trend_config = this.trends_config[link_trends.code];
      return this.degrees_config[trend_config.degree_from].info.fontawesome_icon;
    },
    color: function () {
      if (this.degree.name === DEGREE_NAME_CRISIS) {
        return "danger";
      }
      if (this.degree.name === DEGREE_NAME_EGO) {
        if (this.degree.value > 6) {
          return "info";
        }
        else if (this.degree.value > 3) {
          return "warning";
        }
        else {
          return "danger";
        }
      }

      if (this.degree_config.info.benefit_direction === BENEFIT_DIRECTION_DECREASE) {
        if (this.percent() > 90) {
          return "danger";
        } else if (this.percent() > 70) {
          return "warning";
        } else {
          return "info";
        }
      }
      else if (this.degree_config.info.benefit_direction === BENEFIT_DIRECTION_INCREASE) {
        if (this.percent() < 10) {
          return "danger";
        } else if (this.percent() < 30) {
          return "warning";
        } else {
          return "info";
        }
      }
    },
    showTrendsModal(degree_name) {
      this.$emit('showTradesModalEvent', degree_name);
    },
  },
  emits: ['showTradesModalEvent', ],
  props: ['degree', 'degrees_config', 'trends_config', 'degree_type']

}
</script>
