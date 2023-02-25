<template>
  <div class="col">
    <div class="card" style="min-width: 240px;">

      <div class="position-absolute top-0 begin-0 pt-1 ps-1">
        <div v-for="condition in card.conditions" :key="condition.degree_name">
          <DecreeIcon
              :name="condition.degree_name"
              :degrees_config="degrees_config"
              color="primary"
          />
          <span class="badge text-bg-danger">{{ degree_title(condition.degree_name) }}</span>
          <span class="badge text-bg-dark me-2">{{ condition.value }}</span>
        </div>

        <div v-for="bonus in card.bonuses" :key="bonus.degree_name">
          <DecreeIcon
              :name="bonus.degree_name"
              :degrees_config="degrees_config"
              color="primary"
          />
          <span class="badge text-bg-info">{{ degree_title(bonus.degree_name) }}</span>
          <span class="badge text-bg-dark me-2">{{ bonusValue(bonus.shift_value) }}</span>
        </div>
      </div>

      <img src="decree.webp" class="card-img-top" alt="..." style="max-width: 50px;">

      <div class="card-body">
        <h5 class="card-title">{{ card.info.title }}</h5>
        <p class="card-text">{{ card.info.description }}</p>

          <div class="container-fluid">
            <div class="row">

              <div class="col p-0">
                <button v-if="card.can_apply" @click="$emit('applyCardEvent', card)" class="btn btn-info">
                  <i class="fa-solid fa-square-check"></i>
                </button>
              </div>
              <div class="col" style="width: 100%;">
              </div>
              <div class="col p-0">
                <button v-if="card.can_replace"  @click="$emit('replaceCardEvent', card)" class="btn btn-warning">
                  <i class="fa-solid fa-reply"></i>
                </button>
              </div>

            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import DecreeIcon from "@/components/DecreeIcon.vue";

export default {
  components: {DecreeIcon},
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
      return this.degrees_config[name].info.title;
    },
  },
  props: ['card', 'degrees_config']
}
</script>

