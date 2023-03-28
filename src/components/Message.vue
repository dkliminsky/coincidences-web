<template>
  <div id="message" class="modal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

      <div v-if="message.name === MESSAGE_START_GAME()" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Вступление</h5>
        </div>
        <div class="modal-body">
          <p>
            Вам повезло как политику. Вы стали президентом, когда экономика оправилась от последствий тяжелейшего финансового кризиса августа 1998 года и вошла в длительный период быстрого роста. Успешная военная кампания позволила добиться мощного укрепления политического авторитета и влияния. Низкая вовлеченность граждан в политику создала ситуацию «свободы рук», позволявшую вам не слишком опасаться проявлений общественного недовольства.
          </p>
          <p>
            Цель: Продержитесь у власти 30 лет.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Начать игру</button>
        </div>
      </div>

      <div v-if="message.name === MESSAGE_WIN_GAME()" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Победа!</h5>
        </div>
        <div class="modal-body">
          <p>
            Главная цель политиков — это максимизация власти. Иными словами, они стремятся находиться у власти с помощью любых средств так долго, как это возможно, и иметь столько власти, сколько возможно. Низкая вовлеченность масс в политику, отсутствие условий для договоренностей элит о демократизации, слабое международное влияние и невысокая приверженность российских политиков декларируемым идеологиям увеличивали шансы на безнаказанное «отравление» российской политической системы, создание «правил игры» под себя и в интересах коварных и циничных политиков, которые стремились к максимизации собственной власти.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$router.push({name: 'home'})">На главную</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('newGameEvent')">Попробовать еще раз</button>
        </div>
      </div>

      <div v-if="message.name === MESSAGE_LOSE_GAME()" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Поражение</h5>
        </div>
        <div class="modal-body">
          <p>
            Все правители в мире хотели бы управлять своими странами как можно дольше и с как можно меньшими ограничениями. В большинстве политических режимов они сталкиваются с ограничениями, которые на них накладывают институты и другие политические игроки (внутренние и международные). После распада СССР, лидеры некоторых постсоветских государств, включая Узбекистан или Туркменистан, оказались способны минимизировать эти ограничения в процессе строительства авторитаризма. Однако в других случаях попытки такого рода терпели полный крах, в том числе в ходе «цветных революций» в Грузии, Украине и Кыргызстане.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$router.push({name: 'home'})">На главную</button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('newGameEvent')">Попробовать еще раз</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {MESSAGE_LOSE_GAME, MESSAGE_START_GAME, MESSAGE_WIN_GAME} from "@/const";

export default {
  name: "Message",
  computed: {

  },
  methods: {
    MESSAGE_WIN_GAME() {
      return MESSAGE_WIN_GAME
    },
    MESSAGE_LOSE_GAME() {
      return MESSAGE_LOSE_GAME
    },
    MESSAGE_START_GAME() {
      return MESSAGE_START_GAME
    }

  },
  emits: ["newGameEvent",],
  props: ['message']
}
</script>

<style scoped>

.modal-title {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5em;
}

</style>