<template>
  <div
    class="w-75 p-3 bg-white bg-gradient border rounded d-flex flex-column justify-content-center align-items-center h-auto"
    v-motion-slide-bottom
  >
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-4 mb-3">
      <h3>Forget Password</h3>
      <hr class="w-100" />
    </div>

    <div class="form-floating mb-3 w-75">
      <input
        type="email"
        class="form-control"
        id="emailInput"
        placeholder="Email Address"
        v-model="formData.email"
      />
      <label for="emailInput">Email Address</label>
    </div>

    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <hr class="w-100" />
      <button class="btn btn-dark w-75 my-2" @click="sendEmail" v-if="loading == false">
        Send Email
      </button>
      <button
        class="btn btn-dark w-75 my-2 d-flex flex-row justify-content-center align-items-center"
        disabled
        v-else
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden mb-0">Loading...</span>
        </div>
      </button>
    </div>
  </div>

  <transition-group name="slideUp">
    <div
      class="d-flex d-md-none flex-row justify-content-center align-items-center mt-5 bottom-50 bg-white position-fixed errorForNotEnoughSubjectsCard"
      style="width: 50%"
      v-if="showSuccessModal"
    >
      <div
        class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          <h4>The email was sent successfully ✅</h4>
        </div>
      </div>
    </div>
    <div
      class="toast bg-white d-block position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showSuccessModal"
    >
      <div class="toast-header">
        <strong class="me-auto">✅ Operation Completed</strong>
      </div>
      <div class="toast-body">The email was sent successfully</div>
    </div>
  </transition-group>

  <transition-group name="slideUp">
    <div
      class="d-flex d-md-none flex-row justify-content-center align-items-center mt-5 bottom-50 bg-white position-fixed errorForNotEnoughSubjectsCard"
      style="width: 50%"
      v-if="showErrorModal"
    >
      <div
        class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          <h5 class="text-center">Operation Failed ❌</h5>
        </div>

        <hr class="w-100" />

        <div class="w-100 d-flex flex-row justify-content-center align-items-center">
          <h6 class="text-center">{{ errorMessage }}</h6>
        </div>
      </div>
    </div>
    <div
      class="toast bg-white d-block position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showErrorModal"
    >
      <div class="toast-header">
        <strong class="me-auto">❌ Operation Failed</strong>
      </div>
      <div class="toast-body">{{ errorMessage }}</div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const router: Router = useRouter()
const loading = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)
const showErrorModal = ref<boolean>(false)
const errorMessage = ref<string>('')

const formData = reactive({
  email: '',
})

const formRules = computed(() => {
  return {
    email: { required, email },
  }
})

const v$ = useVuelidate(formRules, formData)

const sendEmail = async (): Promise<void> => {
  const validationResult = await v$.value.$validate()

  if (validationResult) {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
      }),
    }

    loading.value = true
    const response = await fetch(
      'http://127.0.0.1:3000/mailes-management/sendCreateNewPasswordEmail',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      loading.value = false
      showSuccessModal.value = true
      setTimeout(() => router.push({ path: '/registration' }), 2000)
    } else {
      loading.value = false
      errorMessage.value = data.message
      showErrorModal.value = true
      setTimeout(() => (showErrorModal.value = false), 3000)
    }
  } else {
    errorMessage.value = v$.value.email.$errors[0].$message.toString()
    showErrorModal.value = true
    setTimeout(() => (showErrorModal.value = false), 3000)
  }
}
</script>
