<template>

  <div class="container mt-5"></div>

  <div class="container text-center">
    <div class="vstack gap-2 col-md-5 mx-auto">

      <h1 class="display-1">Политика</h1>
      <h1 class="display-5">Все совпадения случайны</h1>

<!--      <div class="alert alert-dark" role="alert">-->
<!--        <p>-->
<!--          Вам повезло как политику.-->
<!--          Вы стали президентом, когда экономика оправилась от последствий тяжелейшего финансового кризиса августа 1998 года и вошла в длительный период быстрого роста.-->
<!--          Успешная военная кампания позволила добиться мощного укрепления политического авторитета и влияния.-->
<!--          Низкая вовлеченность граждан в политику позволила вам первое время не слишком опасаться проявлений общественного недовольства.-->
<!--        </p>-->

<!--        <p>-->
<!--          Продержитесь у власти 30 лет.-->
<!--        </p>-->
<!--      </div>-->

      <div class="mt=3"></div>

      <button type="button" class="btn btn-success" @click="createGameRequest()">Начать игру</button>
      <button type="button" class="btn btn-outline-secondary" @click="showAboutModal()">О проекте</button>
<!--      <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modal-about">О проекте</button>-->

<!--      <div class="alert alert-danger mt-3" role="alert">-->
<!--        Внимание! Альфа версия игры для тестирования баланса. Могут возникать ошибки и происходить потеря игрового прогресса.-->
<!--      </div>-->

    </div>
  </div>

  <div id="modal-about" class="modal" tabindex="-1" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">О проекте</h5>
        </div>
        <div class="modal-body">
          <p>
            Игра-исследование политического режима в России в 2000-2021 годах.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ок</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import axios from "axios";
import {Modal} from "bootstrap";

export default {
  name: "Home",
  methods: {
    showAboutModal() {
      let modal = new Modal(document.getElementById("modal-about"), {});
      modal.show();
    },
    createGameRequest() {
      axios.post('/api/v1/game/create', {})
          .then(response => {
            let sessionId = response.data.session_id;
            console.log('Got session ID:', sessionId);
            this.$router.push({name: 'game', params: {session: sessionId}})
          })
          .catch(function (error) {
            console.log('Got error:', error);
          })
    },
  },
  created() {
    console.log('Home created');
  },
  mounted() {
    console.log('Home mounted');
  },

}
</script>

<style scoped>
h1 {
  font-family: Neucha, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
</style>