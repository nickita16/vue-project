<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { computed } from 'vue'

// Регистрируем компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// Пропсы
const props = defineProps<{
  labels: string[]
  data: number[]
  dataType?: string
  titleText?: string
}>()

// Реактивные данные графика
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.dataType === 'sales' ? 'for pay' : props.dataType || 'Data',
      backgroundColor: '#42A5F5',
      borderColor: '#42A5F5',
      fill: false,
      data: props.data,
    },
  ],
}))

// Опции графика
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: props.titleText ? props.titleText : 'Price chart by warehouse_name',
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
