<template>
  <div class="w-100 d-flex flex-row justify-content-center align-items-center">
    <table class="table table-hover w-100">
      <thead>
        <tr>
          <th scope="col">Subject</th>
          <th scope="col">Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="grade in props.gradesTableDetails[0].userGradesTable">
          <td>{{ grade.subject }}</td>
          <td>{{ grade.grade }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['gradesTableDetails'])
</script>
