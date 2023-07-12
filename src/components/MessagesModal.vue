<template xmlns="http://www.w3.org/1999/html">
  <div id="messages-modal" class="modal" tabindex="-1">
<!--  <div id="messages-modal" class="modal" tabindex="-1" data-bs-backdrop="static">-->
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div class="modal-content">
        <!--            <div class="modal-header">-->
        <!--              <h5 class="modal-title">Title</h5>-->
        <!--            </div>-->


<!--        <div class="modal-header">-->
<!--          <h5 class="modal-title">Событие</h5>-->
<!--        </div>-->
<!--        <div class="modal-body">-->

<!--          <span v-if="new_events.length">-->
<!--            <h6>-->
<!--              {{ new_events[0].info.title }}-->
<!--            </h6>-->

<!--            <p>-->
<!--              {{ new_events[0].info.description_base }}-->
<!--            </p>-->
<!--          </span>-->

<!--          <div class="alert alert-dark" role="alert">-->
<!--            <h6>Последствия события</h6>-->
<!--            <template v-for="effect in new_effects">-->
<!--              <p v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE_EVENT()" class="mb-0">-->
<!--                <Effect-->
<!--                    :effect="effect"-->
<!--                    :effects_config="effects_config"-->
<!--                    :degrees_config="degrees_config"-->
<!--                />-->
<!--              </p>-->
<!--            </template>-->
<!--          </div>-->

<!--          <div class="alert alert-dark" role="alert">-->
<!--            <h6>Случайные последствия</h6>-->
<!--            <template v-for="effect in new_effects">-->
<!--              <p v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE_RANDOM()" class="mb-0" >-->
<!--                <Effect-->
<!--                    :effect="effect"-->
<!--                    :effects_config="effects_config"-->
<!--                    :degrees_config="degrees_config"-->
<!--                />-->
<!--              </p>-->
<!--            </template>-->
<!--          </div>-->

<!--              text 1-->

<!--        </div>-->

        <template v-for="message in messages">

          <template v-if="message.type === MESSAGE_TYPE_EVENT()">

            <div class="modal-body">
              <h5 class="modal-title">Событие: {{ message.event.info.title }}</h5>
              {{ message.event.info.description_base }}

              <template v-for="effect in message.event.effects_base">
                <p class="mb-0" >
                  <Effect
                      :effect="effect"
                      :effects_config="effects_config"
                      :degrees_config="degrees_config"
                  />
                </p>
              </template>

            </div>
          </template>

          <template v-if="message.type === MESSAGE_TYPE_CHANGES()">
            <div class="modal-body">
              <h5 class="modal-title">Изменения</h5>

              <template v-for="effect in message.effects">
                <p class="mb-0" >
                  <Effect
                      :effect="effect"
                      :effects_config="effects_config"
                      :degrees_config="degrees_config"
                  />
                </p>
              </template>

            </div>
          </template>
        </template>

        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('closeMessagesModalEvent')">Ок</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>


import Effect from "@/components/Effect.vue";
import {MESSAGE_TYPE_CHANGES, MESSAGE_TYPE_EVENT} from "@/const";

export default {
  name: "MessagesModal",
  components: {Effect},
  computed: {

  },
  methods: {
    MESSAGE_TYPE_CHANGES() {
      return MESSAGE_TYPE_CHANGES
    },
    MESSAGE_TYPE_EVENT() {
      return MESSAGE_TYPE_EVENT
    },

  },
  emits: ['closeMessagesModalEvent'],
  props: ['messages', 'effects_config', 'degrees_config'],
}
</script>

<style scoped>

</style>