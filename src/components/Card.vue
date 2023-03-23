<template>
  <div class="col">
    <div class="card" style="min-width: 250px;">

<!--      <img src="decree.webp" class="card-img-top" alt="...">-->
<!--      <img src="decree.webp" class="position-absolute top-0 start-0" alt="...">-->

      <div class="card-body p-3">
<!--        <img src="decree.webp" class="position-absolute top-0 start-0" alt="...">-->

        <div class="pt-0 ps-0">
          <div v-for="condition in card.conditions" :key="condition.degree_name" class="text-nowrap">
            <DecreeIcon
                :name="condition.degree_name"
                :degrees_config="degrees_config"
                color="primary"
            />
            <span class="badge text-bg-danger">{{ degree_title(condition.degree_name) }}</span>
            <span class="badge badge-number text-bg-dark me-1">{{ condition.value }}</span>
          </div>

          <div v-for="bonus in card.bonuses" :key="bonus.degree_name" class="text-nowrap">
            <div v-if="bonus.type === BONUS_TYPE_DEGREE">
              <DecreeIcon
                  :name="bonus.degree_name"
                  :degrees_config="degrees_config"
                  color="primary"
              />
              <span class="badge text-bg-info">{{ degree_title(bonus.degree_name) }}</span>
              <span class="badge badge-number text-bg-dark me-1">{{ bonusValue(bonus.shift_value) }}</span>
            </div>
          </div>
        </div>

<!--        <div class="alert alert-secondary mt-3">-->
          <h5 class="card-title mt-3">{{ card.info.title }}</h5>
          <p class="card-text">{{ card.info.description }}</p>
<!--        </div>-->

        <div class="container-fluid ps-0 pe-0">
          <div class="row">

            <div class="col">
              <button v-if="card.can_apply" @click="$emit('applyCardEvent', card)" class="btn btn-info">
                <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}
              </button>
              <button v-else class="btn btn-outline-primary disabled">
                <i class="fa-solid fa-square-check"></i> {{ context.actions_apply }}
              </button>
            </div>

            <div class="col">
              <button v-if="card.can_hold" @click="$emit('holdCardEvent', card)" class="btn btn-warning float-end">
                <i class="fa-solid fa-reply"></i> {{ context.actions_hold }}
              </button>
              <button v-else class="btn btn-outline-primary float-end disabled">
                <i class="fa-solid fa-reply"></i> {{ context.actions_hold }}
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {BONUS_TYPE_DEGREE} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  components: {DecreeIcon},
  data() {
    return {
    }
  },
  computed: {
    BONUS_TYPE_DEGREE() {
      return BONUS_TYPE_DEGREE;
    },
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
      return this.degrees_config[name].info.title;
    },
  },
  props: ['context', 'card', 'degrees_config']
}
</script>

<style>
.card {
  /*background-image: url('card_02.webp');*/
  /*background-image: url('decree.webp');*/
  /*background-image: url('card_01.jpg');*/
}
</style>