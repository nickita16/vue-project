<script setup lang="ts">
import DataTable from '../components/DataTableStocks.vue'
import { ref, onMounted } from 'vue'
import { getStocks } from '@/utils/api'
import type { dataStocks } from '@/types/api'

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
const today = new Date()

const stocks = ref<dataStocks>({
  data: [],
  links: {
    first: '',
    last: '',
    next: '',
    prev: null,
  },
})

const stocksParams = {
  key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  dateFrom: formatDate(today),
  dateTo: formatDate(today),
  limit: '150',
}

onMounted(async () => {
  try {
    const response = await getStocks(stocksParams)
    stocks.value = response.data
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
  }
})
</script>

<template>
  <div class="stocks">
    <h1>Stocks page</h1>

    <DataTable :items="stocks" />
  </div>
</template>

<script setup lang="ts"></script>

<style>
h1 {
  text-align: center;
}
</style>
