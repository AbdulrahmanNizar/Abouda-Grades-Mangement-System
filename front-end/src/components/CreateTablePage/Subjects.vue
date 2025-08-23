<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :visibleOnce="{ opacity: 1, y: 0 }"
    class="w-100 d-flex flex-column justify-content-center align-items-center"
  >
    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <div class="form-floating w-50">
        <input
          type="text"
          id="searchSubject"
          class="form-control"
          placeholder="Search Subject"
          v-model="searchSubject"
        />
        <label for="searchSubject">Search Subject</label>
      </div>
    </div>

    <hr class="w-100" />

    <div
      class="w-100 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center"
    >
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
          class="w-100 btn btn-dark"
          @click="checkSubject(subject)"
          v-if="checkedSubjects.includes(subject) == false"
        >
          Check
        </button>
        <button class="w-100 btn btn-secondary" @click="unCheckSubject(subject)" v-else>
          Uncheck
        </button>
      </div>
    </div>

    <div class="w-100 d-flex flex-column justify-content-center align-items-center mt-2">
      <hr class="w-100" />
      <button class="w-50 btn btn-dark" @click="nextStage">Next</button>
    </div>
  </div>

  <transition-group name="slideUp">
    <div
      class="d-flex d-md-none flex-row justify-content-center align-items-center mt-5 bottom-50 bg-white position-fixed errorForNotEnoughSubjectsCard"
      style="width: 50%"
      v-if="showErrorForNotEnoughSubjects"
    >
      <div
        class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          <h5 class="text-center">Operation Failed ❌</h5>
        </div>

        <hr class="w-100" />

        <div class="w-100 d-flex flex-row justify-content-center align-items-center">
          <h6 class="text-center">{{ errorForNotEnoughSubjects }}</h6>
        </div>
      </div>
    </div>
    <div
      class="toast d-md-block d-none position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showErrorForNotEnoughSubjects"
    >
      <div class="toast-header">
        <strong class="me-auto">❌ Operation Failed</strong>
      </div>
      <div class="toast-body">{{ errorForNotEnoughSubjects }}</div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSubjectsStore } from '@/store'

const emit = defineEmits(['getCheckedSubjects'])
const userSubjectsStore = useSubjectsStore()
const checkedSubjects = ref<string[]>([])
const searchSubject = ref<string>('')
const errorForNotEnoughSubjects = ref<string>('')
const showErrorForNotEnoughSubjects = ref<boolean>(false)

const userSubjects = computed(() => {
  return userSubjectsStore.userSubjects
})

const searchSubjectResult = computed(() => {
  return userSubjects.value.filter((subject) =>
    subject.toLowerCase().includes(searchSubject.value.toLowerCase()),
  )
})

const checkSubject = (subject: string): void => {
  checkedSubjects.value.push(subject)
}

const unCheckSubject = (subject: string): void => {
  checkedSubjects.value = checkedSubjects.value.filter((sub) => sub != subject)
}

const nextStage = (): void => {
  if (checkedSubjects.value.length >= 5) {
    emit('getCheckedSubjects', checkedSubjects.value)
  } else {
    errorForNotEnoughSubjects.value = 'You must choose 5 subjects at least'
    showErrorForNotEnoughSubjects.value = true
    setTimeout(() => (showErrorForNotEnoughSubjects.value = false), 3000)
  }
}

userSubjectsStore.getSubjects()
</script>

<style>
@media only screen and (max-width: 991px) {
  #subjectCard {
    width: 80% !important;
  }

  .errorForNotEnoughSubjectsCard {
    width: 80% !important;
  }
}

.slideUp-enter-active {
  animation: slideUp 0.5s;
}

.slideUp-leave-active {
  animation: slideUp 0.5s reverse;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(45px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
