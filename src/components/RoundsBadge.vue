<template>
  <span id="rounds-badge" class="badge text-bg-success"
        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" :data-bs-title="tooltip_html()">
    <i class="fa-regular fa-calendar"></i>&nbsp;
    <span class="d-none d-lg-inline">
      Год
    </span>
    {{ context.year }} / {{ context.years_to_win }}
  </span>
</template>

<script>
import {Tooltip} from "bootstrap";

export default {
  name: "RoundsBadge",
  props: ['context', ],
  methods: {
    tooltip_html() {
      return 'Текущий раунд / Раундов до победы';
    },
  },
  mounted() {
    let tooltip = new Tooltip(document.getElementById("rounds-badge"));
  }
}
</script>

<style scoped>

</style>