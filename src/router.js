import { createRouter, createWebHashHistory } from 'vue-router'
// // import VueRouter from 'vue-router'

// import HelloWorld from './views/Home.vue'
import Home from './views/Home/Home.vue'
import Error from './views/error/Error'

// export default () => createRouter({
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }, 

    {
      path: '/people',
      name: 'People',
      component: () => import('./views/people/People.vue')
    },
    {
      path: '/starships',
      name: 'Ships',
      component: () => import('./views/ships/Ships.vue')
    },
    {
      path: '/planets',
      name: 'Planets',
      component: () => import('./views/planets/Planets.vue')
    },
    
    {
      path: "/people/:id",
      name: 'DetailsPeople',
      component: () => import('./components/details/Details.vue')
    },
    {
      path: '/starships/:id',
      name: 'DetailsShips',
      component: () => import('./components/details/Details.vue')
    },
    {
      path: '/planets/:id',
      name: 'DetailsPLanets',
      component: () => import('./components/details/Details.vue')
    },

    {
        path: "/:pathMatch(.*)*",
        name: '404',
        component: Error
    }
  ]
})


export default router;