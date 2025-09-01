<template>
  <div class="h-100 text-black d-flex flex-row justify-content-center align-items-center">
    <div
      class="bg-black bg-gradient d-flex flex-row justify-content-center align-items-center h-75"
      id="cardBackground"
      style="width: 60%; border-radius: 20px"
      v-if="validLink == true"
    >
      <CreateNewPasswordCard />
    </div>

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
      v-motion-slide-bottom
      v-else-if="validLink == false"
    >
      <div
        class="w-50 d-flex flex-column justify-content-center align-items-center p-5 rounded shadow"
      >
        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
          <h3>This link isn't valid anymore</h3>
        </div>

        <hr class="w-100" />

        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
          <router-link :to="{ path: '/registration' }" class="btn btn-dark w-50"
            >Registration</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  useRouter,
  useRoute,
  type Router,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import CreateNewPasswordCard from '@/components/CreateNewPasswordPage/CreateNewPasswordCard.vue'

const router: Router = useRouter()
const route: RouteLocationNormalizedLoadedGeneric = useRoute()
const userId: string | any = route.query.userId
const validLink = ref<boolean>()

const checkTheChangePasswordState = async (): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }

    const response = await fetch(
      'http://127.0.0.1:3000/change-password-links-management/getChangePasswordLinkState?userId=' +
        encodeURIComponent(userId),
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      validLink.value = data.data.valid
    } else {
      router.push({ path: '/registration' })
    }
  } catch (err) {
    console.log(err)
  }
}

checkTheChangePasswordState()
</script>
