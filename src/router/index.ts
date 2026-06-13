import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GeneratingView from '../views/GeneratingView.vue'
import ResultView from '../views/ResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/generating', name: 'generating', component: GeneratingView },
    { path: '/result', name: 'result', component: ResultView },
  ],
})

export default router
