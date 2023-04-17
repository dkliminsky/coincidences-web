<template>
  <EndGameModal
      v-if="isReady()"
      :context="context"
      :config="config"
      @newGameEvent="createGameRequest"
  />

  <NewRoundModal
      v-if="isReady()"
      :new_events="new_events"
      :new_effects="new_effects"
      :effects_config="config.effects"
      :degrees_config="config.degrees"
      @closeNewRoundModalEvent="closeNewRoundModal"
  />

<!--  <div v-if="isReady()" class="toast-container position-fixed bottom-0 end-0 p-3">-->
<!--    <span v-for="effect in effects">-->
<!--      <EffectToast-->
<!--        :effect="effect"-->
<!--        :effects_config="config.effects"-->
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

        <span class="ms-3 d-none d-md-inline">
          <DecreeShort
              v-for="name in degreeResources"
              :name="name"
              :degrees_config="config.degrees"
              :degrees="degrees"
              color="light"
          />
        </span>

        <span class="ms-3 d-none d-md-inline">
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
        <button @click="finishYearRequest()" class="btn btn-danger ms-2" type="submit">
          <span class="d-none d-lg-inline">
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
              v-for="name in degreeResources"
              :key="name"
              :degree="degrees[name]"
              :degrees_config="config.degrees"
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
          />
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div v-if="isReady()" class="container-fluid mb-5">
    <div class="row gy-3 justify-content-md-center">
      <Card
          v-for="card in cards"
          :context="context"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          :decks_config="config.decks"
          @applyCardEvent="applyCardRequest"
          @holdCardEvent="holdCardRequest"
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

  <nav v-if="isReady()" class="navbar fixed-bottom">
    <div class="container-fluid pe-1">
      <div>
        <span class="badge badge-icon text-bg-light me-3 d-none d-sm-inline">
          <i class="fa-solid fa-hand"></i>
<!--          <span class="d-none d-lg-inline">-->
<!--            Карты-->
<!--          </span>-->
          {{ cards.length }} / {{ context.hand_size }}
        </span>

        <span class="badge badge-icon text-bg-success me-1 d-none d-sm-inline">
          <i class="fa-solid fa-circle-down"></i>
<!--          Взять-->
          {{ context.actions_take }}
        </span>

        <span class="badge badge-icon text-bg-info me-1 d-none d-sm-inline">
          <i class="fa-solid fa-square-check"></i>
<!--          Активировать-->
          {{ context.actions_apply }}
        </span>

        <span class="badge badge-icon text-bg-warning me-1 d-none d-sm-inline">
          <i class="fa-solid fa-reply"></i>
<!--          Отложить-->
          {{ context.actions_hold }}
        </span>

      </div>

      <div>
        <Deck
          v-for="deck_config in config.decks"
          :context="context"
          :decks="decks"
          :deck_config="deck_config"
          @takeCardEvent="takeCardRequest"
        />
      </div>
    </div>
  </nav>

</template>

<script setup>
import Card from '@/components/Card.vue'
import Degree from "@/components/Degree.vue";
import EndGameModal from "@/components/EndGameModal.vue";
import NewRoundModal from "@/components/NewRoundModal.vue";
import DecreeShort from "@/components/DecreeShort.vue";
import Deck from "@/components/Deck.vue";
import Effect from "@/components/Effect.vue";
import ElectivityBadge from "@/components/ElectivityBadge.vue";
import RoundsBadge from "@/components/RoundsBadge.vue";
</script>

<script>
import axios from "axios";
import { Modal, Toast, Tooltip } from "bootstrap";

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
      config: null,
      decks: null,
      cards: [],

      new_effects: [],
      new_events: [],

      degreeResources: ['elite', 'finance', 'law', 'siloviki', 'media'],
      degreeProblems: ['corruption', 'economy', 'social', 'distrust', 'opposition'],
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
    showEndGameModal() {
      let modal = new Modal(document.getElementById("end-game-modal"), {});
      modal.show();
    },
    closeNewRoundModal() {
    },
    doNewRound(info) {
      window.scrollTo(0, 0);
      this.updateState(info);

      if (this.context.status === GAME_STATUS_PROCESSING) {
        let modal = new Modal(document.getElementById("new-round-modal"), {});
        modal.show();
      }
    },
    updateState(info) {
      console.log('Updating state:', info);
      this.context = info.context;
      this.electivity = info.electivity;
      this.degrees = info.degrees;
      this.cards = info.hand;
      this.decks = info.decks;
      this.new_effects = info.new_effects;
      this.new_events = info.new_events;

      if (this.context.status !== GAME_STATUS_PROCESSING) {
        this.showEndGameModal();
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
      axios.post('/api/game/config', {
        session_id: this.sessionId,
      })
        .then(response => {
          console.log('Got config:', response.data);
          this.config = response.data;
        })
        .catch(error => {
          this.handleRequestError(error);
        })
    },
    getStateRequest() {
      axios.post('/api/game/state', {
        session_id: this.sessionId,
      })
          .then(response => {
            console.log('Got state');
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    takeCardRequest(deck_name) {
      axios.post('/api/game/take_card', {
        session_id: this.sessionId,
        deck_name: deck_name,
      })
          .then(response => {
            console.log('Card taken', deck_name);
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    applyCardRequest(card) {
      axios.post('/api/game/apply_card', {
        session_id: this.sessionId,
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
    holdCardRequest(card) {
      axios.post('/api/game/hold_card', {
        session_id: this.sessionId,
        card_id: card.id,
      })
          .then(response => {
            console.log('Card held', card.id);
            this.updateState(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    finishYearRequest() {
      axios.post('/api/game/finish_year', {
        session_id: this.sessionId,
      })
          .then(response => {
            console.log('Year finished');
            this.doNewRound(response.data);
          })
          .catch(error => {
            this.handleRequestError(error);
          })
    },
    createSession() {
      let sessionId = this.$route.params.session;

      if (sessionId) {
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