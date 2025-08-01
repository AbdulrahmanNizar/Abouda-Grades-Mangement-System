<template>
  <div class="vh-100 w-100 d-flex flex-row justify-content-center align-items-center">
    <div
      class="h-100 w-100 d-flex flex-row justify-content-center align-items-center"
      v-if="sign_up_mood"
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
            <transition name="fadeError" v-show="show_signup_error" v-motion-pop-visible>
              <div class="alert alert-danger text-center w-100" role="alert">
                {{ signup_error }}
              </div>
            </transition>
          </div>

          <div class="btn-group w-75">
            <button class="btn btn-outline-dark" v-if="login_mood" @click="switch_mood">
              Sign Up
            </button>
            <button class="btn btn-outline-dark" v-if="sign_up_mood" @click="switch_mood">
              Login
            </button>
            <button class="btn btn-dark" v-if="sign_up_mood">Sign Up</button>
            <button class="btn btn-dark" v-if="login_mood">Login</button>
          </div>

          <div class="form-floating mt-3 w-75">
            <input
              type="text"
              class="form-control"
              id="username_input"
              placeholder="Enter Your Username"
              style="border-radius: 10px"
              v-model="form_data_for_sign_up.username"
            />
            <label for="username_input">Enter Your Username</label>
            <span v-for="error in v$_for_sign_up.username.$errors" class="text-danger mt-3 ms-1">{{
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
              v-model="form_data_for_sign_up.email"
            />
            <label for="email_input">Enter Your Email Address</label>
            <span v-for="error in v$_for_sign_up.email.$errors" class="text-danger mt-3 ms-1">{{
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
              v-model="form_data_for_sign_up.password"
              ref="password_input_for_sign_up"
            />
            <label for="password_input">Enter Your Password</label>
            <span v-for="error in v$_for_sign_up.password.$errors" class="text-danger mt-3 ms-1">{{
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
              v-model="form_data_for_sign_up.confirm_password"
              ref="confirm_password_input_for_sign_up"
            />
            <label for="confirm_password_input">Confirm Your Password</label>
            <span
              v-for="error in v$_for_sign_up.confirm_password.$errors"
              class="text-danger mt-3 ms-1"
              >{{ error.$message }}</span
            >
          </div>

          <div class="my-2 w-75 d-flex flex-row justify-content-start align-items-center">
            <button
              class="btn btn-dark"
              @click="reveal_unreveal_password_for_sign_up"
              v-if="reveald_password_for_sign_up == false"
            >
              Reveal Password
            </button>
            <button
              class="btn btn-dark"
              @click="reveal_unreveal_password_for_sign_up"
              v-if="reveald_password_for_sign_up == true"
            >
              Unreveal Password
            </button>
          </div>

          <div class="w-100 d-flex flex-column justify-content-center align-items-center my-3">
            <button class="btn btn-dark w-75 mb-2" @click="sign_up">Sign Up</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="h-100 w-100 d-flex flex-row justify-content-center align-items-center"
      v-if="login_mood"
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
            <transition name="fadeError" v-show="show_login_error" v-motion-pop-visible>
              <div class="alert alert-danger text-center w-100" role="alert">
                {{ login_error }}
              </div>
            </transition>
          </div>

          <div class="btn-group w-75">
            <button class="btn btn-dark" v-if="login_mood">Login</button>
            <button class="btn btn-outline-dark" v-if="login_mood" @click="switch_mood">
              Sign Up
            </button>
            <button class="btn btn-dark" v-if="sign_up_mood">Sign Up</button>
            <button class="btn btn-outline-dark" v-if="sign_up_mood" @click="switch_mood">
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
              v-model="form_data_for_login.username"
            />
            <label for="username_input">Enter Your Username</label>
            <span v-for="error in v$_for_login.username.$errors" class="text-danger mt-3 ms-1">{{
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
              v-model="form_data_for_login.password"
              ref="password_input_for_login"
            />
            <label for="password_input">Enter Your Password</label>
            <span v-for="error in v$_for_login.password.$errors" class="text-danger mt-3 ms-1">{{
              error.$message
            }}</span>
          </div>

          <div class="my-2 w-75 d-flex flex-row justify-content-start align-items-center">
            <button
              class="btn btn-dark"
              @click="reveal_unreveal_password_for_login"
              v-if="reveald_password_for_login == false"
            >
              Reveal Password
            </button>
            <button
              class="btn btn-dark"
              @click="reveal_unreveal_password_for_login"
              v-if="reveald_password_for_login == true"
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
import { verify_auth_token } from '@/helpers/verify_auth_token'
import useVuelidate from '@vuelidate/core'

const router = useRouter()
const sign_up_mood = ref<boolean>(true)
const login_mood = ref<boolean>(false)
const reveald_password_for_sign_up = ref<boolean>(false)
const reveald_password_for_login = ref<boolean>(false)
const show_signup_error = ref<boolean>(false)
const signup_error = ref<string>('')
const show_login_error = ref<boolean>(false)
const login_error = ref<string>('')
const password_input_for_login = ref<any>()
const password_input_for_sign_up = ref<any>()
const confirm_password_input_for_sign_up = ref<any>()

onMounted(async () => {
  if (localStorage.getItem('jwt_token') != '') {
    const jwt_token_validation = await verify_auth_token(localStorage.getItem('jwt_token'))

    if (jwt_token_validation == 'accepted') {
      router.push('/')
    }
  }
})

const switch_mood = () => {
  sign_up_mood.value = !sign_up_mood.value
  login_mood.value = !login_mood.value
}

const reveal_unreveal_password_for_sign_up = () => {
  reveald_password_for_sign_up.value = !reveald_password_for_sign_up.value
  password_input_for_sign_up.value.type =
    reveald_password_for_sign_up.value == true ? 'text' : 'password'
  confirm_password_input_for_sign_up.value.type =
    reveald_password_for_sign_up.value == true ? 'text' : 'password'
}

const form_data_for_sign_up = reactive({
  username: <string>'',
  email: <string>'',
  password: <string>'',
  confirm_password: <string>'',
})

const form_rules_for_sign_up = computed(() => {
  return {
    username: { required },
    email: { email, required },
    password: { required, minLength: minLength(7) },
    confirm_password: { required, sameAs: sameAs(form_data_for_sign_up.password) },
  }
})

const v$_for_sign_up = useVuelidate(form_rules_for_sign_up, form_data_for_sign_up)

const sign_up = async () => {
  try {
    const validation_result = await v$_for_sign_up.value.$validate()

    if (validation_result) {
      const request_options: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form_data_for_sign_up.username.toLowerCase(),
          email: form_data_for_sign_up.email,
          password: form_data_for_sign_up.password.toLowerCase(),
        }),
      }

      const response = await fetch('http://127.0.0.1:3000/registration/signup', request_options)
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        localStorage.setItem('jwt_token', data.data.jwt_token)
        localStorage.setItem('user_id', data.data.user_id)
        router.push({ path: '/' })
        window.location.reload()
      } else {
        signup_error.value = data.message
        show_signup_error.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const reveal_unreveal_password_for_login = () => {
  reveald_password_for_login.value = !reveald_password_for_login.value
  password_input_for_login.value.type =
    reveald_password_for_login.value == true ? 'text' : 'password'
}

const form_data_for_login = reactive({
  username: <string>'',
  password: <string>'',
})

const form_rules_for_login = computed(() => {
  return {
    username: { required },
    password: { required, minLength: minLength(7) },
  }
})

const v$_for_login = useVuelidate(form_rules_for_login, form_data_for_login)

const login = async () => {
  try {
    const validation_result = await v$_for_login.value.$validate()

    if (validation_result) {
      const request_options: any = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form_data_for_login.username.toLowerCase(),
          password: form_data_for_login.password.toLowerCase(),
        }),
      }

      const response = await fetch('http://127.0.0.1:3000/registration/login', request_options)
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        localStorage.setItem('jwt_token', data.data.jwt_token)
        localStorage.setItem('user_id', data.data.user_id)
        router.push({ path: '/' })
        window.location.reload()
      } else {
        login_error.value = data.message
        show_login_error.value = true
      }
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
