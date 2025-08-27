<template>
  <div class="h-100 text-black d-flex flex-row justify-content-center align-items-center">
    <div
      class="bg-black bg-gradient d-flex flex-row justify-content-center align-items-center h-75"
      style="width: 60%; border-radius: 20px"
      id="cardBackground"
    >
      <CreateNewPasswordCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateNewPasswordCard from '@/components/CreateNewPasswordPage/CreateNewPasswordCard.vue'
</script>
