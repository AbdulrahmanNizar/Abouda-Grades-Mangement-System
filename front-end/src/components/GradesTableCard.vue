<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center p-3 border rounded me-2 ms-2 mt-2 col-6"
    style="width: 30%"
    id="gradesTable"
    v-motion-pop-visible
  >
    <h5>Year: {{ props.gradesTable.userGradesYear }}</h5>
    <h5>Term: {{ props.gradesTable.userGradesTrim }}</h5>
    <h5>Grade: {{ Math.round(props.gradesTable.userGradesAverage) }}%</h5>
    <hr class="w-100" />
    <router-link :to="{ path: '/table/' + props.gradesTable._id }" class="btn btn-dark w-100"
      >View Details</router-link
    >
    <button
      class="btn btn-danger w-100 mt-1"
      data-bs-toggle="modal"
      data-bs-target="#deleteTableModal"
    >
      Delete
    </button>
  </div>

  <div
    class="modal fade"
    id="deleteTableModal"
    tabindex="-1"
    aria-labelledby="deleteTableModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteTableModalLabel">Are You Sure?</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body w-100">
          <transition name="bounce">
            <div
              class="w-100 alert alert-danger text-center"
              role="alert"
              v-if="showDeleteTableError"
            >
              {{ deleteTableError }}
            </div>
          </transition>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" @click="deleteTable(props.gradesTable._id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['gradesTable'])
const userId = ref<string | null>(localStorage.getItem('userId'))
const jwtToken = ref<string | null>(localStorage.getItem('jwtToken'))
const showDeleteTableError = ref<boolean>(false)
const deleteTableError = ref<string>('')

const deleteTable = async (gradesTableId: string): Promise<void> => {
  try {
    const requestOptions: any = {
      method: 'DELETE',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', jwt_token: jwtToken.value },
      body: JSON.stringify({
        userId: userId.value,
        tableId: gradesTableId,
      }),
    }

    const response = await fetch(
      'http://127.0.0.1:3000/grades-management/deleteGradesTable',
      requestOptions,
    )
    const data = await response.json()
    if (data.statusCode >= 200 && data.statusCode < 300) {
      window.location.reload()
    } else {
      deleteTableError.value = data.message
      showDeleteTableError.value = true
      setTimeout(() => (showDeleteTableError.value = false), 3000)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
@media only screen and (max-width: 991px) {
  #gradesTable {
    width: 80% !important;
  }
}
</style>
