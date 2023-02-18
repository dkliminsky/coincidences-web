<template>
  <div class="card" style="min-width: 260px;">

    <div class="position-absolute top-0 begin-0 pt-3 ps-3">
      <div>
        <span class="badge text-bg-danger">Контроль СМИ</span>
        <span class="badge text-bg-dark me-2">5</span>
      </div>

      <div>
        <span class="badge text-bg-danger">Финансовые ресурсы</span>
        <span class="badge text-bg-dark me-2">2</span>
      </div>

      <div>
        <span class="badge text-bg-info">Контроль СМИ</span>
        <span class="badge text-bg-dark me-2">+2</span>
      </div>

    </div>

    <img src="decree.webp" class="card-img-top" alt="...">

    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"</p>


      <div class="btn-group" role="group" aria-label="Basic example">
        <button @click="applyCard" class="btn btn-info">Использовать</button>
        <button @click="count++" class="btn btn-warning">Заменить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      title: 'Бессмысленность усилий',
    }
  },
  methods: {
    applyCard() {
      console.log('card used')
    }
  }
}
</script>

