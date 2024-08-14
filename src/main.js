import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'

import App from './App.vue'
import Home from './pages/Home.vue'
import Game from './pages/Game.vue'


const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/game/:session/', name: 'game', component: Game },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})


let app = createApp(App)

app.use(router)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
// import "bootstrap/dist/css/bootstrap.css"
