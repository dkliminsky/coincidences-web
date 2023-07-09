<template>
  <button v-if="decks[deck_config.category].can_take" @click="$emit('takeCardEvent', { id: '356bb5bd-a355-4bac-9a08-758c18cef860'})" class="btn btn-success me-1">
    <i :class="deck_config.info.fontawesome_icon"></i> <span :class="wide_class">{{ deck_config.info.title }}</span> <i class="fa-regular fa-circle-down"></i>
<!--    <span :class="wide_class">{{ context.actions_take }}</span>-->
  </button>
  <button v-else class="btn btn-outline-light me-1 disabled">
    <i :class="deck_config.info.fontawesome_icon"></i> <span :class="wide_class">{{ deck_config.info.title }}</span> <i class="fa-regular fa-circle-down"></i>
<!--    <span :class="wide_class">{{ context.actions_take }}</span>-->
  </button>
</template>

<script>
export default {
  name: "Deck",
  computed: {
    wide_class() {
      return "d-none d-lg-inline";
    },
    mobile_class() {
      return "d-none d-lg-inline";
    },

  },
  emits: ["takeCardEvent",],
  props: ['context', 'decks', 'deck_config']
}
</script>
