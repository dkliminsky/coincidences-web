<template>

  <nav v-if="context" class="navbar sticky-top navbar-expand-lg bg-body-tertiary" style="background-color: RGB(33, 37, 41);">
    <div class="container-fluid">

      <div>
        <span class="badge text-bg-light">Год</span>
        <span class="badge text-bg-success me-2">{{ context.year }}</span>
<!--        <span class="badge text-bg-light">Срок</span>-->
<!--        <span class="badge text-bg-success me-2">{{ context.term_number }}/{{ context.term_year }}</span>-->
      </div>

      <div class="width: 100%;"></div>

      <div v-if="!is_game_over()">
          <div type="button" class="btn btn-outline-success me-1">
            <i class="fa-solid fa-circle-down"></i> {{ context.actions_take }}
          </div>
          <div type="button" class="btn btn-outline-info me-1">
            <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}
          </div>
          <div type="button" class="btn btn-outline-warning me-1">
            <i class="fa-solid fa-reply"></i> {{ context.actions_hold }}
          </div>
          <div type="button" class="btn btn-outline-light me-3">
            <i class="fa-solid fa-hand"></i>
            {{ cards.length }}/{{ context.hand_size }}
          </div>


        <div type="button" class="btn btn-outline-success me-1">
          <i class="fa-solid fa-hand-fist"></i>
          {{ decks[DECK_NAME_STRENGTHENING].deck_size }}/{{ decks[DECK_NAME_STRENGTHENING].hold_size }}
        </div>
        <button v-if="decks[DECK_NAME_STRENGTHENING].can_take" @click="$emit('takeCardEvent', DECK_NAME_STRENGTHENING)" class="btn btn-success me-3">
          <i class="fa-regular fa-circle-down"></i>
        </button>
        <button v-else class="btn btn-outline-primary me-3 disabled">
          <i class="fa-regular fa-circle-down"></i>
        </button>

        <div type="button" class="btn btn-outline-success me-1">
          <i class="fa-solid fa-list-check"></i>
          {{ decks[DECK_NAME_SOLUTION].deck_size }}/{{ decks[DECK_NAME_SOLUTION].hold_size }}
        </div>
        <button v-if="decks[DECK_NAME_SOLUTION].can_take" @click="$emit('takeCardEvent', DECK_NAME_SOLUTION)" class="btn btn-success me-3">
          <i class="fa-regular fa-circle-down"></i>
        </button>
        <button v-else class="btn btn-outline-primary me-3 disabled">
          <i class="fa-regular fa-circle-down"></i>
        </button>
        <!--        </div>-->
        <!---->
        <!--        <div class="col text-nowrap">-->
        <div type="button" class="btn btn-outline-success me-1">
          <i class="fa-solid fa-gears"></i>
          {{ decks[DECK_NAME_EFFICIENCY].deck_size }}/{{ decks[DECK_NAME_EFFICIENCY].hold_size }}
        </div>
        <button v-if="decks[DECK_NAME_EFFICIENCY].can_take" @click="$emit('takeCardEvent', DECK_NAME_EFFICIENCY)" class="btn btn-success me-3">
          <i class="fa-regular fa-circle-down"></i>
        </button>
        <button v-else class="btn btn-outline-primary me-3 disabled">
          <i class="fa-regular fa-circle-down"></i>
        </button>

        <div type="button" class="btn btn-outline-success me-1">
          <i class="fa-solid fa-chart-line"></i>
          {{ decks[DECK_NAME_SUPER_PROJECT].deck_size }}/{{ decks[DECK_NAME_SUPER_PROJECT].hold_size }}
        </div>
        <button v-if="decks[DECK_NAME_SUPER_PROJECT].can_take" @click="$emit('takeCardEvent', DECK_NAME_SUPER_PROJECT)" class="btn btn-success me-3">
          <i class="fa-regular fa-circle-down"></i>
        </button>
        <button v-else class="btn btn-outline-primary me-3 disabled">
          <i class="fa-regular fa-circle-down"></i>
        </button>



        <button @click="finishYearRequest()" class="btn btn-danger" type="submit">Новый раунд</button>
      </div>
<!--      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
<!--        <span class="navbar-toggler-icon"></span>-->
<!--      </button>-->

    </div>
  </nav>

  <div class="container-fluid mt-3">
  </div>

  <div class="container-fluid">
    <div class="row">

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              v-if="degrees"
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
              v-if="degrees"
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

  <div v-if="decks" class="container-fluid mb-3">
    <div class="row justify-content-md-center">
      <div class="col">
        <Decks
          :context="context"
          :cards="cards"
          :decks="decks"
          @takeCardEvent="takeCardRequest"
        />
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row gy-3 justify-content-md-center">
      <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          @applyCardEvent="applyCardRequest"
          @holdCardEvent="holdCardRequest"
      />

<!--      <div class="col"></div>-->
      <div class="col"></div>
    </div>
  </div>

</template>

<script setup>
import Card from '@/components/Card.vue'
import Degree from "@/components/Degree.vue";
import Decks from "@/components/Decks.vue";
</script>

<script>
import axios from "axios";

import {SERVER_URL} from "@/settings";
import {
  DECK_NAME_EFFICIENCY,
  DECK_NAME_SOLUTION,
  DECK_NAME_STRENGTHENING,
  DECK_NAME_SUPER_PROJECT,
  GAME_STATE_PROCESSING
} from "@/const";

axios.defaults.baseURL = SERVER_URL;

export default {
  data: function() {
    return {
      sessionId: null,
      context: null,
      degrees: null,
      config: null,
      decks: null,
      cards: [],
      degreeResources: ['elite', 'finance', 'law', 'siloviki', 'media'],
      degreeProblems: ['corruption', 'economy', 'social', 'distrust', 'opposition'],
    }
  },
  computed: {
    DECK_NAME_STRENGTHENING() {
      return DECK_NAME_STRENGTHENING;
    },
    DECK_NAME_SOLUTION() {
      return DECK_NAME_SOLUTION;
    },
    DECK_NAME_EFFICIENCY() {
      return DECK_NAME_EFFICIENCY;
    },
    DECK_NAME_SUPER_PROJECT() {
      return DECK_NAME_SUPER_PROJECT;
    },
  },
  methods: {
    is_game_over() {
      return this.context.status !== GAME_STATE_PROCESSING;
    },
    updateState(info) {
      this.context = info.context;
      this.degrees = info.degrees;
      this.cards = info.hand;
      this.decks = info.decks;
    },
    createGameRequest() {
      axios.get( '/api/game/create')
          .then(response => {
            let sessionId = response.data.session_id;
            console.log('Get session ID:', sessionId);
            this.sessionId = sessionId;
            this.getConfigRequest();
          })
          .catch(function (error) {

          })
    },
    getConfigRequest() {
      axios.post('/api/game/config', {
        session_id: this.sessionId,
      })
          .then(response => {
            console.log('Got config:', response.data);
            this.config = response.data;
            this.getStateRequest();
          })
          .catch(function (error) {

          })
    },
    getStateRequest() {
      axios.post('/api/game/state', {
        session_id: this.sessionId,
      })
          .then(response => {
            console.log('Got state:', response.data);
            this.updateState(response.data);
          })
          .catch(function (error) {

          })
    },
    takeCardRequest(deck_name) {
      axios.post('/api/game/take_card', {
        session_id: this.sessionId,
        deck_name: deck_name,
      })
          .then(response => {
            console.log('Card taken', deck_name);
            this.getStateRequest();
          })
    },
    applyCardRequest(card) {
      axios.post('/api/game/apply_card', {
        session_id: this.sessionId,
        card_id: card.id,
      })
          .then(response => {
            console.log('Card used', card.id);
            this.getStateRequest();
          })
    },
    holdCardRequest(card) {
      axios.post('/api/game/hold_card', {
        session_id: this.sessionId,
        card_id: card.id,
      })
          .then(response => {
            console.log('Card held', card.id);
            this.getStateRequest();
          })
    },
    finishYearRequest() {
      axios.post('/api/game/finish_year', {
        session_id: this.sessionId,
      })
          .then(response => {
            console.log('Year finished');
            this.getStateRequest();
          })
    },
  },
  created: function() {
    // Life Cycle Hook
    this.createGameRequest();
  },
  mounted() {
    // Life Cycle Hook
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
</style>