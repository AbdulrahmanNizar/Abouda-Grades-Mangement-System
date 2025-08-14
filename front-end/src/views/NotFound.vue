<template>
  <div class="h-100 d-flex flex-row justify-content-center align-items-center">
    <div
      class="shadow rounded p-5 d-flex flex-column justify-content-center align-items-center"
      v-motion-fade
    >
      <h2>Page Not Found</h2>
      <hr class="w-100" />
      <router-link :to="{ path: '/' }" class="btn btn-dark w-100">Home</router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
