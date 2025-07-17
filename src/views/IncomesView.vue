<script setup lang="ts">
import DataTable from '../components/DataTableIncomes.vue'
import { ref, onMounted } from 'vue'
import { getIncomes } from '@/utils/api'
import type { dataIncomes } from '@/types/api'

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
const today = new Date()

const incomes = ref<dataIncomes>({
  data: [],
  links: {
    first: '',
    last: '',
    next: '',
    prev: null,
  },
})

const incomesParams = {
  key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  dateFrom: '2025-07-10',
  dateTo: formatDate(today),
  limit: '150',
}

onMounted(async () => {
  try {
    const response = await getIncomes(incomesParams)
    incomes.value = response.data
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
  }
})
</script>

<template>
  <div class="incomes">
    <h1>incomes page</h1>

    <DataTable :items="incomes" />
  </div>
</template>

<script setup lang="ts"></script>

<style>
h1 {
  text-align: center;
}
</style>
