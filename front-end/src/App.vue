<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style>
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
