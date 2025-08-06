<template>
  <h3>Table {{ tableId }}</h3>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tableId = ref(route.params.tableId)
</script>
