<template>
  <div id="message" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Вступление</h5>
          <!--          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
        </div>
        <div class="modal-body">
          <p>
            Вам повезло как политику. Вы стали президентом, когда экономика оправилась от последствий тяжелейшего финансового кризиса августа 1998 года и вошла в длительный период быстрого роста. Успешная военная кампания позволила добиться мощного укрепления политического авторитета и влияния. Низкая вовлеченность граждан в политику создала ситуацию «свободы рук», позволявшую вам не слишком опасаться проявлений общественного недовольства.
          </p>
          <p>
            <b>Цель:</b> Продержитесь у власти 30 лет.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Начать игру</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  computed: {

  },
  methods: {

  },
  props: ['message']
}
</script>
