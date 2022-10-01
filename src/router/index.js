import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CompanyView from '../views/CompanyView.vue'
import EditCompanyView from '../views/Company/EditCompanyView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/company',
    name: 'company',
    component: CompanyView
  },
  {
    path: '/editCompany/:id',
    name: 'editCompany',
    component: EditCompanyView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
