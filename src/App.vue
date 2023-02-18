<template>
  <div class="text-bg-secondary bg-gradient p-3">
    <span class="badge text-bg-light">Год правления</span>
    <span class="badge text-bg-dark me-2">{{ count }}</span>

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
          :degrees="degrees"
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
export default {
  data() {
    return {
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
        {
          'id': '1',
          'title': 'Бессмысленность усилий',
          'image': 'decree.webp',
          'description': 'Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"',
          'conditions': [
            {
              'name': 'media',
              'value': 5,
            },
            {
              'name': 'finance',
              'value': 3,
            },
          ],
          'bonuses': [
            {
              'name': 'distrust',
              'value': -2,
            },
            {
              'name': 'siloviki',
              'value': +1,
            },
          ],
          'can_apply': true,
          'can_replace': true,
        },
        {
          'id': '2',
          'title': 'Бессмысленность усилий',
          'image': 'decree.webp',
          'description': 'Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"',
          'conditions': [],
          'bonuses': [],
          'can_apply': false,
          'can_replace': true,
        },
        {
          'id': '3',
          'title': 'Бессмысленность усилий',
          'image': 'decree.webp',
          'description': 'Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"',
          'conditions': [],
          'bonuses': [],
          'can_apply': false,
          'can_replace': false,
        },

      ],
      count: 0
    }
  },
  methods: {
  }
}
</script>
