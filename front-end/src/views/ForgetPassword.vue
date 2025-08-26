<template>
  <div class="h-100 text-black d-flex flex-row justify-content-center align-items-center">
    <div
      class="bg-black bg-gradient d-flex flex-row justify-content-center align-items-center h-75"
      style="width: 60%; border-radius: 20px"
      id="cardBackground"
    >
      <SendEmailCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import SendEmailCard from '@/components/ForgetPasswordPage/SendEmailCard.vue'
</script>

<style>
@media only screen and (max-width: 991px) {
  #cardBackground {
    width: 90% !important;
  }
}
</style>
