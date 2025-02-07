<template>
  <div class="col">
    <div :class="card_class()" style="min-width: 250px;">

      <div class="card-header">
        <div class="d-flex justify-content-between">

          <div class="align-self-center">
            <span>
                <i :class="card_categories_config[card.category].info.fontawesome_icon"></i>
            </span>
          </div>

          <div class="align-self-center text-center ms-3 me-3">
            <strong>{{ card.text.title }}</strong>
          </div>

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
            <Effect
                :effect="effect"
                :degrees_config="degrees_config"
                :trends_config="trends_config"
                :cards_map="cards_map"
            />
          </div>
        </div>

        <p v-if="card.text.description" class="card-text mt-3">{{ card.text.description }}</p>
        <p v-if="card.text.description_effect" class="card-text mt-3"><em>{{ card.text.description_effect }}</em></p>

        <p v-if="card.dependency_one.length === 1">
          <em>
            Необходимо выполнить действие:
            <s v-if="card.dependency_resolved.includes(card.dependency_one[0])">{{ cards_map[card.dependency_one[0]].text.title }}</s>
            <template v-else>{{ cards_map[card.dependency_one[0]].text.title }}</template>
          </em>
        </p>
        <p v-else-if="card.dependency_one.length > 1">
          <em>
            Необходимо выполнить хотя бы одно действие:
            <template v-for="(dependency_code, index) in card.dependency_one">
              <s v-if="card.dependency_resolved.includes(dependency_code)">{{ cards_map[dependency_code].text.title }}</s>
              <template v-else>{{ cards_map[dependency_code].text.title }}</template>
              <template v-if="index < card.dependency_one.length - 1">, </template>
            </template>
          </em>
        </p>
        <p v-if="card.dependency_all.length > 1">
          <em>
            Необходимо выполнить все действия:
            <template v-for="(dependency_code, index) in card.dependency_all">
              <s v-if="card.dependency_resolved.includes(dependency_code)">{{ cards_map[dependency_code].text.title }}</s>
              <template v-else>{{ cards_map[dependency_code].text.title }}</template>
              <template v-if="index < card.dependency_all.length - 1">, </template>
            </template>
          </em>
        </p>

        <div class="d-flex justify-content-between">
          <div class="">
          </div>

          <template v-for="label in card.labels">
            <template v-if="card_labels_config[label] && card_labels_config[label].info.fontawesome_icon">
              <div class="align-self-center text-center ms-0 me-0">
                <span class="ms-2">
                  <i :class="card_labels_config[label].info.fontawesome_icon"></i>
                </span>
              </div>
            </template>
          </template>

          <div class="">
          </div>

        </div>

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
  EFFECT_TYPE_SHIFT_DEGREE, LABEL_CHAIN, LABEL_ELECTIVITY,
  EFFECT_TYPE_PROPAGANDA
} from "@/const";
import DecreeIcon from "@/components/DecreeIcon.vue";
import Effect from "@/components/Effect.vue";

export default {
  components: {Effect, DecreeIcon},
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
    EFFECT_TYPE_PROPAGANDA() {
      return EFFECT_TYPE_PROPAGANDA
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
      if (this.card.labels.includes(LABEL_ELECTIVITY)) {
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
        // Выводим текст лейбла, если нет иконки. Иконка выводится отдельно
        if (item in this.card_labels_config && !this.card_labels_config[item].info.fontawesome_icon) {
          if (result) {
            result += ", " + this.card_labels_config[item].info.title;
          }
          else {
            result = this.card_labels_config[item].info.title;
          }
        }
      });
      return result;
    }
  },
  props: ['context', 'card', 'degrees_config', 'card_categories_config', 'card_labels_config', 'trends_config',
    'cards_map', 'deck_type'
  ]
}
</script>
