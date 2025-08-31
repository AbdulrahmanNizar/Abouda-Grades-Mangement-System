<template>
  <div class="vh-100 w-100 d-flex flex-row justify-content-center align-items-center">
    <div
      class="h-100 w-100 d-flex flex-row justify-content-center align-items-center"
      v-if="signUpMood"
    >
      <div
        class="h-100 col-6 w-50 d-md-flex flex-row justify-content-center align-items-center d-none"
      >
        <img
          src="../images/RegistrationPageImage.jpg"
          alt="Computer Image"
          class="img-fluid rounded d-md-block d-none"
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
        />
      </div>
      <div
        class="col-md-6 col-12 d-flex flex-row justify-content-center align-items-center bg-black bg-gradient text-white h-100"
        style="border-top-left-radius: 20px; border-bottom-left-radius: 20px"
      >
        <div
          class="bg-white bg-gradient text-black d-flex flex-column justify-content-center align-items-center w-75 h-auto"
          style="border-radius: 8px"
          v-motion
          :initial="{ opacity: 0, x: 45 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
        >
          <div class="w-100 d-flex flex-column justify-content-center align-items-center mb-3 mt-5">
            <h2>Welcome</h2>
            <h5>Register to get started</h5>
            <hr class="w-100 fw-bold" />
          </div>

          <div class="w-75 d-flex flex-row justify-content-center align-items-center">
            <transition name="fadeError" v-show="showSignupError" v-motion-pop-visible>
              <div class="alert alert-danger text-center w-100" role="alert">
                {{ signupError }}
              </div>
            </transition>
          </div>

          <div class="btn-group w-75">
            <button class="btn btn-outline-dark" v-if="loginMood" @click="switchMood">
              Sign Up
            </button>
            <button class="btn btn-outline-dark" v-if="signUpMood" @click="switchMood">
              Login
            </button>
            <button class="btn btn-dark" v-if="signUpMood">Sign Up</button>
            <button class="btn btn-dark" v-if="loginMood">Login</button>
          </div>

          <div class="form-floating mt-3 w-75">
            <input
              type="text"
              class="form-control"
              id="usernameInput"
              placeholder="Enter Your Username"
              style="border-radius: 10px"
              v-model="formDataForSignUp.username"
            />
            <label for="usernameInput">Username</label>
            <span v-for="error in v$ForSignUp.username.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="form-floating mt-3 w-75">
            <input
              type="email"
              class="form-control"
              id="emailInput"
              placeholder="Enter Your Email"
              style="border-radius: 10px"
              v-model="formDataForSignUp.email"
            />
            <label for="emailInput">Email Address</label>
            <span v-for="error in v$ForSignUp.email.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="w-75 mb-3 d-flex flex-row justify-content-center align-items-center">
            <div class="form-floating mt-3 me-1 w-75">
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                placeholder="Enter Your Password"
                style="border-radius: 10px"
                v-model="formDataForSignUp.password"
                ref="passwordInputForSignUp"
              />
              <label for="passwordInput">Password</label>
              <span v-for="error in v$ForSignUp.password.$errors" class="text-danger mt-3 ms-1">{{
                error.$message
              }}</span>
            </div>

            <div class="form-floating mt-3 ms-1 w-75">
              <input
                type="password"
                class="form-control"
                id="confirmPasswordInput"
                placeholder="Confirm Your Password"
                style="border-radius: 10px"
                v-model="formDataForSignUp.confirmPassword"
                ref="confirmPasswordInputForSignUp"
              />
              <label for="confirmPasswordInput">Confirm Password</label>
              <span
                v-for="error in v$ForSignUp.confirmPassword.$errors"
                class="text-danger mt-3 ms-1"
                >{{ error.$message }}</span
              >
            </div>
          </div>

          <div class="my-2 w-75 d-flex flex-row justify-content-start align-items-center">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="revealPasswordCheckboxForSignUp"
                v-model="revealdPasswordForSignUp"
              />
              <label class="form-check-label" for="revealPasswordCheckboxForSignUp"
                >Show Password</label
              >
            </div>
          </div>

          <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-3">
            <button class="btn btn-dark w-75 mb-2" @click="signUp" v-if="signUpLoading == false">
              Sign Up
            </button>
            <button
              class="btn btn-dark w-75 mb-2 d-flex flex-row justify-content-center align-items-center"
              disabled
              v-else
            >
              <div class="spinner-border" role="status">
                <span class="visually-hidden mb-0">Loading...</span>
              </div>
            </button>
          </div>

          <div class="w-75 d-flex flex-row justify-content-center align-items-center mt-1">
            <hr class="w-100" />
            <p class="mb-0 mx-1">or</p>
            <hr class="w-100" />
          </div>

          <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-1 mb-3">
            <button class="btn btn-dark w-75" @click="signUpWithGoogle">
              <i class="bi bi-google me-1 mb-0"></i> Sign Up With Google
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="h-100 w-100 d-flex flex-row justify-content-center align-items-center"
      v-if="loginMood"
    >
      <div
        class="col-md-6 col-12 d-flex flex-row justify-content-center align-items-center bg-black bg-gradient text-white h-100"
        style="border-top-right-radius: 20px; border-bottom-right-radius: 20px"
      >
        <div
          class="bg-white bg-gradient text-black d-flex flex-column justify-content-center align-items-center w-75 h-auto"
          style="border-radius: 8px"
          v-motion
          :initial="{ opacity: 0, x: -45 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
        >
          <div class="w-100 d-flex flex-column justify-content-center align-items-center mb-3 mt-5">
            <h2>Welcome</h2>
            <h5>Register to get started</h5>
            <hr class="w-100 fw-bold" />
          </div>

          <div class="w-75 d-flex flex-row justify-content-center align-items-center">
            <transition name="fadeError" v-show="showLoginError" v-motion-pop-visible>
              <div class="alert alert-danger text-center w-100" role="alert">
                {{ loginError }}
              </div>
            </transition>
          </div>

          <div class="btn-group w-75">
            <button class="btn btn-dark" v-if="loginMood">Login</button>
            <button class="btn btn-outline-dark" v-if="loginMood" @click="switchMood">
              Sign Up
            </button>
            <button class="btn btn-dark" v-if="signUpMood">Sign Up</button>
            <button class="btn btn-outline-dark" v-if="signUpMood" @click="switchMood">
              Login
            </button>
          </div>

          <div class="form-floating mt-3 w-75">
            <input
              type="text"
              class="form-control"
              id="usernameInput"
              placeholder="Enter Your Username"
              style="border-radius: 10px"
              v-model="formDataForLogin.username"
            />
            <label for="usernameInput">Username</label>
            <span v-for="error in v$ForLogin.username.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="form-floating my-3 w-75">
            <input
              type="password"
              class="form-control"
              id="passwordInput"
              placeholder="Enter Your Password"
              style="border-radius: 10px"
              v-model="formDataForLogin.password"
              ref="passwordInputForLogin"
            />
            <label for="passwordInput">Password</label>
            <span v-for="error in v$ForLogin.password.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div
            class="my-2 w-75 d-flex flex-md-row flex-column justify-content-between align-items-center"
          >
            <div class="form-check mt-1">
              <input
                class="form-check-input"
                type="checkbox"
                id="revealPasswordCheckboxForLogin"
                v-model="revealdPasswordForLogin"
              />
              <label class="form-check-label" for="revealPasswordCheckboxForLogin"
                >Show Password</label
              >
            </div>
            <div class="d-flex flex-row justify-content-center align-items-center mt-1">
              <button class="btn btn-dark" @click="showSendForgetPasswordEmailModalMethod">
                Forget Password?
              </button>
            </div>
          </div>

          <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-3">
            <button class="btn btn-dark w-75 mb-2" @click="login" v-if="loginLoading == false">
              Login
            </button>
            <button
              class="btn btn-dark w-75 mb-2 d-flex flex-row justify-content-center align-items-center"
              disabled
              v-else
            >
              <div class="spinner-border" role="status">
                <span class="visually-hidden mb-0">Loading...</span>
              </div>
            </button>
          </div>

          <div class="w-75 d-flex flex-row justify-content-center align-items-center mt-1">
            <hr class="w-100" />
            <p class="mb-0 mx-1">or</p>
            <hr class="w-100" />
          </div>

          <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-1 mb-3">
            <button class="btn btn-dark w-75" @click="loginWithGoogle">
              <i class="bi bi-google me-1"></i> Login With Google
            </button>
          </div>
        </div>
      </div>

      <div
        class="h-100 col-6 w-50 d-md-flex flex-row justify-content-center align-items-center d-none"
      >
        <img
          src="../images/RegistrationPageImage.jpg"
          alt="Computer Image"
          class="img-fluid rounded d-md-block d-none"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
        />
      </div>
    </div>

    <transition-group name="fade">
      <div
        class="h-100 w-100 d-flex flex-row justify-content-center align-items-center position-fixed sendForgetPasswordEmailModalBackground"
        v-if="showSendForgetPasswordEmailModal"
      >
        <div
          class="w-50 d-flex flex-column justify-content-center align-items-center p-3 top-25 rounded shadow bg-white position-fixed"
          ref="sendForgetPasswordEmailModal"
        >
          <div class="w-100 d-flex flex-row justify-content-center align-items-center p-3">
            <h3>Forget Password</h3>
          </div>

          <hr class="w-100" />

          <div class="w-100 d-flex flex-row justify-content-center align-items-center my-1">
            <div class="form-floating w-75">
              <input
                type="email"
                class="form-control"
                id="emailInput"
                placeholder="Email Address"
                v-model="formDataForSendForgetPasswordEmail.email"
              />
              <label for="emailInput">Email Address</label>
            </div>
          </div>

          <hr class="w-100" />

          <div class="w-100 d-flex flex-column justify-content-center align-items-center p-3">
            <button class="btn btn-dark w-75" @click="showSendForgetPasswordEmailModalMethod">
              Cancel
            </button>
            <button
              class="btn btn-dark w-75 mt-1"
              @click="sendEmail"
              v-if="sendForgetPasswordEmailLoading == false"
            >
              Send Email
            </button>
            <button
              class="btn btn-dark w-75 mt-1 d-flex flex-row justify-content-center align-items-center"
              disabled
              v-else
            >
              <div class="spinner-border" role="status">
                <span class="visually-hidden mb-0">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>

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
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useVerifyAuthToken } from '@/composables/verifyAuthToken'
import { onClickOutside } from '@vueuse/core'
import useVuelidate from '@vuelidate/core'

const router: Router = useRouter()
const signUpMood = ref<boolean>(true)
const loginMood = ref<boolean>(false)
const revealdPasswordForSignUp = ref<boolean>(false)
const revealdPasswordForLogin = ref<boolean>(false)
const showSignupError = ref<boolean>(false)
const signupError = ref<string>('')
const showLoginError = ref<boolean>(false)
const loginError = ref<string>('')
const passwordInputForLogin = ref<any>()
const passwordInputForSignUp = ref<any>()
const confirmPasswordInputForSignUp = ref<any>()
const loginLoading = ref<boolean>(false)
const signUpLoading = ref<boolean>(false)
const sendForgetPasswordEmailLoading = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)
const showErrorModal = ref<boolean>(false)
const errorMessage = ref<string>('')
const showSendForgetPasswordEmailModal = ref<boolean>(false)
const sendForgetPasswordEmailModal = ref()

onMounted(async () => {
  if (localStorage.getItem('jwtToken') != '' && localStorage.getItem('jwtToken') != null) {
    const jwtTokenValidation = await useVerifyAuthToken(localStorage.getItem('jwtToken'))

    if (jwtTokenValidation == 'accepted') {
      window.location.href = 'http://localhost:5173/'
    }
  }
})

const switchMood = () => {
  signUpMood.value = !signUpMood.value
  loginMood.value = !loginMood.value
}

watch(revealdPasswordForSignUp, (newRevealdPasswordForSignUp, oldRevealdPasswordForSignUp) => {
  if (newRevealdPasswordForSignUp == true) {
    passwordInputForSignUp.value.type = 'text'
    confirmPasswordInputForSignUp.value.type = 'text'
  } else {
    passwordInputForSignUp.value.type = 'password'
    confirmPasswordInputForSignUp.value.type = 'password'
  }
})

const formDataForSignUp = reactive({
  username: <string>'',
  email: <string>'',
  password: <string>'',
  confirmPassword: <string>'',
})

const formRulesForSignUp = computed(() => {
  return {
    username: { required },
    email: { email, required },
    password: { required, minLength: minLength(7) },
    confirmPassword: { required, sameAs: sameAs(formDataForSignUp.password) },
  }
})

const v$ForSignUp = useVuelidate(formRulesForSignUp, formDataForSignUp)

const signUp = async (): Promise<void> => {
  try {
    const validationResult = await v$ForSignUp.value.$validate()

    if (validationResult) {
      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formDataForSignUp.username.toLowerCase().split(' ').join(''),
          email: formDataForSignUp.email,
          password: formDataForSignUp.password,
        }),
      }

      signUpLoading.value = true
      const response = await fetch('http://127.0.0.1:3000/registration/signup', requestOptions)
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        signUpLoading.value = false
        localStorage.setItem('jwtToken', data.data.jwtToken)
        localStorage.setItem('userId', data.data.userId)
        router.push({ path: '/' })
        window.location.reload()
      } else {
        signUpLoading.value = false
        errorMessage.value = data.message
        showErrorModal.value = true
        setTimeout(() => (showErrorModal.value = false), 3000)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const signUpWithGoogle = async (): Promise<void> => {
  try {
    window.location.href = 'http://127.0.0.1:3000/registration/google/signup'
  } catch (err) {
    console.log(err)
  }
}

watch(revealdPasswordForLogin, (newRevealdPasswordForLogin, oldRevealdPasswordForLogin) => {
  if (newRevealdPasswordForLogin == true) {
    passwordInputForLogin.value.type = 'text'
  } else {
    passwordInputForLogin.value.type = 'password'
  }
})

const formDataForLogin = reactive({
  username: <string>'',
  password: <string>'',
})

const formRulesForLogin = computed(() => {
  return {
    username: { required },
    password: { required, minLength: minLength(7) },
  }
})

const v$ForLogin = useVuelidate(formRulesForLogin, formDataForLogin)

const login = async (): Promise<void> => {
  try {
    const validationResult = await v$ForLogin.value.$validate()

    if (validationResult) {
      const requestOptions: RequestInit = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formDataForLogin.username.toLowerCase().split(' ').join(''),
          password: formDataForLogin.password,
        }),
      }

      loginLoading.value = true
      const response = await fetch('http://127.0.0.1:3000/registration/login', requestOptions)
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        loginLoading.value = false
        localStorage.setItem('jwtToken', data.data.jwtToken)
        localStorage.setItem('userId', data.data.userId)
        router.push({ path: '/' })
        window.location.reload()
      } else {
        loginLoading.value = false
        errorMessage.value = data.message
        showErrorModal.value = true
        setTimeout(() => (showErrorModal.value = false), 3000)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const loginWithGoogle = async (): Promise<void> => {
  try {
    window.location.href = 'http://127.0.0.1:3000/registration/google/login'
  } catch (err) {
    console.log(err)
  }
}

onClickOutside(
  sendForgetPasswordEmailModal,
  () => (showSendForgetPasswordEmailModal.value = !showSendForgetPasswordEmailModal.value),
)

const showSendForgetPasswordEmailModalMethod = (): void => {
  showSendForgetPasswordEmailModal.value = !showSendForgetPasswordEmailModal.value
}

const formDataForSendForgetPasswordEmail = reactive({
  email: '',
})

const formRulesForSendForgetPasswordEmail = computed(() => {
  return {
    email: { required, email },
  }
})

const v$ForSendForgetPasswordEmail = useVuelidate(
  formRulesForSendForgetPasswordEmail,
  formDataForSendForgetPasswordEmail,
)

const sendEmail = async (): Promise<void> => {
  const validationResult = await v$ForSendForgetPasswordEmail.value.$validate()

  if (validationResult) {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formDataForSendForgetPasswordEmail.email,
      }),
    }

    sendForgetPasswordEmailLoading.value = true
    const response = await fetch(
      'http://127.0.0.1:3000/mailes-management/sendCreateNewPasswordEmail',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      sendForgetPasswordEmailLoading.value = false
      showSendForgetPasswordEmailModal.value = false
      showSuccessModal.value = true
      setTimeout(() => (showSuccessModal.value = false), 2000)
    } else {
      sendForgetPasswordEmailLoading.value = false
      errorMessage.value = data.message
      showErrorModal.value = true
      setTimeout(() => (showErrorModal.value = false), 3000)
    }
  } else {
    errorMessage.value = v$ForSendForgetPasswordEmail.value.email.$errors[0].$message.toString()
    showErrorModal.value = true
    setTimeout(() => (showErrorModal.value = false), 3000)
  }
}
</script>

<style>
@media only screen and (max-width: 991px) {
  .successAndErrorModals {
    width: 80% !important;
  }
}

.sendForgetPasswordEmailModalBackground {
  background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.7s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.7s ease;
}
</style>
