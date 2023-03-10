<template>

  <nav v-if="context" class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">

      <div>
        <span class="badge text-bg-light">Год</span>
        <span class="badge text-bg-success me-2">{{ context.year }} из {{ context.years_to_win }}</span>
<!--        <span class="badge text-bg-light">Срок</span>-->
<!--        <span class="badge text-bg-success me-2">{{ context.term_number }}/{{ context.term_year }}</span>-->
      </div>

      <div class="width: 100%;"></div>

      <div v-if="!is_game_over()">
        <div type="button" class="btn btn-outline-success me-1">
          Взять
          <i class="fa-solid fa-circle-down"></i> {{ context.actions_take }}
        </div>
        <div type="button" class="btn btn-outline-info me-1">
          Активировать
          <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}
        </div>
        <div type="button" class="btn btn-outline-warning me-1">
          Отложить
          <i class="fa-solid fa-reply"></i> {{ context.actions_hold }}
        </div>
        <div type="button" class="btn btn-outline-light me-3">
          Карты на руках
          <i class="fa-solid fa-hand"></i>
          {{ cards.length }} из {{ context.hand_size }}
        </div>
      </div>

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

  <div class="container-fluid" style="margin-bottom: 100%">
    <div class="row gy-3 justify-content-md-center">
      <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          @applyCardEvent="applyCardRequest"
          @holdCardEvent="holdCardRequest"
      />

      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
      <div class="col" style="width: 100%"></div>
    </div>
  </div>

  <nav v-if="context" class="navbar sticky-bottom">
    <div class="container-fluid">

      <div class=""></div>

      <div v-if="!is_game_over()">

        <Decks
            :context="context"
            :cards="cards"
            :decks="decks"
            @takeCardEvent="takeCardRequest"
        />

        <button @click="finishYearRequest()" class="btn btn-danger ms-2" type="submit">
          Новый раунд
          <i class="fa-solid fa-hourglass-start"></i>
        </button>
      </div>

    </div>
  </nav>

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

.navbar {
  background-color: RGB(33, 37, 41);
}

</style>