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
          src="../images/istockphoto-1413922045-612x612.jpg"
          alt="Computer Image"
          class="img-fluid rounded d-md-block d-none"
          v-motion
          :initial="{ opacity: 0, x: 150 }"
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
          :initial="{ opacity: 0, x: 75 }"
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
              id="username_input"
              placeholder="Enter Your Username"
              style="border-radius: 10px"
              v-model="formDataForSignUp.username"
            />
            <label for="username_input">Enter Your Username</label>
            <span v-for="error in v$ForSignUp.username.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="form-floating my-3 w-75">
            <input
              type="email"
              class="form-control"
              id="email_input"
              placeholder="Enter Your Email"
              style="border-radius: 10px"
              v-model="formDataForSignUp.email"
            />
            <label for="email_input">Enter Your Email Address</label>
            <span v-for="error in v$ForSignUp.email.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="form-floating mb-3 w-75">
            <input
              type="password"
              class="form-control"
              id="password_input"
              placeholder="Enter Your Password"
              style="border-radius: 10px"
              v-model="formDataForSignUp.password"
              ref="passwordInputForSignUp"
            />
            <label for="password_input">Enter Your Password</label>
            <span v-for="error in v$ForSignUp.password.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="form-floating w-75">
            <input
              type="password"
              class="form-control"
              id="confirm_password_input"
              placeholder="Confirm Your Password"
              style="border-radius: 10px"
              v-model="formDataForSignUp.confirmPassword"
              ref="confirmPasswordInputForSignUp"
            />
            <label for="confirm_password_input">Confirm Your Password</label>
            <span
              v-for="error in v$ForSignUp.confirmPassword.$errors"
              class="text-danger mt-3 ms-1"
              >{{ error.$message }}</span
            >
          </div>

          <div class="my-2 w-75 d-flex flex-row justify-content-start align-items-center">
            <button
              class="btn btn-dark"
              @click="revealUnrevealPasswordForSignUp"
              v-if="revealdPasswordForSignUp == false"
            >
              Reveal Password
            </button>
            <button
              class="btn btn-dark"
              @click="revealUnrevealPasswordForSignUp"
              v-if="revealdPasswordForSignUp == true"
            >
              Unreveal Password
            </button>
          </div>

          <div class="w-100 d-flex flex-column justify-content-center align-items-center my-3">
            <button class="btn btn-dark w-75 mb-2" @click="signUp">Sign Up</button>
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
          :initial="{ opacity: 0, x: -75 }"
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
              id="username_input"
              placeholder="Enter Your Username"
              style="border-radius: 10px"
              v-model="formDataForLogin.username"
            />
            <label for="username_input">Enter Your Username</label>
            <span v-for="error in v$ForLogin.username.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="form-floating my-3 w-75">
            <input
              type="password"
              class="form-control"
              id="password_input"
              placeholder="Enter Your Password"
              style="border-radius: 10px"
              v-model="formDataForLogin.password"
              ref="passwordInputForLogin"
            />
            <label for="password_input">Enter Your Password</label>
            <span v-for="error in v$ForLogin.password.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="my-2 w-75 d-flex flex-row justify-content-start align-items-center">
            <button
              class="btn btn-dark"
              @click="revealAndUnrevealPasswordForLogin"
              v-if="revealdPasswordForLogin == false"
            >
              Reveal Password
            </button>
            <button
              class="btn btn-dark"
              @click="revealAndUnrevealPasswordForLogin"
              v-if="revealdPasswordForLogin == true"
            >
              Unreveal Password
            </button>
          </div>

          <div class="w-100 d-flex flex-column justify-content-center align-items-center my-3">
            <button class="btn btn-dark w-75 mb-2" @click="login">Login</button>
          </div>
        </div>
      </div>

      <div
        class="h-100 col-md-6 w-50 d-md-flex flex-row justify-content-center align-items-center d-none"
      >
        <img
          src="../images/istockphoto-1413922045-612x612.jpg"
          alt="Computer Image"
          class="img-fluid rounded d-md-block d-none"
          v-motion
          :initial="{ opacity: 0, x: -150 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { verifyAuthToken } from '@/helpers/verifyAuthToken'
import useVuelidate from '@vuelidate/core'

const router = useRouter()
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

onMounted(async () => {
  if (localStorage.getItem('jwtToken') != '') {
    const jwtToken_validation = await verifyAuthToken(localStorage.getItem('jwtToken'))

    if (jwtToken_validation == 'accepted') {
      router.push('/')
    }
  }
})

const switchMood = () => {
  signUpMood.value = !signUpMood.value
  loginMood.value = !loginMood.value
}

const revealUnrevealPasswordForSignUp = () => {
  revealdPasswordForSignUp.value = !revealdPasswordForSignUp.value
  passwordInputForSignUp.value.type = revealdPasswordForSignUp.value == true ? 'text' : 'password'
  confirmPasswordInputForSignUp.value.type =
    revealdPasswordForSignUp.value == true ? 'text' : 'password'
}

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

const signUp = async () => {
  try {
    const validationResult = await v$ForSignUp.value.$validate()

    if (validationResult) {
      const requestInfo: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formDataForSignUp.username.toLowerCase(),
          email: formDataForSignUp.email,
          password: formDataForSignUp.password.toLowerCase(),
        }),
      }

      const response = await fetch('http://127.0.0.1:3000/registration/signup', requestInfo)
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        localStorage.setItem('jwtToken', data.data.jwtToken)
        localStorage.setItem('userId', data.data.userId)
        router.push({ path: '/' })
        window.location.reload()
      } else {
        signupError.value = data.message
        showSignupError.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const revealAndUnrevealPasswordForLogin = () => {
  revealdPasswordForLogin.value = !revealdPasswordForLogin.value
  passwordInputForLogin.value.type = revealdPasswordForLogin.value == true ? 'text' : 'password'
}

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

const login = async () => {
  try {
    const validationResult = await v$ForLogin.value.$validate()

    if (validationResult) {
      const requestInfo: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formDataForLogin.username.toLowerCase(),
          password: formDataForLogin.password.toLowerCase(),
        }),
      }

      const response = await fetch('http://127.0.0.1:3000/registration/login', requestInfo)
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        localStorage.setItem('jwtToken', data.data.jwtToken)
        localStorage.setItem('userId', data.data.userId)
        router.push({ path: '/' })
        window.location.reload()
      } else {
        loginError.value = data.message
        showLoginError.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
