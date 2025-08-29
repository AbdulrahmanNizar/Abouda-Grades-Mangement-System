<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 200 }"
    :visibleOnce="{ opacity: 1, y: 0 }"
    class="w-100 text-black d-flex flex-column justify-content-start align-items-center"
  >
    <div class="w-75 d-flex flex-md-row flex-column justify-content-center align-items-center p-3">
      <select class="form-select ms-1 mt-1" v-model="gradesTableYear">
        <option value="Select A Year" selected disabled>Select A Year</option>
        <option v-for="year in lastFiveYears" :value="year">{{ year }}</option>
      </select>

      <select class="form-select ms-1 mt-1" v-model="gradesTableTrimester">
        <option value="Select A Trimester" selected disabled>Select A Trimester</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>

    <div class="w-100 d-flex flex-row justify-content-center align-items-center">
      <table
        class="table table-hover w-100"
        v-if="gradesTable.length == props.checkedSubjects.length"
      >
        <thead>
          <tr>
            <th scope="col">Subject</th>
            <th scope="col">Grade</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr scope="row" v-for="(grade, index) in gradesTable">
            <td>{{ grade.subject }}</td>
            <td>{{ grade.grade }}%</td>
            <td>
              <button
                class="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#editGradeModal"
                @click="switchToEditMood(index)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="w-100 d-flex flex-md-row flex-column flex-wrap justify-content-center align-items-center p-3"
    >
      <div
        class="w-100 d-flex flex-column justify-content-center align-items-center mb-1"
        v-if="gradesTable.length != props.checkedSubjects.length"
      >
        <h6 v-if="changeTheNoteColorToRed == false" class="text-center">
          The grade must be less than 100 <br />
          and more than 0
        </h6>

        <h6 v-else="changeTheNoteColorToRed" class="text-danger text-center">
          The grade must be less than 100 <br />
          and more than 0
        </h6>
      </div>

      <div
        class="form-floating mb-1 ms-1 w-50"
        v-if="gradesTable.length != props.checkedSubjects.length"
      >
        <input
          type="number"
          class="form-control"
          id="subjectGrade"
          placeholder="Subject Grade"
          v-model="subjectGrade"
          :disabled="disableSubjectGradeInputAndButton"
        />
        <label for="subjectGrade">{{ props.checkedSubjects[currentUserSubjectGrade] }}</label>
      </div>
    </div>

    <div class="w-100 d-flex flex-row justify-content-center align-items-center">
      <div
        class="w-100 d-flex flex-row justify-content-center align-items-center"
        v-if="gradesTable.length != props.checkedSubjects.length"
      >
        <button
          class="btn btn-dark w-50"
          @click="setGradeForNextSubject"
          v-if="props.checkedSubjects[currentUserSubjectGrade + 1] != undefined"
        >
          {{ props.checkedSubjects[currentUserSubjectGrade + 1] }}
          <i class="bi bi-arrow-right"></i>
        </button>

        <button
          class="btn btn-dark w-50"
          :disabled="disableSubjectGradeInputAndButton"
          @click="setUserGrades"
          v-if="props.checkedSubjects[currentUserSubjectGrade + 1] == undefined"
        >
          Done
        </button>
      </div>
    </div>

    <hr class="w-100" />

    <div class="w-100 d-flex flex-row justify-content-center align-items-center mb-1">
      <button class="btn btn-dark w-50" @click="resetInputs">Reset</button>
    </div>

    <div class="w-100 d-flex flex-row justify-content-center align-items-center mb-1">
      <button class="btn btn-dark w-50" @click="nextStage">Next</button>
    </div>
  </div>

  <transition-group name="slideUp">
    <div
      class="toast bg-white d-block position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showErrorForGoingToNextStage"
    >
      <div class="toast-header">
        <strong class="me-auto">❌ Operation Failed</strong>
      </div>
      <div class="toast-body">{{ errorForGoingToNextStage }}</div>
    </div>
  </transition-group>

  <div
    class="modal fade"
    id="editGradeModal"
    tabindex="-1"
    aria-labelledby="editGradeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editGradeModalLabel">Edit Grade</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body w-100 d-flex flex-column justify-content-center align-items-center">
          <div class="w-100 d-flex flex-row justify-content-center align-items-center">
            <h6 v-if="changeTheNoteColorToRed == false" class="text-center">
              The grade must be less than 100 <br />
              and more than 0
            </h6>

            <h6 v-else="changeTheNoteColorToRed" class="text-danger text-center">
              The grade must be less than 100 <br />
              and more than 0
            </h6>
          </div>

          <div class="form-floating w-100">
            <input
              type="number"
              class="form-control"
              id="subjectGrade"
              placeholder="Subject Grade"
              v-model="editSubjectGrade"
            />
            <label for="subjectGrade">{{ editedSubjectGrade?.subject }}</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="editGrade">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, type Router } from 'vue-router'
import { type gradesTableInterface } from '@/store'

const router: Router = useRouter()
const props = defineProps(['checkedSubjects'])
const emit = defineEmits(['getCreateGradesTableRequirements'])
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const lastFiveYears = ref<number[]>([])
const currentYear = ref<number>(new Date().getFullYear())
const currentUserSubjectGrade = ref<number | any>(0)
const gradesTableYear = ref<string>('Select A Year')
const gradesTableTrimester = ref<string>('Select A Trimester')
const subjectGrade = ref<number>(0)
const gradesTable = ref<gradesTableInterface[]>([])
const disableSubjectGradeInputAndButton = ref<boolean>(false)
const errorForGoingToNextStage = ref<string>('')
const showErrorForGoingToNextStage = ref<boolean>(false)
const editMood = ref<boolean>(false)
const editSubjectGrade = ref<number>(0)
const editedSubjectGradeIndex = ref<number>()
const editedSubjectGrade = ref<gradesTableInterface>()
const createGradesTableRequirements = ref<createGradesTableRequirementsInterface>()

export interface createGradesTableRequirementsInterface {
  gradesTable: gradesTableInterface[]
  gradesTableYear: string
  gradesTableTrimester: string
}

const changeTheNoteColorToRed = computed(() => {
  if (editMood.value) {
    if (editSubjectGrade.value > 100 || editSubjectGrade.value < 0) {
      return true
    } else {
      return false
    }
  } else {
    if (subjectGrade.value > 100 || subjectGrade.value < 0) {
      return true
    } else {
      return false
    }
  }
})

const getLastFiveYears = () => {
  for (let i = 0; i <= 5; i++) {
    lastFiveYears.value.push(currentYear.value - i)
  }
}

const resetInputs = () => {
  gradesTable.value = []
  currentUserSubjectGrade.value = 0
  subjectGrade.value = 0
  gradesTableYear.value = 'Select A Year'
  gradesTableTrimester.value = 'Select A Trimester'
  disableSubjectGradeInputAndButton.value = false
}

const setGradeForNextSubject = () => {
  if (subjectGrade.value <= 100 && subjectGrade.value > 0) {
    gradesTable.value.push({
      subject: props.checkedSubjects[currentUserSubjectGrade.value],
      grade: subjectGrade.value,
    })
    subjectGrade.value = 0
    currentUserSubjectGrade.value += 1
  }
}

const setUserGrades = () => {
  gradesTable.value.push({
    subject: props.checkedSubjects[currentUserSubjectGrade.value],
    grade: subjectGrade.value,
  })
  disableSubjectGradeInputAndButton.value = true
}

const nextStage = async (): Promise<void> => {
  if (
    gradesTable.value.length == props.checkedSubjects.length &&
    gradesTableYear.value != 'Select A Year' &&
    gradesTableTrimester.value != 'Select A Trimester' &&
    changeTheNoteColorToRed.value != true
  ) {
    const requestOptions: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        userGradesTableYear: gradesTableYear.value.toString(),
        userGradesTableTrimester: gradesTableTrimester.value.toString(),
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/validateGradesTableDate',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      createGradesTableRequirements.value = {
        gradesTable: gradesTable.value,
        gradesTableYear: gradesTableYear.value.toString(),
        gradesTableTrimester: gradesTableTrimester.value.toString(),
      }
      emit('getCreateGradesTableRequirements', createGradesTableRequirements.value)
    } else if (data.statusCode == 403) {
      router.push({ path: '/registration' })
    } else {
      errorForGoingToNextStage.value = data.message
      showErrorForGoingToNextStage.value = true
      setTimeout(() => (showErrorForGoingToNextStage.value = false), 3000)
    }
  } else {
    errorForGoingToNextStage.value = 'Please fill the fields'
    showErrorForGoingToNextStage.value = true
    setTimeout(() => (showErrorForGoingToNextStage.value = false), 3000)
  }
}

const switchToEditMood = (gradeIndex: number): void => {
  editMood.value = true
  editSubjectGrade.value = gradesTable.value[gradeIndex].grade
  editedSubjectGrade.value = gradesTable.value[gradeIndex]
  editedSubjectGradeIndex.value = gradeIndex
}

const editGrade = (): void => {
  if (
    gradesTableYear.value != 'Filter By Year' &&
    gradesTableTrimester.value != 'Filter By Trimester' &&
    changeTheNoteColorToRed.value != true
  ) {
    const subjectGradeIndex: number | any = editedSubjectGradeIndex.value
    gradesTable.value[subjectGradeIndex].grade = editSubjectGrade.value
    editMood.value = false
  } else {
    errorForGoingToNextStage.value = 'Please fill the fields'
    showErrorForGoingToNextStage.value = true
    setTimeout(() => (showErrorForGoingToNextStage.value = false), 3000)
  }
}

getLastFiveYears()
</script>
