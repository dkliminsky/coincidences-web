<script setup>
import Card from './components/Card.vue'
import Degree from "@/components/Degree.vue";
</script>

<script>
export default {
  data() {
    return {
      degrees: [
        {
          'name': 'elite',
          'title': 'Лояльность элит',
          'icon': 'fa-solid fa-user',
          'value': 8,
          'valueMax': 12,
        },
        {
          'name': 'finance',
          'title': 'Финансовые ресурсы',
          'icon': 'fa-solid fa-sack-dollar',
          'value': 11,
          'valueMax': 12,
        },
        {
          'name': 'law',
          'title': 'Влияние на право',
          'icon': 'fa-solid fa-scale-balanced',
          'value': 9,
          'valueMax': 12,
        },
        {
          'name': 'siloviki',
          'title': 'Силовики',
          'icon': 'fa-solid fa-person-military-rifle',
          'value': 11,
          'valueMax': 12,
        },
        {
          'name': 'media',
          'title': 'Контроль СМИ',
          'icon': 'fa-solid fa-tv',
          'value': 12,
          'valueMax': 12,
        },


      ],
      count: 0
    }
  },
  methods: {
  }
}
</script>

<template>
	<div class="text-bg-secondary bg-gradient p-3">
    <span class="badge text-bg-light">Год правления</span>
    <span class="badge text-bg-dark me-2">{{ count }}</span>

    <span class="badge text-bg-light">Президентский срок</span>
    <span class="badge text-bg-dark me-2">1</span>

    <span class="badge text-bg-light">Окончание срока</span>
    <span class="badge text-bg-dark me-2">4</span>
	</div>

  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
          <tbody>
            <tr v-for="degree in degrees">
              <Degree :degree="degree" />
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col">
        <table class="table table-sm table-borderless table-hover align-middle">
        <tbody>
          <tr>
            <td text-nowrap>Лояльность элит</td>
            <td style="width: 100%; min-width: 120px;">
              <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated bg-info" style="width: 50%"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Финансовые&nbsp;ресурсы</td>
            <td style="width: 100%">
              <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-danger progress-bar-striped progress-bar-animated bg-info" style="width: 20%"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Влияние&nbsp;на&nbsp;право</td>
            <td style="width: 100%">
              <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated bg-info" style="width: 85%"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Силовики</td>
            <td style="width: 100%">
              <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated bg-info" style="width: 85%"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Контроль&nbsp;СМИ</td>
            <td style="width: 100%">
              <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated bg-info" style="width: 85%"></div>
              </div>
            </td>
          </tr>
        </tbody>
        </table>
      </div>

    </div>
  </div>

  <div class="container-fluid">
  <div class="row gy-3 justify-content-md-center">
    <div class="col">
      <Card/>
    </div>

    <div class="col">
      <Card/>
    </div>

    <div class="col">
      <Card/>
    </div>

  </div>
  </div>


</template>
