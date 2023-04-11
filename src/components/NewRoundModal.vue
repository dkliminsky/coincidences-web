<template>
  <div id="new-round-modal" class="modal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Событие</h5>
        </div>
        <div class="modal-body">

          <span v-if="new_events.length">
            <h6>
              {{ new_events[0].info.title }}
            </h6>

            <p>
              {{ new_events[0].info.description_base }}
            </p>

            <p>
              {{ new_events[0].info.description_partial }}
            </p>
          </span>

          <div class="alert alert-dark" role="alert">
            <h6>Последствия события</h6>
            <template v-for="effect in new_effects">
              <p v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE_EVENT()" class="mb-0">
                <Effect
                    :effect="effect"
                    :effects_config="effects_config"
                    :degrees_config="degrees_config"
                />
              </p>
            </template>
          </div>

          <div class="alert alert-dark" role="alert">
            <h6>Случайные последствия</h6>
            <template v-for="effect in new_effects">
              <p v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE_RANDOM()" class="mb-0" >
                <Effect
                    :effect="effect"
                    :effects_config="effects_config"
                    :degrees_config="degrees_config"
                />
              </p>
            </template>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('closeNewRoundModalEvent')">Ок</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


import Effect from "@/components/Effect.vue";
import {EFFECT_TYPE_SHIFT_DEGREE_EVENT, EFFECT_TYPE_SHIFT_DEGREE_RANDOM} from "@/const";

export default {
  name: "NewRoundModal",
  components: {Effect},
  computed: {

  },
  methods: {
    EFFECT_TYPE_SHIFT_DEGREE_EVENT() {
      return EFFECT_TYPE_SHIFT_DEGREE_EVENT
    },
    EFFECT_TYPE_SHIFT_DEGREE_RANDOM() {
      return EFFECT_TYPE_SHIFT_DEGREE_RANDOM
    }

  },
  emits: ['closeNewRoundModalEvent'],
  props: ['new_events', 'new_effects', 'effects_config', 'degrees_config'],
}
</script>

<style scoped>

</style>