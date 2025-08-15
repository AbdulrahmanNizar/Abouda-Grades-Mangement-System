<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center">
    <button
      class="btn btn-dark w-50 mb-1"
      data-bs-toggle="modal"
      data-bs-target="#addNewSubjectModal"
    >
      Add New Subject
    </button>

    <div class="form-floating w-50 mt-1">
      <input
        type="text"
        id="searchSubject"
        class="form-control"
        placeholder="Search Subject"
        v-model="searchSubject"
      />
      <label for="searchSubject">Search Subject</label>
    </div>

    <hr class="w-100" />
  </div>

  <div
    class="w-100 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center"
  >
    <transition-group :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div
        class="d-flex flex-column justify-content-center align-items-center p-3 border rounded me-2 ms-2 mt-2"
        style="width: 30%"
        id="subjectCard"
        v-motion-pop-visible
        v-for="subject in searchSubjectResult"
      >
        <h5 class="mb-0">{{ subject }}</h5>
        <hr class="w-100" />
        <button
          class="btn btn-danger w-100 mt-1"
          @click="deleteSubject(subject)"
          v-if="loading == false"
        >
          Delete
        </button>
        <button
          class="btn btn-danger w-100 mt-1 d-flex flex-row justify-content-center align-items-center"
          disabled
          v-else
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden mb-0">Loading...</span>
          </div>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import gsap from 'gsap'

const props = defineProps(['subjects'])
const userSubjects = ref<string[]>(props.subjects)
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showDeleteSubjectError = ref<boolean>(false)
const deleteSubjectError = ref<string>('')
const searchSubject = ref<string>('')
const loading = ref<boolean>(false)

const searchSubjectResult = computed(() => {
  return userSubjects.value.filter((subject) => subject.toLowerCase().includes(searchSubject.value))
})

const deleteSubject = async (subject: string): Promise<void> => {
  try {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        subject: subject,
      }),
    }

    loading.value = true
    const response = await fetch(
      'http://192.168.1.241:3000/subjects-management/deleteSubject',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      loading.value = false
      window.location.reload()
    } else {
      loading.value = false
      deleteSubjectError.value = data.message
      showDeleteSubjectError.value = true
      setTimeout(() => (showDeleteSubjectError.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

const onBeforeEnter = (el: any) => {
  el.style.opacity = 0
  el.style.height = 0
}

const onEnter = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 1,
    height: '1.6em',
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}

const onLeave = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}
</script>

<style>
@media only screen and (max-width: 991px) {
  #subjectCard {
    width: 80% !important;
  }
}
</style>
