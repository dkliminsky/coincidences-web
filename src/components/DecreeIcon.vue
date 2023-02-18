<template>
  <span class="badge text-bg-primary" style="width: 32px;">
    <span :class="DEGREES[name].icon"></span>
  </span>
</template>

<script>
import {DEGREES} from "@/const";

export default {
  name: "DecreeIcon",
  computed: {
    DEGREES() {
      return DEGREES
    }
  },
  props: ['name']
}
</script>

<style scoped>

</style>