import { createRouter, createWebHistory } from 'vue-router'
import { verifyAuthToken } from '@/helpers/verifyAuthToken'
import Home from '@/views/Home.vue'
import Registration from '@/views/Registration.vue'
import Tables from '@/views/Tables.vue'
import CreateTable from '@/views/CreateTable.vue'
import TableDetails from '@/views/TableDetails.vue'
import NotFound from '@/views/NotFound.vue'
import Account from '@/views/Account.vue'

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
          (await verifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'Tables',
      path: '/tables',
      component: Tables,
      meta: {
        needs_auth_token:
          (await verifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'CreateTable',
      path: '/createTable',
      component: CreateTable,
      meta: {
        needs_auth_token:
          (await verifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'TableDetails',
      path: '/table/:tableId',
      component: TableDetails,
      meta: {
        needs_auth_token:
          (await verifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'Account',
      path: '/account',
      component: Account,
      meta: {
        needs_auth_token:
          (await verifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'NotFound',
      path: '/:pathName(.*)',
      component: NotFound,
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
