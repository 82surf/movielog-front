import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/accounts/Signup.vue'
import Login from '../views/accounts/Login.vue'
import Profile from '../views/profiles/Profile.vue'
import MovieSearch from '../views/profiles/MovieSearch.vue'
import ReviewCreate from '../views/profiles/ReviewCreate.vue'
import UserSearchResult from '../views/profiles/UserSearchResult'
import Landing from '../views/Landing.vue'
import CheckPassword from '../views/accounts/CheckPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/check-password',
    name: 'CheckPassword',
    component: CheckPassword
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/review/search',
    name: 'MovieSearch',
    component: MovieSearch
  },
  {
    path: '/review/create',
    name: 'ReviewCreate',
    component: ReviewCreate
  },
  {
    path: '/search/:username',
    name: 'UserSearchResult',
    component: UserSearchResult
  },
  {
    path: '/home',
    name: 'Landing',
    component: Landing
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
