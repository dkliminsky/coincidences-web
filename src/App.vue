<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
  	applyCard() {

  	}
  }
}
</script>

<template>
		<HelloWorld/>

	<nav class="navbar navbar-expand-lg bg-body-tertiary">
	  <div class="container-fluid">
		<a class="navbar-brand" href="#">Navbar</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  <span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
		  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
			<li class="nav-item">
			  <a class="nav-link active" aria-current="page" href="#">Home</a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">Link</a>
			</li>
			<li class="nav-item dropdown">
			  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Dropdown
			  </a>
			  <ul class="dropdown-menu">
				<li><a class="dropdown-item" href="#">Action</a></li>
				<li><a class="dropdown-item" href="#">Another action</a></li>
				<li><hr class="dropdown-divider"></li>
				<li><a class="dropdown-item" href="#">Something else here</a></li>
			  </ul>
			</li>
			<li class="nav-item">
			  <a class="nav-link disabled">Disabled</a>
			</li>
		  </ul>
		  <form class="d-flex" role="search">
			<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
			<button class="btn btn-outline-success" type="submit">Search</button>
		  </form>
		</div>
	  </div>
	</nav>

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
          <tr>
            <td text-nowrap>
            		<span class="fa-solid fa-user"></span>
            		Лояльность элит
            </td>
            <td style="width: 100%; min-width: 120px;">
              <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated bg-info" style="width: 50%"></div>
              </div>
            </td>
            <td>
            6
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
        <h5 class="card-title">Бессмысленность усилий</h5>
        <p class="card-text">Развитие мыслей: "Ты все равно ничего не изменишь! Куда прёшь против системы!"</p>


        <div class="btn-group" role="group" aria-label="Basic example">
          <button @click="applyCard" class="btn btn-info">Использовать</button>
          <button @click="count++" class="btn btn-warning">Заменить</button>
        </div>
        </div>
      </div>
    </div>

    <div class="col">
    </div>

  </div>
  </div>


</template>
