<template>
  <div class="col">
    <div :class="card_class()" style="min-width: 250px;">

      <div class="card-header">
        <div class="d-flex justify-content-between">

          <div class="align-self-center">
            <span>
                <i :class="card_categories_config[card.category].info.fontawesome_icon"></i>
            </span>
            <span v-if="card.has_dependency" class="ms-2">
              <i class="fa-solid fa-link"></i>
            </span>
            <span v-if="card.expire_at_year" class="ms-2">
              <i class="fa-solid fa-hourglass-start"></i>
            </span>
          </div>

          <div class="align-self-center text-center ms-3 me-3">
            <strong>{{ card.text.title }}</strong>
          </div>

          <!--            <div v-if="deck_type === DECK_TYPE_HAND()" class="col">-->
          <!--              <button v-if="card.can_discard" @click="$emit('discardCardEvent', card)" class="game-button-action btn btn-warning float-end">-->
          <!--                <i class="fa-solid fa-reply"></i>-->
          <!--              </button>-->
          <!--              <button v-else class="btn btn-outline-primary float-end disabled">-->
          <!--                <i class="fa-solid fa-reply"></i>-->
          <!--              </button>-->
          <!--            </div>-->

          <div v-if="deck_type === DECK_TYPE_CHOICE()" class="align-self-center">
            <button v-if="card.can_take" @click="$emit('takeCardEvent', card)" class="game-button-action btn btn-success text-nowrap">
              <i class="fa-solid fa-circle-down"></i>
            </button>
            <button v-else class="btn btn-outline-primary text-nowrap disabled">
              <i class="fa-solid fa-circle-down"></i>
            </button>
          </div>

          <div v-if="deck_type === DECK_TYPE_HAND() || deck_type === DECK_TYPE_TEMPORARY()" class="align-self-center">
            <button v-if="card.can_apply" @click="$emit('applyCardEvent', card)" class="game-button-action btn btn-info float-end">
              <i class="fa-solid fa-square-check"></i>
            </button>
            <button v-else class="game-button-action btn btn-outline-primary disabled float-end">
              <i class="fa-solid fa-square-check"></i>
            </button>
          </div>

        </div>

      </div>

      <div class="card-body">

        <div class="pt-0 ps-0">
          <div v-for="condition in card.conditions" :key="condition.degree_name" class="text-nowrap">
            <DecreeIcon
                :name="condition.degree_name"
                :degrees_config="degrees_config"
                color="danger"
                is_button=false
            />
            <span class="badge text-bg-secondary">{{ degree_title(condition.degree_name) }}</span>
            <span class="game-badge-number badge text-bg-dark me-1">{{ condition.value }}</span>
          </div>

          <div v-for="effect in card.effects" :key="effect.degree_name" class="text-nowrap">
            <div v-if="effect.type === EFFECT_TYPE_SHIFT_DEGREE">
              <DecreeIcon
                  :name="effect.degree_name"
                  :degrees_config="degrees_config"
                  color="primary"
                  is_button=false
              />
              <span class="badge text-bg-secondary">{{ degree_title(effect.degree_name) }}</span>
              <span class="game-badge-number badge text-bg-dark me-1">{{ effectValue(effect.shift_value) }}</span>
            </div>

            <div v-if="effect.type === PROPAGANDA()">
              <DecreeIcon
                  :name="effect.degree_name"
                  :degrees_config="degrees_config"
                  color="primary"
                  is_button=false
              />
              <span class="badge text-bg-secondary">{{ degree_title(effect.degree_name) }}</span>
              <span class="game-badge-number badge text-bg-dark me-1">{{ effect.shift_value }}</span>
            </div>

          </div>
        </div>

        <p v-if="card.text.description" class="card-text mt-3">{{ card.text.description }}</p>
        <p v-if="card.text.description_effect" class="card-text mt-3"><em>{{ card.text.description_effect }}</em></p>

        <div class="d-flex justify-content-between">
          <div class="">
          </div>
          <div class="align-self-center text-center ms-0 me-0">
            <p class="game-labels text-body-tertiary mb-0">
              {{ labels_text() }}
            </p>
          </div>
          <div class="">
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {
  DECK_TYPE_CHOICE,
  DECK_TYPE_HAND,
  DECK_TYPE_TEMPORARY,
  DEGREE_NAME_MEDIA,
  EFFECT_TYPE_SHIFT_DEGREE,
  PROPAGANDA
} from "@/const";
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
    DECK_TYPE_CHOICE() {
      return DECK_TYPE_CHOICE
    },
    DECK_TYPE_TEMPORARY() {
      return DECK_TYPE_TEMPORARY
    },
    DECK_TYPE_HAND() {
      return DECK_TYPE_HAND
    },
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
    card_class() {
      let result = "card";
      if (this.card.labels.includes('electivity')) {
        // result += " border-primary";
        result += " text-white bg-info";
      }
      else if (this.card.expire_at_year) {
        result += " text-white bg-warning";
      }
      return result;
    },
    labels_text() {
      let result = "";
      this.card.labels.forEach((item, index) => {
        if (item in this.card_labels_config) {
          if (result) {
            result += ", " + this.card_labels_config[item].title;
          }
          else {
            result = this.card_labels_config[item].title;
          }
        }
      });
      return result;
    }
  },
  props: ['context', 'card', 'degrees_config', 'card_categories_config', 'card_labels_config', 'deck_type']
}
</script>
