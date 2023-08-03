<template>

  <span id="electivity-badge" class="badge text-bg-success ms-1"
        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" :data-bs-title="tooltip_html()">
    <i class="fa-solid fa-book"></i>&nbsp;
    <span class="d-none d-lg-inline">
      Срок
    </span>
    <span v-if="electivity.is_castling">
      <i class="fa-solid fa-rotate-left"></i>
      {{ electivity.term_year_left }}
    </span>
    <span v-if="electivity.is_no_electivity">
      -
    </span>
    <span v-if="electivity.term_year_left">
      {{ electivity.term_year_left }} | {{ electivity.term_counts - electivity.term_number }}
    </span>
  </span>
</template>

<script>
import {Tooltip} from "bootstrap";

export default {
  name: "ElectivityBadge",
  props: ['electivity', ],
  methods: {
    tooltip_html() {
      return 'Количество лет до конца срока | Оставшееся количество переизбраний';
    },
  },
  mounted() {
    // let tooltip = new Tooltip(document.getElementById("electivity-badge"));
    let tooltip = new Tooltip("#electivity-badge");
  }
}
</script>

<style scoped>

</style>