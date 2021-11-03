import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Main from '../views/Main.vue'
import Publications from '../views/Publications.vue'
import Media from '../views/Media.vue'

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
  {
    path: '/groupomania/main/media',
    name: 'media',
    component: Media
  },
  {
    path: '/profile/publications',
    name: 'publications',
    component: Publications
  },
]

const router = new VueRouter({
  routes
})

export default router
