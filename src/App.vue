<template>

  <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary" style="background-color: RGB(33, 37, 41);">
    <div v-if="context" class="container-fluid">

      <div>
        <span class="badge text-bg-light">Год</span>
        <span class="badge text-bg-success me-2">{{ context.year }}</span>
<!--        <span class="badge text-bg-light">Срок</span>-->
<!--        <span class="badge text-bg-success me-2">{{ context.term_number }}/{{ context.term_year }}</span>-->
      </div>

      <div class="width: 100%;"></div>

      <div v-if="!is_game_over()">
        <div type="button" class="btn btn-outline-info me-1">
          <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}
        </div>
        <div type="button" class="btn btn-outline-warning me-1">
          <i class="fa-solid fa-reply"></i> {{ context.actions_replace }}
        </div>
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

  <div class="container-fluid">
    <div class="row gy-3 justify-content-md-center">
      <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          :degrees_config="config.degrees"
          @applyCardEvent="applyCardRequest"
          @replaceCardEvent="replaceCardRequest"
      />

<!--      <div class="col"></div>-->
      <div class="col"></div>
    </div>
  </div>

</template>

<script setup>
import Card from '@/components/Card.vue'
import Degree from "@/components/Degree.vue";
</script>

<script>
import axios from "axios";

import {SERVER_URL} from "@/settings";
import {GAME_STATE_PROCESSING} from "@/const";

axios.defaults.baseURL = SERVER_URL;

export default {
  data: function() {
    return {
      sessionId: null,
      context: null,
      degrees: null,
      config: null,
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
    replaceCardRequest(card) {
      axios.post('/api/game/replace_card', {
        session_id: this.sessionId,
        card_id: card.id,
      })
          .then(response => {
            console.log('Card replaced', card.id);
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
