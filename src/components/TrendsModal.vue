<template xmlns="http://www.w3.org/1999/html">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <template v-if="context.phase === GAME_PHASE_WIN() || context.phase === GAME_PHASE_LOSE()">
        <template v-for="message in messages">
          <template v-if="message.type === MESSAGE_TYPE_GAME_WIN() || message.type === MESSAGE_TYPE_GAME_LOSE()">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title">{{ message.text.title }}</h1>
              </div>

              <div class="modal-body">
                <template v-if="message.type === MESSAGE_TYPE_GAME_WIN()">
                  {{ message.text.description }}
                </template>

                <template v-if="message.type === MESSAGE_TYPE_GAME_LOSE()">
                  {{ message.text.description }}
                </template>
              </div>

              <div v-if="context" class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push({name: 'home'})">Ок</button>
              </div>
            </div>
          </template>
        </template>
      </template>

      <template v-else>

        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">События</h1>
          </div>

          <div class="modal-body">
            <template v-for="message in messages">

              <template v-if="message.type === MESSAGE_TYPE_NEW_GAME()">
                <h2 class="modal-title mt-3">{{ message.text.title }}</h2>
                {{ message.text.description }}
              </template>

              <template v-if="message.type === MESSAGE_TYPE_TERM()">
                  <h2 class="modal-title mt-3">{{ message.text.title }}</h2>
                  <p>{{ message.text.description }}</p>

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
                  <h2 class="modal-title mt-3">{{ message.event.text.title }}</h2>
                  <p>{{ message.event.text.description }}</p>

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
                  <h2 class="modal-title mt-3">{{ message.text.title }}</h2>

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

              <hr class="bg-danger border-2 border-top border-secondary vertical-line">
            </template>
          </div>

          <div v-if="context" class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('closeMessagesModalEvent')">Ок</button>
          </div>
        </div>
      </template>

    </div>
</template>

<script>


import Effect from "@/components/Effect.vue";
import {
  GAME_PHASE_LOSE, GAME_PHASE_WIN,
  MESSAGE_TYPE_CHANGES,
  MESSAGE_TYPE_EVENT, MESSAGE_TYPE_GAME_LOSE,
  MESSAGE_TYPE_GAME_WIN,
  MESSAGE_TYPE_NEW_GAME,
  MESSAGE_TYPE_TERM
} from "@/const";

export default {
  name: "TrendsModal",
  components: {Effect},
  computed: {

  },
  methods: {
    GAME_PHASE_WIN() {
      return GAME_PHASE_WIN
    },
    GAME_PHASE_LOSE() {
      return GAME_PHASE_LOSE
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

