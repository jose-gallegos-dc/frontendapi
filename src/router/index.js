import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies';
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import CompanyView from '../views/CompanyView.vue'
import EditCompanyView from '../views/Company/EditCompanyView.vue'
import  CreateCompanyView from '@/views/Company/CreateCompanyView.vue'

Vue.use(VueRouter)
Vue.use(VueCookies);

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
    path: '/company/create',
    name: 'company/create',
    component: CreateCompanyView
  },
  {
    path: '/company/:id',
    name: 'company/:id',
    component: EditCompanyView
  },
  
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// const cookie = new VueCookies();


router.beforeEach((to, from, next) => {
     if (to.name === 'home' && Vue.$cookies.isKey('access_token') == true) {
       router.push('dashboard')
     }
     next()
     if (to.name != 'home' && Vue.$cookies.isKey('access_token') == false) {
      router.push('/')
    }
    next()
     
   })





export default router
