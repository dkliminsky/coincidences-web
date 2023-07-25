<template>
  <tr>
    <td>
      <DecreeIcon
          :name="degree.name"
          :degrees_config="degrees_config"
          color="primary"
      />
    </td>
    <td class="text-nowrap d-none d-lg-table-cell">
      {{ degree_config.info.title }}
    </td>
    <td class="text-nowrap d-lg-none">
      {{ degree_config.info.title_short }}
    </td>
    <td style="width: 100%; min-width: 80px;">
      <div class="progress" role="progressbar" :aria-label="degree.name" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div :class="'progress-bar progress-bar-striped progress-bar-animated bg-' + color()" :style="'width:' + percent() + '%'"></div>
      </div>
    </td>

    <td class="text-nowrap">

      <span class="badge badge-number text-bg-dark">{{ degree.value }}</span>

      <template v-if="degree_type === DEGREE_TYPE_POWER() || degree_type === DEGREE_TYPE_PROBLEMS()">
        <span v-if="degree.protection > 0 " class="badge badge-icon text-bg-dark ms-1">
          <i class="fa-solid fa-shield"></i>
  <!--        {{ degree.protection }}-->
        </span>
        <span v-if="degree.impact > 0 " class="badge badge-icon text-bg-dark ms-1">
          <i class="fa-solid fa-bolt"></i>
  <!--        {{ degree.impact }}-->
        </span>
        <span class="badge badge-icon text-bg-dark ms-1">
          <i :class="trend_icon()"></i>
          {{ degree.trend }} ( {{ change_probability() }}% )
        </span>
      </template>

    </td>

  </tr>
</template>

<script>
import {
  BENEFIT_DIRECTION_DECREASE,
  BENEFIT_DIRECTION_INCREASE,
  DEGREE_NAME_CRISIS,
  DEGREE_TYPE_POWER,
  DEGREE_TYPE_PROBLEMS
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
    color: function () {
      if (this.degree.name === DEGREE_NAME_CRISIS) {
        return "danger";
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
    }
  },
  props: ['degree', 'degrees_config', 'degree_type']

}
</script>
