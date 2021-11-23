import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Main from '../views/Main.vue'
import Publications from '../views/Publications.vue'
import UserPage from '../views/UserPage.vue'


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
    path: '/profile/publications',
    name: 'publications',
    component: Publications
  },
   {
    path: '/userpage/:id',
    name: 'userPage',
    component: UserPage,
    props: true,

  },
]

const router = new VueRouter({
  routes
})

export default router
