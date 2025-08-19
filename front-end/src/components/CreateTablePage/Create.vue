<template>
  <div></div>

  <div
    class="d-flex d-md-none flex-row justify-content-center align-items-center mt-5 p-3 operationResultModal"
    style="width: 50%"
    v-if="showSuccessModal"
  >
    <div
      class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      v-motion-pop-visible
    >
      <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
        <h4>Operation Completed ✅</h4>
      </div>
    </div>
  </div>
  <div
    class="toast d-md-block position-fixed"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style="bottom: 3%; right: 1%"
    v-motion-pop-visible
    v-if="showSuccessModal"
  >
    <div class="toast-header">
      <strong class="me-auto">Success</strong>
    </div>
    <div class="toast-body">✅ Operation Completed</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSuccessModal = ref<boolean>(false)
</script>
