<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  labels: string[]
  data: number[]
  dataType?: string
}>()

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: props.dataType === 'sales' ? 'for pay' : props.dataType,
      backgroundColor: '#42A5F5',
      data: props.data,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Price chart by warehouse_name',
    },
  },
}
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
