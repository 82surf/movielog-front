import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/profiles/Profile.vue'
import MovieSearch from '../views/profiles/MovieSearch.vue'
import ReviewCreate from '../views/profiles/ReviewCreate.vue'
import UserSearchResult from '../views/profiles/UserSearchResult'
import Landing from '../views/Landing.vue'
import RecommendMovie from '../views/recommend/RecommendMovie.vue'
import test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [
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
  {
    path: '/recommendmovie',
    name: 'RecommendMovie',
    component: RecommendMovie
  },
  {
    path: '/test',
    name: 'test',
    component: test,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
