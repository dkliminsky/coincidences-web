<template>

  <span id="electivity-badge" class="game-badge-electivity game-button badge text-bg-success ms-1 me-3"
        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" :data-bs-title="tooltip_html()">
    <i :class="card_labels_config[LABEL_ELECTIVITY()].info.fontawesome_icon"></i>&nbsp;
    <span class="d-none d-lg-inline">
      Срок
    </span>
    <span v-if="electivity.is_castling">
      <i class="fa-solid fa-rotate-left"></i>
      {{ electivity.term_year_left }}
    </span>
    <span v-else-if="electivity.is_no_electivity">
      -
    </span>
    <span v-else-if="electivity.term_year_left">
      {{ electivity.term_year_left }} | {{ electivity.term_counts - electivity.term_number }}
    </span>
  </span>
</template>

<script>
import {Tooltip} from "bootstrap";
import {LABEL_ELECTIVITY} from "@/const";

export default {
  name: "ElectivityBadge",
  props: ['electivity', 'card_labels_config' ],
  methods: {
    LABEL_ELECTIVITY() {
      return LABEL_ELECTIVITY
    },
    tooltip_html() {
      if (this.electivity.is_castling) {
        return 'Количество ходов до конца срока приемника';
      }

      if (this.electivity.is_no_electivity) {
        return 'Выборы отсутствуют';
      }

      return 'Количество ходов до конца срока | Оставшееся количество переизбраний';
    },
  },
  mounted() {
    // let tooltip = new Tooltip(document.getElementById("electivity-badge"));
    let tooltip = new Tooltip("#electivity-badge");
  }
}
</script>
