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
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['gradesTable'])
</script>

<style>
@media only screen and (max-width: 991px) {
  #gradesTable {
    width: 80% !important;
  }
}
</style>
