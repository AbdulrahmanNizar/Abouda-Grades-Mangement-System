import { createRouter, createWebHistory } from 'vue-router'
import { verify_auth_token } from '@/helpers/verify_auth_token'
import Home from '@/views/Home.vue'
import Registration from '@/views/Registration.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Registration',
      path: '/registration',
      component: Registration,
    },
    {
      name: 'Home',
      path: '/',
      component: Home,
      meta: {
        needs_auth_token:
          (await verify_auth_token(localStorage.getItem('jwt_token'))) == 'accepted' ? false : true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.needs_auth_token == true) {
    next('/registration')
  } else {
    next()
  }
})

export default router
