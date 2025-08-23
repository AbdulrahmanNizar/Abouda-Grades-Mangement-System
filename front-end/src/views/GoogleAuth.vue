<template></template>

<script setup lang="ts">
import {
  useRouter,
  useRoute,
  type Router,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'

const router: Router = useRouter()
const route: RouteLocationNormalizedLoadedGeneric = useRoute()
const userId: string | any = route.params.userId
const jwtToken: string | any = route.params.jwtToken

localStorage.setItem('userId', userId)
localStorage.setItem('jwtToken', jwtToken)
router.push({ path: '/' })
</script>
