<template>
  <tr>
    <td>
      <DecreeIcon :name="degree.name"/>
    </td>
    <td class="text-nowrap">
      {{ degree_info.title }}
    </td>
    <td style="width: 100%; min-width: 120px;">
      <div class="progress" role="progressbar" :aria-label="degree.name" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div :class="'progress-bar progress-bar-striped progress-bar-animated bg-' + color()" :style="'width:' + percent() + '%'"></div>
      </div>
    </td>
    <td>
      <span class="badge text-bg-dark me-2" style="width: 32px;">{{ degree.value }}</span>
    </td>
  </tr>
</template>

<script>
import {BENEFIT_DIRECTION_DECREASE, BENEFIT_DIRECTION_INCREASE, DEGREES} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  name: "Degree",
  components: {DecreeIcon},
  data() {
    return {

    }
  },
  computed: {
    degree_info() {
      return DEGREES[this.degree.name]
    },
  },
  methods: {
    percent: function() {
      return this.degree.value / this.degree_info.valueMax * 100;
    },
    color: function () {
      if (this.degree_info.benefitDirection === BENEFIT_DIRECTION_DECREASE) {
        if (this.percent > 90) {
          return "danger";
        } else if (this.percent > 70) {
          return "warning";
        } else {
          return "info";
        }
      }
      else if (this.degree_info === BENEFIT_DIRECTION_INCREASE) {
        if (this.percent < 10) {
          return "danger";
        } else if (this.percent < 30) {
          return "warning";
        } else {
          return "info";
        }
      }
    }
  },
  props: ['degree']

}
</script>
