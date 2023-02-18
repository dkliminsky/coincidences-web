<template>
  <div class="col">
    <div class="card" style="min-width: 260px;">

      <div class="position-absolute top-0 begin-0 pt-3 ps-3">
        <div v-for="condition in card.conditions" :key="condition.name">
          <span class="badge text-bg-danger">{{ degrees[condition.name].title }}</span>
          <span class="badge text-bg-dark me-2">{{ condition.value }}</span>
        </div>

        <div v-for="condition in card.bonuses" :key="condition.name">
          <span class="badge text-bg-info">{{ degrees[condition.name].title }}</span>
          <span class="badge text-bg-dark me-2">{{ bonusValue(condition.value) }}</span>
        </div>

      </div>

      <img :src="card.image" class="card-img-top" alt="...">

      <div class="card-body">
        <h5 class="card-title">{{ card.title }}</h5>
        <p class="card-text">{{ card.description }}</p>

        <div class="btn-group" role="group" aria-label="Basic example">
          <button @click="applyCard" class="btn btn-info" :disabled="!card.can_apply">Использовать</button>
          <button @click="replaceCard" class="btn btn-warning" :disabled="!card.can_replace">Заменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    bonusValue(value) {
      if (value > 0) {
        return '+' + value.toString()
      }
      else {
        return value
      }
    },
    applyCard() {
      console.log('card used', this.card.id)
    },
    replaceCard() {
      console.log('card replaced', this.card.id)
    },
  },
  props: ['card', 'degrees']
}
</script>

