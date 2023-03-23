<template>
  <tr>
    <td>
      <DecreeIcon
          :name="degree.name"
          :degrees_config="degrees_config"
          color="primary"
      />
    </td>
    <td class="text-nowrap d-none d-lg-inline">
      {{ degree_config.info.title }}
    </td>
    <td class="text-nowrap d-lg-none">
      {{ degree_config.info.title_short }}
    </td>
    <td style="width: 100%; min-width: 120px;">
      <div class="progress" role="progressbar" :aria-label="degree.name" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div :class="'progress-bar progress-bar-striped progress-bar-animated bg-' + color()" :style="'width:' + percent() + '%'"></div>
      </div>
    </td>
    <td class="text-nowrap">
      <span class="badge badge-number text-bg-dark me-2">{{ degree.value }}</span>
      <span v-if="degree.protection > 0" class="badge badge-icon text-bg-dark me-2">
        <i class="fa-solid fa-shield"></i>
        {{ degree.protection }}
      </span>
    </td>
  </tr>
</template>

<script>
import {BENEFIT_DIRECTION_DECREASE, BENEFIT_DIRECTION_INCREASE} from "@/const";
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
    percent: function() {
      return this.degree.value / this.degree_config.value_max * 100;
    },
    color: function () {
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
  props: ['degree', 'degrees_config']

}
</script>
