<template>
  <Message
      :message="message"
      @newGameEvent="createGameRequest"
  />

  <nav v-if="isReady()" class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">

      <div>
        <span class="badge text-bg-success">
          <i class="fa-regular fa-calendar"></i>
          <span class="d-none d-lg-inline">
            Год
          </span>
          {{ context.year }} / {{ context.years_to_win }}
        </span>
<!--        <span class="badge text-bg-light">Срок</span>-->
<!--        <span class="badge text-bg-success me-2">{{ context.term_number }}/{{ context.term_year }}</span>-->

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
import Message from "@/components/Message.vue";
import DecreeShort from "@/components/DecreeShort.vue";
import Deck from "@/components/Deck.vue";
</script>

<script>
import axios from "axios";
import { Modal } from "bootstrap";

import {SERVER_URL} from "@/settings";
import {
  GAME_STATUS_LOSE, GAME_STATUS_WIN,
  MESSAGE_LOSE_GAME, MESSAGE_START_GAME, MESSAGE_WIN_GAME
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
      decksList: ['corruption', 'economy', 'social', 'distrust', 'opposition'],
      message: {
        name: null,
      }
    }
  },
  methods: {
    isReady() {
      return this.context;
    },
    showMessage(name) {
      this.message.name = name;
      var modal = new Modal(document.getElementById("message"), {});
      modal.show();
    },
    startGameMessage() {
      this.showMessage(MESSAGE_START_GAME);
    },
    winGameMessage() {
      this.showMessage(MESSAGE_WIN_GAME);
    },
    loseGameMessage() {
      this.showMessage(MESSAGE_LOSE_GAME);
    },
    updateState(info) {
      this.context = info.context;
      this.degrees = info.degrees;
      this.cards = info.hand;
      this.decks = info.decks;

      if (this.context.status === GAME_STATUS_LOSE) {
        this.loseGameMessage();
      }
      else if (this.context.status === GAME_STATUS_WIN) {
        this.winGameMessage();
      }
    },
    createGameRequest() {
      axios.get( '/api/game/create')
          .then(response => {
            let sessionId = response.data.session_id;
            console.log('Get session ID:', sessionId);
            this.sessionId = sessionId;
            this.getConfigRequest();
            // this.startGameMessage();
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

.btn {
  --bs-btn-padding-x: 0.6rem;
  /*box-shadow: 2px 3px #aaa;*/
  box-shadow: 2px 3px #8f96a3;
}

.card:hover {
  box-shadow: 6px 6px 6px #8f96a3;
  transform: scale(1.05);
}

</style>