<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center">
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

    <div
      class="w-100 d-flex flex-row justify-content-center align-items-center"
      v-if="userGradesTableDetails.length > 0"
    >
      <table class="table table-hover w-100">
        <thead>
          <tr>
            <th scope="col">Subject</th>
            <th scope="col">Grade</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr scope="row" v-for="(grade, index) in userGradesTableDetails[0].userGradesTable">
            <td>{{ grade.subject }}</td>
            <td>{{ grade.grade }}%</td>
            <td>
              <button
                class="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#editGradeModal"
                @click="setEditSubjectGradeIndex(index)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr class="w-100" />

    <div class="w-100 d-flex flex-column justify-content-center align-items-center">
      <button class="btn btn-dark w-50" @click="resetInputs">Reset</button>
      <button class="btn btn-dark w-50 mt-1" @click="submitEdit" v-if="loading == false">
        Submit
      </button>
      <button
        class="btn btn-dark w-50 mt-1 d-flex flex-row justify-content-center align-items-center"
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
      v-if="showGradesTableNotFoundMessage"
    >
      <div
        class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          <h5 class="text-center">Operation Failed ❌</h5>
        </div>

        <hr class="w-100" />

        <div class="w-100 d-flex flex-row justify-content-center align-items-center">
          <h6 class="text-center">{{ gradesTableNotFoundMessage }}</h6>
        </div>
      </div>
    </div>
    <div
      class="toast d-md-block d-none position-fixed"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="bottom: 3%; right: 1%"
      v-if="showGradesTableNotFoundMessage"
    >
      <div class="toast-header">
        <strong class="me-auto">❌ Operation Failed</strong>
      </div>
      <div class="toast-body">{{ gradesTableNotFoundMessage }}</div>
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
      class="toast d-md-block d-none position-fixed"
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
      class="d-flex d-md-none flex-row justify-content-center align-items-center mt-5 bottom-50 bg-white position-fixed errorForNotEnoughSubjectsCard"
      style="width: 50%"
      v-if="showSuccessModal"
    >
      <div
        class="w-100 p-3 rounded shadow d-flex flex-column justify-content-center align-items-center"
      >
        <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-2">
          <h4>Operation Completed ✅</h4>
        </div>
      </div>
    </div>
    <div
      class="toast d-md-block d-none position-fixed"
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
          <button
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
            @click="editGrade(editedSubjectGrade?.subject)"
          >
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
import { useGradesTablesStore, type gradesTableInterface } from '@/store'

const router: Router = useRouter()
const userGradesTablesStore = useGradesTablesStore()
const props = defineProps(['tableId'])
const tableId = props.tableId
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const currentYear = ref<number>(new Date().getFullYear())
const lastFiveYears = ref<number[]>([])
const editSubjectGrade = ref<number>(0)
const gradesTableYear = ref<string>('Select A Year')
const gradesTableTrimester = ref<string>('Select A Trimester')
const editedSubjectGrade = ref<gradesTableInterface>()
const loading = ref<boolean>(false)
const showSuccessModal = ref<boolean>(false)
const showErrorModal = ref<boolean>(false)
const errorMessage = ref<string>('')

const userGradesTableDetails = computed(() => {
  return userGradesTablesStore.userGradesTableDetails
})

const gradesTableNotFoundMessage = computed(() => {
  return userGradesTablesStore.gradesTableNotFoundMessage
})

const showGradesTableNotFoundMessage = computed(() => {
  return userGradesTablesStore.showGradesTableNotFoundMessage
})

const changeTheNoteColorToRed = computed(() => {
  if (editSubjectGrade.value > 100 || editSubjectGrade.value < 0) {
    return true
  } else {
    return false
  }
})

const getLastFiveYears = () => {
  for (let i = 0; i <= 5; i++) {
    lastFiveYears.value.push(currentYear.value - i)
  }
}

const resetInputs = (): void => {
  gradesTableYear.value = 'Select A Year'
  gradesTableTrimester.value = 'Select A Trimester'
}

const setEditSubjectGradeIndex = (subjectIndex: number): void => {
  editedSubjectGrade.value = userGradesTableDetails.value[0].userGradesTable[subjectIndex]
  editSubjectGrade.value = editedSubjectGrade.value.grade
}

const editGrade = (subject: string | undefined): void => {
  if (changeTheNoteColorToRed.value != true) {
    userGradesTableDetails.value[0].userGradesTable =
      userGradesTableDetails.value[0].userGradesTable.filter((grade) => subject != grade.subject)
    userGradesTableDetails.value[0].userGradesTable.push({
      subject: subject,
      grade: editSubjectGrade.value,
    })
  }
}

const submitEdit = async (): Promise<void> => {
  try {
    if (
      gradesTableYear.value != 'Select A Year' &&
      gradesTableTrimester.value != 'Select A Trimester'
    ) {
      const requestOptions: RequestInit = {
        method: 'PATCH',
        mode: 'cors',
        headers: <HeadersInit>{ 'Content-Type': 'application/json', jwt_token: jwtToken.value },
        body: JSON.stringify({
          tableId: tableId,
          userId: userId.value,
          newGradesTableYear: gradesTableYear.value.toString(),
          newGradesTableTrimester: gradesTableTrimester.value.toString(),
          newGradesTable: userGradesTableDetails.value[0].userGradesTable,
        }),
      }

      loading.value = true
      const response = await fetch(
        'http://127.0.0.1:3000/grades-management/updateGradesTable',
        requestOptions,
      )
      const data = await response.json()
      if (data.statusCode >= 200 && data.statusCode < 300) {
        loading.value = false
        showSuccessModal.value = true
        setTimeout(() => router.push({ path: '/tables' }), 2000)
      } else {
        loading.value = false
        errorMessage.value = data.message
        showErrorModal.value = true
        setTimeout(() => (showErrorModal.value = false), 3000)
      }
    } else {
      errorMessage.value = 'Please make sure that the grades table year and trimester are valid'
      showErrorModal.value = true
      setTimeout(() => (showErrorModal.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}

userGradesTablesStore.getGradesTableDetails(tableId)
getLastFiveYears()
</script>
