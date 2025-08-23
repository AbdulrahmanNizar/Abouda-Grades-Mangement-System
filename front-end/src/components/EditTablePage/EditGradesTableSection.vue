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
  </div>

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

const setEditSubjectGradeIndex = (subjectIndex: number): void => {
  editedSubjectGrade.value = userGradesTableDetails.value[0].userGradesTable[subjectIndex]
  editSubjectGrade.value = editedSubjectGrade.value.grade
}

const editGrade = async (): Promise<void> => {}

userGradesTablesStore.getGradesTableDetails(tableId)
getLastFiveYears()
</script>
