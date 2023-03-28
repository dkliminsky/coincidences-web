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
      return "degree-icon badge badge-icon text-bg-" + this.color;
    },
  },
  methods: {
    degree_icon(name) {
      return this.degrees_config[name].info.fontawesome_icon;
    },
  },
  props: ['name', 'degrees_config', 'color']
}
</script>

<style scoped>
.degree-icon {
  width: 36px;
}
</style>