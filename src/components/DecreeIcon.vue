<template>
  <span class="badge text-bg-primary" style="width: 32px;">
    <span :class="degree_icon(name)"></span>
  </span>
</template>

<script>
export default {
  name: "DecreeIcon",
  methods: {
    degree_icon(name) {
      return this.degrees_config[name].info.fontawesome_icon;
    },
  },
  props: ['name', 'degrees_config']
}
</script>

<style scoped>

</style>