<script setup lang="ts">
import type { dataElemOrders, dataOrders } from '@/types/api'
import { computed } from 'vue'
import { useMetricsStore } from '@/stores/metrics'

type ExtraFields = 'count' | 'cancel_count'

const props = withDefaults(
  defineProps<{
    data: dataOrders['data']
    dataPrev: dataOrders['data']
    field: keyof dataOrders['data'][number] | ExtraFields
    shouldSlice?: boolean
  }>(),
  {
    shouldSlice: true,
  },
)
const store = useMetricsStore()

const sortedItems = computed(() => {
  const getFieldValue = (
    item: dataElemOrders,
    field: keyof dataElemOrders | ExtraFields,
  ): number => {
    if (field === 'count') return 1

    if (field === 'cancel_count') {
      return typeof item.cancel_dt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.cancel_dt)
        ? 1
        : 0
    }

    const raw = item[field]
    const num = typeof raw === 'number' ? raw : parseFloat(raw as string)
    return isNaN(num) ? 0 : num
  }

  const prevSumsMap = props.dataPrev.reduce<Record<number, number>>((acc, item) => {
    const nmId = item.nm_id
    const value = getFieldValue(item, props.field)
    acc[nmId] = (acc[nmId] || 0) + value
    return acc
  }, {})

  const currentSumsMap = props.data.reduce<Record<number, number>>((acc, item) => {
    const nmId = item.nm_id
    const value = getFieldValue(item, props.field)
    acc[nmId] = (acc[nmId] || 0) + value
    // console.log(acc)
    store.addCurrentValue(props.field, nmId, acc[nmId])
    return acc
  }, {})

  const combined = Object.entries(currentSumsMap).map(([nmIdStr, currentValue]) => {
    const nmId = Number(nmIdStr)
    const previousValue = prevSumsMap[nmId] ?? null

    const percentageChange =
      previousValue === null
        ? currentValue !== 0
          ? props.field == 'cancel_count'
            ? (currentValue - 0) * 100
            : null
          : null
        : ((currentValue - previousValue) / (previousValue || 1)) * 100

    return {
      nm_id: nmId,
      currentValue,
      previousValue,
      percentageChange,
    }
  })

  // return combined
  //   .filter((item) => item.percentageChange !== null)
  //   .sort((a, b) => b.percentageChange! - a.percentageChange!)
  //   .slice(0, 5)
  const result = props.shouldSlice
    ? combined
        .filter((item) => item.percentageChange !== null)
        .sort((a, b) => b.percentageChange! - a.percentageChange!)
        .slice(0, 5)
    : combined
        .filter((item) => item.percentageChange !== null)
        .sort((a, b) => b.percentageChange! - a.percentageChange!)
  return result
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>articles(nm_id)</th>
        <th>current value</th>
        <th>prev value</th>
        <th>change</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedItems" :key="item.nm_id">
        <td>
          <router-link :to="`/detail/${item.nm_id}`">{{ item.nm_id }}</router-link>
        </td>
        <td>{{ item.currentValue.toFixed(2) }}</td>
        <td>{{ item.previousValue?.toFixed(2) }}</td>
        <td v-if="item.percentageChange !== null">
          {{ item.percentageChange.toFixed(2) }}%
          <span :style="{ color: item.percentageChange > 0 ? 'green' : 'red' }">
            {{ item.percentageChange > 0 ? '↑' : '' }}
            {{ item.percentageChange < 0 ? '↓' : '' }}
          </span>
        </td>
        <td v-else>-</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
th,
td {
  border: 1px solid white;
}
</style>
