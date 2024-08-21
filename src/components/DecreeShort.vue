<template>
  <span :class="icon_class">
    <i :class="degree_icon(name)"></i> {{ degrees[name].value }}
  </span>
</template>

<script>
export default {
  name: "DecreeShort",
  computed: {
    icon_class() {
      return "game-badge-icon badge me-1 text-bg-" + this.color;
    },
  },
  methods: {
    degree_icon(name) {
      return this.degrees_config[name].info.fontawesome_icon;
    },
  },
  props: ['name', 'degrees_config', 'degrees', 'color']
}
</script>
