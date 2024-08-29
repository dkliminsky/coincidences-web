<template>

  <div id="messages-modal" class="modal" tabindex="-1" data-bs-backdrop="static">
    <MessagesModal
        :messages="messages"
        :context="context"
        :degrees_config="config.degrees"
        :trends_config="config.trends"
        :cards_map="cards_map"
        @closeMessagesModalEvent="closeMessagesModal"
        @newGameEvent="createGameRequest"
    />
  </div>

  <div id="trends-modal" class="modal" tabindex="-1">
    <TrendsModal
        :degrees="degrees"
        :degrees_config="config.degrees"
        :trends_config="config.trends"
        :degree_name="current_trades_degree_name"
    />
  </div>

  <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary bg-dark">
    <div class="container-fluid">
      <div>
        <span class="game-badge-help game-button badge text-bg-warning me-3" @click="showHelpModal()">
          <i class="fa-solid fa-question"></i>
        </span>

        <RoundsBadge
          :context="context"
        />

        <ElectivityBadge
          :electivity="electivity"
        />

        <span v-if="context.phase === GAME_PHASE_TAKING_CARDS">
          <span class="game-badge-icon game-button badge text-bg-success me-1">
            <i class="fa-solid fa-circle-down"></i>
            {{ context.actions_take }}
          </span>
        </span>

        <span v-if="context.phase === GAME_PHASE_APPLYING_CARDS">
          <span class="game-badge-icon game-button badge text-bg-info me-1">
            <i class="fa-solid fa-square-check"></i>
            {{ context.actions_apply }}
          </span>

          <span class="game-badge-icon game-button badge text-bg-info me-1">
            <i class="fa-solid fa-scale-balanced"></i>
            {{ context.actions_apply_law }}
          </span>

          <span v-if="context.is_war" class="game-badge-icon game-button badge text-bg-info me-1">
            <i class="fa-solid fa-person-rifle"></i>
            0
          </span>
        </span>

        <!--        <span class="game-badge-icon game-button badge text-bg-warning me-1">-->
        <!--          <i class="fa-solid fa-reply"></i>-->
        <!--          {{ context.actions_discard }}-->
        <!--        </span>-->

      </div>

<!--      <div class="width: 100%;"></div>-->

      <div>
        <span v-if="isReady()" class="ms-3 d-none d-xl-inline">
          <DecreeShort
              v-for="name in degreePowers"
              :name="name"
              :degrees_config="config.degrees"
              :degrees="degrees"
              color="primary"
          />
        </span>

        <span v-if="isReady()"  class="ms-3 d-none d-xl-inline">
          <DecreeShort
              v-for="name in degreeProblems"
              :name="name"
              :degrees_config="config.degrees"
              :degrees="degrees"
              color="primary"
          />
        </span>

        <span v-if="isReady()"  class="ms-3 d-none d-xl-inline">
          <DecreeShort
              v-for="name in degreeOther"
              :name="name"
              :degrees_config="config.degrees"
              :degrees="degrees"
              color="primary"
          />
        </span>
      </div>

      <div>
        <button v-if="context.can_finish_turn" @click="endTurnRequest()" class="game-button-action btn btn-danger ms-2" type="submit">
          <span class="d-none d-xl-inline">
            Новый раунд
          </span>
          <i class="fa-solid fa-hourglass-end"></i>
        </button>
        <button v-else class="game-button-action btn btn-danger ms-2 disabled" type="submit">
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
              @showTradesModalEvent="showTradesModal"
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
              @showTradesModalEvent="showTradesModal"
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

<!--      <hr class="bg-danger border-2 border-top border-secondary vertical-line">-->
<!--      <h3>Выбор действий</h3>-->

      <Card
          v-for="card in cards_choice"
          :context="context"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          :card_categories_config="config.card_categories"
          :card_labels_config="config.card_labels"
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

<!--      <hr class="bg-danger border-2 border-top border-secondary vertical-line">-->
<!--      <h3>Действия</h3>-->

      <Card
          v-for="card in cards_hand"
          :context="context"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          :card_categories_config="config.card_categories"
          :card_labels_config="config.card_labels"
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
          :card_categories_config="config.card_categories"
          :card_labels_config="config.card_labels"
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
  DEGREE_TYPE_PROBLEMS,
  GAME_PHASE_APPLYING_CARDS,
  GAME_PHASE_TAKING_CARDS
} from "@/const";
import TrendsModal from "@/components/TrendsModal.vue";
</script>

<script>
import axios from "axios";
import { Modal } from "bootstrap";

import {SERVER_URL} from "@/settings";

axios.defaults.baseURL = SERVER_URL;

export default {
  name: "Game",
  data: function() {
    return {
      isStateLoad: false,
      isConfigLoad: false,

      sessionId: null,
      context: {},
      electivity: {},
      degrees: null,
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

      current_trades_degree_name: null,
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
      return this.isStateLoad && this.isConfigLoad;
    },
    showMessagesModal() {
      let modal = new Modal(document.getElementById("messages-modal"), {});
      modal.show();
    },
    showTradesModal(degree_name) {
      this.current_trades_degree_name = degree_name;
      let modal = new Modal(document.getElementById("trends-modal"), {});
      modal.show();
    },
    showHelpModal() {

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
      this.isStateLoad = true;

      this.context = info.turn;
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
      axios.post( '/api/v1/game/create', {})
          .then(response => {
            let sessionId = response.data.session_id;
            console.log('Got session ID:', sessionId);
            // this.sessionId = sessionId;
            this.$router.push({ name: 'game', params: { session: sessionId } })
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    getConfigRequest() {
      axios.post('/api/v1/game/config', {})
        .then(response => {
          console.log('Got config:', response.data);
          this.isConfigLoad = true;
          this.config = response.data;
        })
        .catch(error => {
          this.handleRequestError(error);
        })
    },
    getStateRequest() {
      axios.post('/api/v1/game/state', {})
          .then(response => {
            console.log('Got state');
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    takeCardRequest(card) {
      axios.post('/api/v1/game/card/take', {
        card_ids: [card.id],
      })
          .then(response => {
            console.log('Card taken', card.id);
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    applyCardRequest(card) {
      axios.post('/api/v1/game/card/apply', {
        card_id: card.id,
      })
          .then(response => {
            console.log('Card used', card.id);
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    discardCardRequest(card) {
      axios.post('/api/v1/game/card/discard', {
        card_ids: [card.id],
      })
          .then(response => {
            console.log('Card discard', card.id);
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    endTurnRequest() {
      axios.post('/api/v1/game/turn/end', {})
          .then(response => {
            console.log('Year finished');
            this.doNewRound(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    readAllMessagesRequest() {
      axios.post('/api/v1/game/message/read_all', {})
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
        axios.defaults.headers.common['Session-Id'] = sessionId
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

.game-badge-icon {
  padding: 0.5em;
  min-width: 3em;
}

.game-button {
  box-shadow: 2px 3px #888888;
  cursor: pointer;
}

.game-badge-number {
  padding: 0.5em;
  min-width: 3em;
}

.game-badge-trend {
  padding: 0.5em;
  min-width: 3em;
}

.game-badge-electivity {
  padding: 0.5em;
}

.game-badge-rounds {
  padding: 0.5em;
}

.game-badge-help {
  padding: 0.5em;
  min-width: 2em;
}

.game-button-action {
  min-width: 2.4em;
}

.game-labels {
  font-size: 0.8em;
}

.badge {
  /*font-size: 1em;*/
}

.btn {
  box-shadow: 2px 3px #888888;
}

.card:hover {
  box-shadow: 6px 6px 6px #8f96a3;
  transform: scale(1.05);
}

/*.modal-title {*/
/*  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;*/
/*  font-size: 1.5em;*/
/*}*/

/*h3 {*/
/*  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;*/
/*  font-size: 1em;*/
/*}*/

/*h6 {*/
/*  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;*/
/*  font-size: 1.3em;*/
/*}*/

/*.vertical-line {*/
/*  margin: 3px !important;*/
/*}*/

</style>