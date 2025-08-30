import { createRouter, createWebHistory } from 'vue-router'
import { useVerifyAuthToken } from '@/composables/verifyAuthToken'
import Home from '@/views/Home.vue'
import Registration from '@/views/Registration.vue'
import Tables from '@/views/Tables.vue'
import CreateTable from '@/views/CreateTable.vue'
import TableDetails from '@/views/TableDetails.vue'
import NotFound from '@/views/NotFound.vue'
import Account from '@/views/Account.vue'
import GoogleAuth from '@/views/GoogleAuth.vue'
import EditTable from '@/views/EditTable.vue'
import CreateNewPassword from '@/views/CreateNewPassword.vue'

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
        needsAuthToken:
          (await useVerifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'Tables',
      path: '/tables',
      component: Tables,
      meta: {
        needsAuthToken:
          (await useVerifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'CreateTable',
      path: '/createTable',
      component: CreateTable,
      meta: {
        needsAuthToken:
          (await useVerifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'EditTable',
      path: '/editTable/:tableId',
      component: EditTable,
      meta: {
        needsAuthToken:
          (await useVerifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'TableDetails',
      path: '/table/:tableId',
      component: TableDetails,
      meta: {
        needsAuthToken:
          (await useVerifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'Account',
      path: '/account',
      component: Account,
      meta: {
        needsAuthToken:
          (await useVerifyAuthToken(localStorage.getItem('jwtToken'))) == 'accepted' ? false : true,
      },
    },
    {
      name: 'CreateNewPassword',
      path: '/createNewPassword',
      component: CreateNewPassword,
    },
    {
      name: 'GoogleAuth',
      path: '/googleAuth/:jwtToken/:userId',
      component: GoogleAuth,
    },
    {
      name: 'NotFound',
      path: '/:pathName(.*)',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuthToken == true) {
    next('/registration')
  } else {
    next()
  }
})

export default router
