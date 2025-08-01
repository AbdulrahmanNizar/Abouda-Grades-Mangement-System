<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { verify_auth_token } from './helpers/verify_auth_token'

const router = useRouter()

onMounted(async () => {
  const jwt_token = localStorage.getItem('jwt_token')
  if (jwt_token != '' && jwt_token != null) {
    const jwt_token_validation = await verify_auth_token(jwt_token)
    if (jwt_token_validation == 'rejected') {
      router.push({ path: '/registration' })
    }
  } else {
    router.push({ path: '/registration' })
  }
})

const validate_jwt_token = async () => {
  const jwt_token = localStorage.getItem('jwt_token')
  if (jwt_token != '' && jwt_token != null) {
    const jwt_token_validation = await verify_auth_token(jwt_token)
    if (jwt_token_validation == 'rejected') {
      router.push({ path: '/registration' })
    }
  } else {
    router.push({ path: '/registration' })
  }
}

setInterval(validate_jwt_token, 10000)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');

#app {
  font-family: 'Quicksand';
  height: 100vh;
  box-sizing: border-box;
}

.route-enter-from {
  opacity: 0;
}

.route-enter-to {
  opacity: 1;
}

.route-enter-active {
  transition: all 0.7s ease;
}

.route-leave-from {
  opacity: 1;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.7s ease;
}

.fadeError-enter-from {
  opacity: 0;
}

.fadeError-enter-to {
  opacity: 1;
}

.fadeError-enter-active {
  transition: all 0.7 ease;
}

.fadeError-leave-from {
  opacity: 1;
}

.fadeError-leave-to {
  opacity: 0;
}

.fadeError-leave-active {
  transition: all 0.7 ease;
}
</style>
