<template>
  <div class="text-bg-secondary bg-gradient p-3">
    <span class="badge text-bg-light">Год правления</span>
    <span class="badge text-bg-dark me-2">1</span>

    <span class="badge text-bg-light">Президентский срок</span>
    <span class="badge text-bg-dark me-2">1</span>

    <span class="badge text-bg-light">Окончание срока</span>
    <span class="badge text-bg-dark me-2">4</span>
  </div>

  <div class="container-fluid">
    <div class="row">

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              v-for="name in degreeResources"
              :key="name"
              :degree="degrees[name]"
          />
          </tbody>
        </table>
      </div>

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
          <Degree
              v-for="name in degreeExternal"
              :key="name"
              :degree="degrees[name]"
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
          @applyCardEvent="applyCard"
          @replaceCardEvent="replaceCard"
      />

      <div class="col"></div>
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

export default {
  data: function() {
    return {
      sessionId: '234',
      degrees: {
        'elite': {
          'name': 'elite',
          'title': 'Лояльность элит',
          'icon': 'fa-solid fa-user',
          'value': 0,
          'valueMax': 12,
          'benefitDirection': 'increase',
        },
        'finance': {
          'name': 'finance',
          'title': 'Финансовые ресурсы',
          'icon': 'fa-solid fa-sack-dollar',
          'value': 1,
          'valueMax': 12,
          'benefitDirection': 'increase',
        },
        'law': {
          'name': 'law',
          'title': 'Влияние на право',
          'icon': 'fa-solid fa-scale-balanced',
          'value': 2,
          'valueMax': 12,
          'benefitDirection': 'increase',
        },
        'siloviki': {
          'name': 'siloviki',
          'title': 'Силовики',
          'icon': 'fa-solid fa-person-military-rifle',
          'value': 3,
          'valueMax': 12,
          'benefitDirection': 'increase',
        },
        'media': {
          'name': 'media',
          'title': 'Контроль СМИ',
          'icon': 'fa-solid fa-tv',
          'value': 4,
          'valueMax': 12,
          'benefitDirection': 'increase',
        },
        'economy': {
          'name': 'economy',
          'title': 'Спад экономики',
          'icon': 'fa-solid fa-industry',
          'value': 12,
          'valueMax': 12,
          'benefitDirection': 'decrease',
        },
        'corruption': {
          'name': 'corruption',
          'title': 'Коррупция',
          'icon': 'fa-solid fa-hand-holding-dollar',
          'value': 11,
          'valueMax': 12,
          'benefitDirection': 'decrease',
        },
        'social': {
          'name': 'social',
          'title': 'Общественные движения',
          'icon': 'fa-solid fa-people-group',
          'value': 10,
          'valueMax': 12,
          'benefitDirection': 'decrease',
        },
        'distrust': {
          'name': 'distrust',
          'title': 'Недоверие к власти',
          'icon': 'fa-solid fa-face-angry',
          'value': 9,
          'valueMax': 12,
          'benefitDirection': 'decrease',
        },
        'opposition': {
          'name': 'opposition',
          'title': 'Оппозиция',
          'icon': 'fa-solid fa-bullhorn',
          'value': 8,
          'valueMax': 12,
          'benefitDirection': 'decrease',
        },
      },
      degreeResources: ['elite', 'finance', 'law', 'siloviki', 'media'],
      degreeExternal: ['economy', 'corruption', 'social', 'distrust', 'opposition'],
      cards: [
        // {
        //   'id': '1',
        //   'title': 'Бессмысленность усилий',
        //   'description': 'Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"',
        //   'conditions': [
        //     {
        //       'name': 'media',
        //       'value': 5,
        //     },
        //     {
        //       'name': 'finance',
        //       'value': 3,
        //     },
        //   ],
        //   'bonuses': [
        //     {
        //       'name': 'distrust',
        //       'value': -2,
        //     },
        //     {
        //       'name': 'siloviki',
        //       'value': +1,
        //     },
        //   ],
        //   'can_apply': true,
        //   'can_replace': true,
        // },
        // {
        //   'id': '2',
        //   'title': 'Бессмысленность усилий',
        //   'description': 'Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"',
        //   'conditions': [],
        //   'bonuses': [],
        //   'can_apply': false,
        //   'can_replace': true,
        // },
        // {
        //   'id': '3',
        //   'title': 'Бессмысленность усилий',
        //   'description': 'Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"',
        //   'conditions': [],
        //   'bonuses': [],
        //   'can_apply': false,
        //   'can_replace': false,
        // },

      ],
    }
  },
  methods: {
    createGame() {
      axios.get('http://localhost:8000/api/game/create')
          .then(response => {
            let sessionId = response.data.session_id;
            console.log('Get session ID:', sessionId);
            this.sessionId = sessionId;
            this.updateInfo();
          })
          .catch(function (error) {

          })
    },
    updateInfo() {
      axios.post('http://localhost:8000/api/game/info', {
        session_id: this.sessionId,
      })
          .then(response => {
            console.log('Get info:', response.data);
            this.degrees = response.data.degrees;
            this.cards = response.data.hand;
          })
          .catch(function (error) {

          })
    },
    applyCard(card) {
      axios.post('http://localhost:8000/api/game/apply_card', {
        session_id: this.sessionId,
        card_id: card.id,
      })
          .then(response => {
            console.log('card used', card.id);
            this.updateInfo();
          })
    },
    replaceCard(card) {
      axios.post('http://localhost:8000/api/game/replace_card', {
        session_id: this.sessionId,
        card_id: card.id,
      })
          .then(response => {
            console.log('card replaced', card.id);
            this.updateInfo();
          })
    },
  },
  created: function() {
    // Life Cycle Hook
  },
  mounted() {
    // Life Cycle Hook
    this.createGame()
  }
}
</script>
