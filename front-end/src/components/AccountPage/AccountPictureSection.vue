<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center">
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <label for="changeYourAccountPictureInput" class="form-label btn btn-dark w-50"
        >Change Your Account Picture</label
      >
      <input
        type="file"
        id="changeYourAccountPictureInput"
        class="form-control w-50 d-none"
        placeholder="Change Your Account Picture"
        @change="uploadFile"
      />
    </div>
    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-1">
      <button
        class="btn btn-dark w-50"
        :disabled="disableChangeAndResetButtons"
        @click="changeAccountPicture"
        v-if="loading == false"
      >
        Change
      </button>

      <button
        class="btn btn-dark w-50 d-flex flex-row justify-content-center align-items-center"
        disabled
        v-else
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden mb-0">Loading...</span>
        </div>
      </button>

      <button
        class="btn btn-dark w-50 mt-1"
        :disabled="disableChangeAndResetButtons"
        @click="resetUploadedFileBase64"
      >
        Reset
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
        <strong class="me-auto">Success</strong>
      </div>
      <div class="toast-body">✅ Operation Completed</div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, type Router } from 'vue-router'

const router: Router = useRouter()
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const uploadedFileBase64 = ref<ArrayBuffer | string | null>('')
const loading = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)

const disableChangeAndResetButtons = computed(() => {
  if (uploadedFileBase64.value == '') {
    return true
  } else {
    return false
  }
})

const resetUploadedFileBase64 = (): void => {
  uploadedFileBase64.value = ''
}

const uploadFile = (event: any): void => {
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.addEventListener('load', () => {
    uploadedFileBase64.value = reader.result
  })

  reader.readAsDataURL(file)
}

const changeAccountPicture = async (): Promise<void> => {
  if (uploadedFileBase64.value != '' || uploadedFileBase64.value != null) {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        fileBase64: uploadedFileBase64.value,
      }),
    }

    loading.value = true
    const response = await fetch(
      'http://127.0.0.1:3000/users-management/changeAccountPicture',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      loading.value = false
      showSuccessModal.value = true
      setTimeout(() => window.location.reload(), 2000)
    } else if (data.statusCode == 403) {
      router.push({ path: '/registration' })
    }
  }
}
</script>
