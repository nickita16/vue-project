<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id

onMounted(() => {
  console.log('ID из URL:', id)
})
</script>

<template>
  <div>
    <h1>Detail page</h1>
    <p>
      current ID: <strong>{{ id }}</strong>
    </p>
  </div>
</template>
