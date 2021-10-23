import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/:id',
    name: 'profile',
    component: Profile
  },
  {
    path: '/groupomania/main',
    name: 'main',
    component: Main
  },
]

const router = new VueRouter({
  routes
})

export default router
