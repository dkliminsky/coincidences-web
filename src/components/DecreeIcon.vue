<template>
  <span :class="icon_class">
    <span :class="degree_icon(name)"></span>
  </span>
</template>

<script>
export default {
  name: "DecreeIcon",
  computed: {
    icon_class() {
      let result = "game-badge-icon badge text-bg-" + this.color;
      if (this.is_button === "true") {
        result += " game-button";
      }
      return result;
    },
  },
  methods: {
    degree_icon(name) {
      return this.degrees_config[name].info.fontawesome_icon;
    },
  },
  props: ['name', 'degrees_config', 'color', 'is_button']
}
</script>
