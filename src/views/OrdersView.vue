<script setup lang="ts">
import DataTable from '../components/DataTableOrders.vue'
import { ref, onMounted } from 'vue'
import { getOrders } from '@/utils/api'
import type { dataOrders } from '@/types/api'

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)

const orders = ref<dataOrders>({
  data: [],
  links: {
    first: '',
    last: '',
    next: '',
    prev: null,
  },
})

const ordersParams = {
  key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  dateFrom: formatDate(yesterday),
  dateTo: formatDate(today),
  limit: '150',
}

onMounted(async () => {
  try {
    const response = await getOrders(ordersParams)
    orders.value = response.data
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
  }
})
</script>

<template>
  <div class="orders">
    <h1>Orders page</h1>
    <DataTable :items="orders" />
  </div>
</template>

<script setup lang="ts"></script>
