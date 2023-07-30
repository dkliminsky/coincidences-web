<template>
<!--  <div v-if="isReady()" id="messages-modal" class="modal" tabindex="-1">-->
  <div id="messages-modal" class="modal" tabindex="-1">
    <MessagesModal
        :messages="messages"
        :context="context"
        :degrees_config="config.degrees"
        :cards_map="cards_map"
        @closeMessagesModalEvent="closeMessagesModal"
        @newGameEvent="createGameRequest"
    />
  </div>

<!--  <div v-if="isReady()" class="toast-container position-fixed bottom-0 end-0 p-3">-->
<!--    <span v-for="effect in effects">-->
<!--      <EffectToast-->
<!--        :effect="effect"-->
<!--        :degrees_config="config.degrees"-->
<!--      />-->
<!--    </span>-->
<!--  </div>-->

  <nav v-if="isReady()" class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">

      <div>
        <RoundsBadge
          :context="context"
        />

        <ElectivityBadge
          v-if="electivity.is_no_electivity === false"
          :electivity="electivity"
        />

        <span class="ms-3 d-none d-xl-inline">
          <DecreeShort
              v-for="name in degreePowers"
              :name="name"
              :degrees_config="config.degrees"
              :degrees="degrees"
              color="light"
          />
        </span>

        <span class="ms-3 d-none d-xl-inline">
          <DecreeShort
              v-for="name in degreeProblems"
              :name="name"
              :degrees_config="config.degrees"
              :degrees="degrees"
              color="light"
          />
        </span>
      </div>

      <div class="width: 100%;"></div>

      <div>
        <span class="badge badge-icon text-bg-success me-1 d-none d-sm-inline">
          <i class="fa-solid fa-circle-down"></i>
          {{ context.actions_take }}
        </span>

        <span class="badge badge-icon text-bg-info me-1 d-none d-sm-inline">
          <i class="fa-solid fa-square-check"></i>
          {{ context.actions_apply }}
        </span>

        <span class="badge badge-icon text-bg-info me-1 d-none d-sm-inline">
          <i class="fa-solid fa-scale-balanced"></i>
          {{ context.actions_apply_law }}
        </span>

        <span class="badge badge-icon text-bg-warning me-1 d-none d-sm-inline">
          <i class="fa-solid fa-reply"></i>
          {{ context.actions_discard }}
        </span>

        <button v-if="context.can_finish_turn" @click="endTurnRequest()" class="btn btn-danger ms-2" type="submit">
          <span class="d-none d-xl-inline">
            Новый раунд
          </span>
          <i class="fa-solid fa-hourglass-start"></i>
        </button>
        <button v-else @click="endTurnRequest()" class="btn btn-danger ms-2 disabled" type="submit">
          <span class="d-none d-xl-inline">
            Новый раунд
          </span>
          <i class="fa-solid fa-hourglass-start"></i>
        </button>

      </div>

    </div>
  </nav>

  <div class="container-fluid mt-3">
  </div>

  <div v-if="isReady()" class="container-fluid">
    <div class="row">

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              v-for="name in degreePowers"
              :key="name"
              :degree="degrees[name]"
              :degrees_config="config.degrees"
              :trends_config="config.trends"
              :degree_type=DEGREE_TYPE_POWER
          />
          </tbody>
        </table>
      </div>

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              v-for="name in degreeProblems"
              :key="name"
              :degree="degrees[name]"
              :degrees_config="config.degrees"
              :trends_config="config.trends"
              :degree_type=DEGREE_TYPE_PROBLEMS
          />
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div v-if="isReady()" class="container-fluid">
    <div class="row">

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              :degree="degrees['ego']"
              :degrees_config="config.degrees"
              :trends_config="config.trends"
              :degree_type=DEGREE_TYPE_OTHER
          />
          </tbody>
        </table>
      </div>

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              :degree="degrees['repression']"
              :degrees_config="config.degrees"
              :trends_config="config.trends"
              :degree_type=DEGREE_TYPE_OTHER
          />
          </tbody>
        </table>
      </div>

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              :degree="degrees['crisis']"
              :degrees_config="config.degrees"
              :trends_config="config.trends"
              :degree_type=DEGREE_TYPE_OTHER
          />
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div v-if="isReady()" class="container-fluid mb-5">
    <div v-if="cards_choice.length" class="row gy-3 justify-content-md-center mb-5">

      <Card
          v-for="card in cards_choice"
          :context="context"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          :cards_category_config="config.cards_category"
          :deck_type=DECK_TYPE_CHOICE
          @takeCardEvent="takeCardRequest"
          @applyCardEvent="applyCardRequest"
          @discardCardEvent="discardCardRequest"
      />

      <div class="col d-none d-sm-inline" style="width: 100%"></div>
      <div class="col d-none d-sm-inline" style="width: 100%"></div>
      <div class="col d-none d-sm-inline" style="width: 100%"></div>
      <div class="col d-none d-sm-inline" style="width: 100%"></div>

    </div>

    <div class="row gy-3 justify-content-md-center">

      <Card
          v-for="card in cards_hand"
          :context="context"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          :cards_category_config="config.cards_category"
          :deck_type=DECK_TYPE_HAND
          @takeCardEvent="takeCardRequest"
          @applyCardEvent="applyCardRequest"
          @discardCardEvent="discardCardRequest"
      />

      <Card
          v-for="card in cards_temporary"
          :context="context"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          :cards_category_config="config.cards_category"
          :deck_type=DECK_TYPE_TEMPORARY
          @takeCardEvent="takeCardRequest"
          @applyCardEvent="applyCardRequest"
          @discardCardEvent="discardCardRequest"
      />

      <div class="col d-none d-sm-inline" style="width: 100%"></div>
      <div class="col d-none d-sm-inline" style="width: 100%"></div>
      <div class="col d-none d-sm-inline" style="width: 100%"></div>
      <div class="col d-none d-sm-inline" style="width: 100%"></div>
    </div>
  </div>

  <div class="container-fluid mb-5">
    <div class="row"></div>
  </div>

<!--  Нижней блок -->
<!--  <nav v-if="isReady()" class="navbar fixed-bottom">-->
<!--    <div class="container-fluid pe-1">-->
<!--      <div>-->
<!---->
<!--      </div>-->
<!--    </div>-->
<!--  </nav>-->

</template>

<script setup>
import Card from '@/components/Card.vue'
import Degree from "@/components/Degree.vue";
import MessagesModal from "@/components/MessagesModal.vue";
import DecreeShort from "@/components/DecreeShort.vue";
import ElectivityBadge from "@/components/ElectivityBadge.vue";
import RoundsBadge from "@/components/RoundsBadge.vue";
import {
  DECK_TYPE_CHOICE,
  DECK_TYPE_HAND,
  DECK_TYPE_TEMPORARY,
  DEGREE_TYPE_OTHER,
  DEGREE_TYPE_POWER,
  DEGREE_TYPE_PROBLEMS
} from "@/const";
</script>

<script>
import axios from "axios";
import { Modal } from "bootstrap";

import {SERVER_URL} from "@/settings";
import {
  GAME_STATUS_LOSE, GAME_STATUS_PROCESSING, GAME_STATUS_WIN,
} from "@/const";

axios.defaults.baseURL = SERVER_URL;

export default {
  name: "Game",
  data: function() {
    return {
      sessionId: null,
      context: null,
      electivity: null,
      degrees: null,
      // config: null,
      config: {degrees: {}},
      cards_choice: [],
      cards_hand: [],
      cards_temporary: [],
      cards_map: [],
      messages: [],

      degreePowers: ['elite', 'finance', 'law', 'siloviki', 'media'],
      degreeProblems: ['corruption', 'economy', 'social', 'distrust', 'opposition'],
      degreeOther: ['ego', 'crisis', 'repression'],
      decksList: ['corruption', 'economy', 'social', 'distrust', 'opposition'],
    }
  },
  // Watch example:
  // watch: {
  //   effects: {
  //     handler(newEffects, oldEffects) {
  //       console.log('Watch!:');
  //       this.showToastEffects();
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    isReady() {
      return this.context && this.config;
    },
    showMessagesModal() {
      let modal = new Modal(document.getElementById("messages-modal"), {});
      modal.show();
    },
    closeMessagesModal() {
      this.readAllMessagesRequest();
    },
    doNewRound(info) {
      window.scrollTo(0, 0);
      this.updateState(info);
    },
    updateState(info) {
      console.log('Updating state:', info);
      this.context = info.context;
      this.electivity = info.electivity;
      this.degrees = info.degrees;
      this.cards_choice = info.cards.choice;
      this.cards_hand = info.cards.hand;
      this.cards_temporary = info.cards.temporary;
      this.cards_map = info.cards.map;
      this.messages = info.messages;

      if (this.messages.length) {
        this.showMessagesModal();
      }

      // this.effects.push.apply(this.effects, info.new_effects);
    },
    handleRequestError(error) {
      console.log('Got error:', error);
      if (error.request && error.request.status === 404) {
        this.$router.push({ name: 'home'})
      }
    },
    createGameRequest() {
      axios.get( '/api/game/create')
          .then(response => {
            let sessionId = response.data.result.session_id;
            console.log('Got session ID:', sessionId);
            // this.sessionId = sessionId;
            this.$router.push({ name: 'game', params: { session: sessionId } })
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    getConfigRequest() {
      axios.post('/api/game/config', {})
        .then(response => {
          console.log('Got config:', response.data.result);
          this.config = response.data.result;
        })
        .catch(error => {
          this.handleRequestError(error);
        })
    },
    getStateRequest() {
      axios.post('/api/game/state', {})
          .then(response => {
            console.log('Got state');
            this.updateState(response.data.result);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    takeCardRequest(card) {
      axios.post('/api/game/card/take', {
        card_id: card.id,
      })
          .then(response => {
            console.log('Card taken', card.id);
            this.updateState(response.data.result);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    applyCardRequest(card) {
      axios.post('/api/game/card/apply', {
        card_id: card.id,
      })
          .then(response => {
            console.log('Card used', card.id);
            this.updateState(response.data.result);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    discardCardRequest(card) {
      axios.post('/api/game/card/discard', {
        card_id: card.id,
      })
          .then(response => {
            console.log('Card discard', card.id);
            this.updateState(response.data.result);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    endTurnRequest() {
      axios.post('/api/game/turn/end', {})
          .then(response => {
            console.log('Year finished');
            this.doNewRound(response.data.result);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    readAllMessagesRequest() {
      axios.post('/api/game/message/read_all', {})
          .then(response => {
            console.log('Read all messages');
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    createSession() {
      let sessionId = this.$route.params.session;

      if (sessionId) {
        axios.defaults.headers.common['session'] = sessionId
        this.sessionId = sessionId;
        console.log('URL session ID:', this.sessionId);
        this.getStateRequest();
      }
    },
  },
  created() {
    console.log('Game created');
  },
  mounted() {
    console.log('Game mounted');
    console.log('Route name:', this.$route.name);

    this.getConfigRequest();

    // route may not have time to initialize
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
        this.createSession();
      }
    )

    this.createSession();
  }
}
</script>

<style>

.badge {
  font-size: 1em;
}
.badge-icon {
  padding: 0.5em;
}
.badge-number {
  padding: 0.5em;
  min-width: 2em;
}
.card-text {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1em;
}
.card-title {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5em;
}

.navbar {
  background-color: RGB(33, 37, 41);
}

.btn {
  --bs-btn-padding-x: 0.6rem;
  /*box-shadow: 2px 3px #aaa;*/
  box-shadow: 2px 3px #8f96a3;
}

.card:hover {
  box-shadow: 6px 6px 6px #8f96a3;
  transform: scale(1.05);
}

.modal-title {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5em;
}

h6 {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.3em;
}

.toast-body {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.2em;
}

.toast-container {
  padding-bottom: 70px !important;
}

</style>