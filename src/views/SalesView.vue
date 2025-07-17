<script setup lang="ts">
import DataTable from '../components/DataTableSales.vue'
import { ref, onMounted } from 'vue'
import { getSales } from '@/utils/api'
import type { dataSales } from '@/types/api'

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)

const sales = ref<dataSales>({
  data: [],
  links: {
    first: '',
    last: '',
    next: '',
    prev: null,
  },
})

const salesParams = {
  key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  dateFrom: formatDate(yesterday),
  dateTo: formatDate(today),
  limit: '150',
}

onMounted(async () => {
  try {
    const response = await getSales(salesParams)
    sales.value = response.data
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
  }
})
</script>

<template>
  <div class="sales">
    <h1>sales page</h1>

    <DataTable :items="sales" />
  </div>
</template>

<script setup lang="ts"></script>

<style>
h1 {
  text-align: center;
}
</style>
