<template></template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const jwtToken: string | any = route.params.jwtToken

localStorage.setItem('jwtToken', jwtToken)
router.push({ path: '/' })
</script>
