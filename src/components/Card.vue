<template>
  <div class="col">
    <div class="card" style="min-width: 260px;">

      <div class="position-absolute top-0 begin-0 pt-3 ps-3">
        <div v-for="condition in card.conditions" :key="condition.degree_name">
          <DecreeIcon :name="condition.degree_name"/>
          <span class="badge text-bg-danger">{{ degree_title(condition.degree_name) }}</span>
          <span class="badge text-bg-dark me-2">{{ condition.value }}</span>
        </div>

        <div v-for="bonus in card.bonuses" :key="bonus.degree_name">
          <DecreeIcon :name="bonus.degree_name"/>
          <span class="badge text-bg-info">{{ degree_title(bonus.degree_name) }}</span>
          <span class="badge text-bg-dark me-2">{{ bonusValue(bonus.shift_value) }}</span>
        </div>
      </div>

      <img src="decree.webp" class="card-img-top" alt="..." style="max-width: 150px;">

      <div class="card-body">
        <h5 class="card-title">{{ card.info.title }}</h5>
        <p class="card-text">{{ card.info.description }}</p>

        <div class="btn-group" role="group" aria-label="Basic example">
<!--          <button @click="applyCard" class="btn btn-info" :disabled="!card.can_apply">Использовать</button>-->
<!--          <button @click="replaceCard" class="btn btn-warning" :disabled="!card.can_replace">Заменить</button>-->

          <button v-if="card.can_apply" @click="$emit('applyCardEvent', card)" class="btn btn-info">Использовать</button>
          <button v-if="card.can_replace"  @click="$emit('replaceCardEvent', card)" class="btn btn-warning">Заменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {DEGREES} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  components: {DecreeIcon},
  computed: {
    DEGREES() {
      return DEGREES
    }
  },
  data() {
    return {
    }
  },
  methods: {
    bonusValue(value) {
      if (value > 0) {
        return '+' + value.toString();
      }
      else {
        return value;
      }
    },
    degree_title(name) {
      return DEGREES[name].title;
    },
  },
  props: ['card']
}
</script>

