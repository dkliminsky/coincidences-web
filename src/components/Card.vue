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

          <div v-for="effect in card.effects" :key="effect.degree_name" class="text-nowrap">
            <div v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE">
              <DecreeIcon
                  :name="effect.degree_name"
                  :degrees_config="degrees_config"
                  color="primary"
              />
              <span class="badge text-bg-info">{{ degree_title(effect.degree_name) }}</span>
              <span class="badge badge-number text-bg-dark me-1">{{ effectValue(effect.shift_value) }}</span>
            </div>

            <div v-if="effect.type === PROPAGANDA()">
              <DecreeIcon
                  :name="effect.degree_name"
                  :degrees_config="degrees_config"
                  color="primary"
              />
              <span class="badge text-bg-danger">{{ degree_title(DEGREE_NAME_MEDIA()) }}</span>
              <span class="badge badge-number text-bg-dark me-1">0/3/6/9</span>
            </div>

            <div v-if="effect.type === PROPAGANDA()">
              <DecreeIcon
                  :name="effect.degree_name"
                  :degrees_config="degrees_config"
                  color="primary"
              />
              <span class="badge text-bg-info">{{ degree_title(effect.degree_name) }}</span>
              <span class="badge badge-number text-bg-dark me-1">0/-1/-2/-3</span>
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
              <button v-if="card.can_take" @click="$emit('takeCardEvent', card)" class="btn btn-success">
                <i class="fa-solid fa-circle-down"></i> {{ context.actions_take }}
              </button>
              <button v-else class="btn btn-outline-primary disabled">
                <i class="fa-solid fa-circle-down"></i> {{ context.actions_take }}
              </button>
            </div>

            <div class="col align-self-center text-center">
              <span>
                <i :class="cards_category_config[card.category].info.fontawesome_icon"></i>
              </span>
              <span v-if="card.has_dependency" class="ms-2">
                <i class="fa-solid fa-link"></i>
              </span>
              <span v-if="card.temp_year" class="ms-2">
                <i class="fa-solid fa-hourglass-start"></i>
              </span>
            </div>

            <div class="col">
              <button v-if="card.can_discard" @click="$emit('discardCardEvent', card)" class="btn btn-warning float-end">
                <i class="fa-solid fa-reply"></i> {{ context.actions_discard }}
              </button>
              <button v-else class="btn btn-outline-primary float-end disabled">
                <i class="fa-solid fa-reply"></i> {{ context.actions_discard }}
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {DEGREE_NAME_MEDIA, EFFECT_TYPE_SHIFT_DEGREE, PROPAGANDA} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  components: {DecreeIcon},
  data() {
    return {
    }
  },
  computed: {
    EFFECT_TYPE_SHIFT_DEGREE() {
      return EFFECT_TYPE_SHIFT_DEGREE;
    },
  },
  methods: {
    DEGREE_NAME_MEDIA() {
      return DEGREE_NAME_MEDIA
    },
    PROPAGANDA() {
      return PROPAGANDA
    },
    effectValue(value) {
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
  props: ['context', 'card', 'degrees_config', 'cards_category_config']
}
</script>

<style scoped>
.card {
  /*background-image: url('card_02.webp');*/
  /*background-image: url('decree.webp');*/
  /*background-image: url('card_01.jpg');*/
}
</style>