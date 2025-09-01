<template>
  <div
    class="w-75 p-3 bg-white bg-gradient border rounded d-flex flex-column justify-content-center align-items-center h-auto"
    v-motion-slide-bottom
  >
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-4 mb-3">
      <h3>Change Password</h3>
      <hr class="w-100" />
    </div>

    <div class="form-floating mb-3 w-75">
      <input
        type="password"
        class="form-control"
        id="newPasswordInput"
        placeholder="New Password"
        v-model="formData.password"
        ref="passwordInput"
      />
      <label for="newPasswordInput">New Password</label>
    </div>

    <div class="my-2 w-75 d-flex flex-row justify-content-start align-items-center">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="revealPasswordCheckboxForLogin"
          v-model="revealdPassword"
        />
        <label class="form-check-label" for="revealPasswordCheckboxForLogin">Show Password</label>
      </div>
    </div>

    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <hr class="w-100" />
      <button class="btn btn-dark w-75 my-2" @click="changePassword" v-if="loading == false">
        Change
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
      <div class="toast-body">The password was changed successfully</div>
    </div>
  </transition-group>

  <transition-group name="slideUp">
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
import { ref, reactive, computed, watch } from 'vue'
import {
  useRouter,
  useRoute,
  type Router,
  type RouteLocationNormalizedGeneric,
  type LocationQueryValue,
} from 'vue-router'
import { required, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const router: Router = useRouter()
const route: RouteLocationNormalizedGeneric = useRoute()
const userId: LocationQueryValue | LocationQueryValue[] | any | string = route.query.userId
const showSuccessModal = ref<boolean>(false)
const showErrorModal = ref<boolean>(false)
const errorMessage = ref<string>('')
const loading = ref<boolean>(false)
const revealdPassword = ref<boolean>(false)
const passwordInput = ref()

const changePasswordLinkState = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'PATCH',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: encodeURIComponent(userId),
        valid: false,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/change-password-links-management/changePasswordLinkState',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
    }
  } catch (err) {
    console.log(err)
  }
}

watch(revealdPassword, (newRevealdPassword, oldRevealdPassword) => {
  if (newRevealdPassword == true) {
    passwordInput.value.type = 'text'
  } else {
    passwordInput.value.type = 'password'
  }
})

const formData = reactive({
  password: <string>'',
})

const formRules = computed(() => {
  return {
    password: { required, minLength: minLength(7) },
  }
})

const v$ = useVuelidate(formRules, formData)

const changePassword = async (): Promise<void> => {
  try {
    await changePasswordLinkState()

    const validationResult = await v$.value.$validate()

    if (validationResult) {
      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          newPassword: formData.password,
        }),
      }

      loading.value = true
      const response = await fetch(
        'http://127.0.0.1:3000/users-management/changePassword',
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
      errorMessage.value = v$.value.password.$errors[0].$message.toString()
      showErrorModal.value = true
      setTimeout(() => (showErrorModal.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
