<template>
  <span class="text-nowrap">
    <DecreeIcon
        :name="name"
        :degrees_config="degrees_config"
        color="primary"
        is_button=false
    />
    <span class="badge text-bg-secondary">{{ degrees_config[name].info.title }}</span>
  </span>
</template>

<script>
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  name: "HelpDegree",
  components: {DecreeIcon},
  computed: {
  },
  methods: {
  },
  props: ['name', 'degrees_config', ]
}
</script>
