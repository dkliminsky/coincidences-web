<template>
<!--  <div type="button" class="btn btn-outline-success me-1 d-none d-xl-inline">-->
<!--    <span :class="wide_class">{{ title }}</span> <i :class="icon"></i>-->
<!--    {{ decks[deck_name].deck_size }}/{{ decks[deck_name].hold_size }}-->
<!--  </div>-->

  <button v-if="decks[deck_name].can_take" @click="$emit('takeCardEvent', deck_name)" class="btn btn-success me-1">
    <i :class="icon"></i> <span :class="wide_class">{{ title }}</span> <i class="fa-regular fa-circle-down"></i> <span :class="wide_class">{{ context.actions_take }}</span>
  </button>
  <button v-else class="btn btn-outline-light me-1 disabled">
    <i :class="icon"></i> <span :class="wide_class">{{ title }}</span> <i class="fa-regular fa-circle-down"></i> <span :class="wide_class">{{ context.actions_take }}</span>
  </button>
</template>

<script>
export default {
  name: "Deck",
  computed: {
    wide_class() {
      return "d-none d-xl-inline";
    },
    mobile_class() {
      return "d-none d-xl-inline";
    },

  },
  emits: ["takeCardEvent",],
  props: ['context', 'decks', 'deck_name', 'title', 'icon']
}
</script>
