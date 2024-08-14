<template xmlns="http://www.w3.org/1999/html">
<!--  <div id="messages-modal" class="modal" tabindex="-1">-->
<!--  <div id="messages-modal" class="modal" tabindex="-1" data-bs-backdrop="static">-->
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div class="modal-content">
        <!--            <div class="modal-header">-->
        <!--              <h5 class="modal-title">Title</h5>-->
        <!--            </div>-->


        <div class="modal-body">

        <template v-for="message in messages">

          <template v-if="message.type === MESSAGE_TYPE_TERM()">
              <h5 class="modal-title mt-3">{{ message.text.title }}</h5>
              {{ message.text.description }}

              <template v-for="effect in message.effects">
                <p class="mb-0" >
                  <Effect
                      :effect="effect"
                      :degrees_config="degrees_config"
                      :cards_map="cards_map"
                  />
                </p>
              </template>

          </template>

          <template v-if="message.type === MESSAGE_TYPE_EVENT()">
              <h5 class="modal-title mt-3">{{ message.event.text.title }}</h5>
              {{ message.event.text.description }}

              <template v-for="effect in message.event.effects">
                <p class="mb-0" >
                  <Effect
                      :effect="effect"
                      :degrees_config="degrees_config"
                      :cards_map="cards_map"
                  />
                </p>
              </template>

          </template>

          <template v-if="message.type === MESSAGE_TYPE_CHANGES()">
              <h5 class="modal-title mt-3">{{ message.text.title }}</h5>

              <template v-for="effect in message.effects">
                <p class="mb-0" >
                  <Effect
                      :effect="effect"
                      :degrees_config="degrees_config"
                      :cards_map="cards_map"
                  />
                </p>
              </template>

          </template>

          <template v-if="message.type === MESSAGE_TYPE_NEW_GAME()">
              <h5 class="modal-title mt-3">{{ message.text.title }}</h5>
              {{ message.text.description }}
          </template>

          <template v-if="message.type === MESSAGE_TYPE_GAME_WIN()">
              <h5 class="modal-title mt-3">{{ message.text.title }}</h5>
              {{ message.text.description }}
          </template>

          <template v-if="message.type === MESSAGE_TYPE_GAME_LOSE()">
              <h5 class="modal-title mt-3">{{ message.text.title }}</h5>
              {{ message.text.description }}
          </template>

        </template>

        </div>

        <div v-if="context" class="modal-footer">
          <template v-if="context.phase === GAME_STATUS_WIN() || context.phase === GAME_STATUS_LOSE()">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$router.push({name: 'home'})">На главную</button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('newGameEvent')">Попробовать еще раз</button>
          </template>
          <template v-else>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('closeMessagesModalEvent')">Ок</button>
          </template>
        </div>
      </div>

    </div>
<!--  </div>-->
</template>

<script>


import Effect from "@/components/Effect.vue";
import {
  GAME_STATUS_LOSE, GAME_STATUS_WIN,
  MESSAGE_TYPE_CHANGES,
  MESSAGE_TYPE_EVENT, MESSAGE_TYPE_GAME_LOSE,
  MESSAGE_TYPE_GAME_WIN,
  MESSAGE_TYPE_NEW_GAME,
  MESSAGE_TYPE_TERM
} from "@/const";

export default {
  name: "MessagesModal",
  components: {Effect},
  computed: {

  },
  methods: {
    GAME_STATUS_WIN() {
      return GAME_STATUS_WIN
    },
    GAME_STATUS_LOSE() {
      return GAME_STATUS_LOSE
    },
    MESSAGE_TYPE_GAME_LOSE() {
      return MESSAGE_TYPE_GAME_LOSE
    },
    MESSAGE_TYPE_GAME_WIN() {
      return MESSAGE_TYPE_GAME_WIN
    },
    MESSAGE_TYPE_NEW_GAME() {
      return MESSAGE_TYPE_NEW_GAME
    },
    MESSAGE_TYPE_TERM() {
      return MESSAGE_TYPE_TERM
    },
    MESSAGE_TYPE_CHANGES() {
      return MESSAGE_TYPE_CHANGES
    },
    MESSAGE_TYPE_EVENT() {
      return MESSAGE_TYPE_EVENT
    },

  },
  emits: ['closeMessagesModalEvent', 'newGameEvent'],
  props: ['messages', 'context', 'degrees_config', 'cards_map'],
}
</script>

