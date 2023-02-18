<template>
  <tr>
    <td>
      <span :class="degree.icon"></span>
    </td>
    <td class="text-nowrap">
      {{ degree.title }}
    </td>
    <td style="width: 100%; min-width: 120px;">
      <div class="progress" role="progressbar" :aria-label="degree.name" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div :class="'progress-bar progress-bar-striped progress-bar-animated bg-' + color" :style="'width:' + percent + '%'"></div>
      </div>
    </td>
    <td>
      <span class="badge text-bg-dark me-2" style="width: 100%;">{{ degree.value }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Degree",
  data() {
    return {

    }
  },
  computed: {
    percent: function() {
      return this.degree.value / this.degree.valueMax * 100
    },
    color: function () {
      if (this.degree.benefitDirection === 'decrease') {
        if (this.percent > 90) {
          return "danger"
        } else if (this.percent > 70) {
          return "warning"
        } else {
          return "info"
        }
      }
      else if (this.degree.benefitDirection === 'increase') {
        if (this.percent < 10) {
          return "danger"
        } else if (this.percent < 30) {
          return "warning"
        } else {
          return "info"
        }
      }
    }
  },
  props: ['degree']

}
</script>
