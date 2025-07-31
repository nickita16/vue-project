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
    filterArticle?: string
    filterRegion?: string
    filterDate?: string
    filterCategories?: string
    filterBrand?: string
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
    // console.log(item)

    const raw = item[field]
    const num = typeof raw === 'number' ? raw : parseFloat(raw as string)
    return isNaN(num) ? 0 : num
  }

  const filteredCurrentData = props.data.filter((item) => {
    console.log(item)
    const matchesArticle =
      !props.filterArticle || item.nm_id?.toString().includes(props.filterArticle)
    const matchesRegion =
      !props.filterRegion ||
      item.warehouse_name?.toLowerCase().includes(props.filterRegion.toLowerCase())
    // console.log('item.warehouse_name?.toLowerCase()', item.warehouse_name?.toLowerCase())
    const matchesDate = !props.filterDate || item.date?.toString().includes(props.filterDate)
    console.log('item.date?.toString()', item.date?.toString())
    const matchesCategory =
      !props.filterCategories ||
      item.category?.toLowerCase().includes(props.filterCategories.toLowerCase())
    const matchesBrand =
      !props.filterBrand || item.brand?.toLowerCase().includes(props.filterBrand.toLowerCase())

    return matchesArticle && matchesRegion && matchesDate && matchesCategory && matchesBrand
  })

  const prevSumsMap = props.dataPrev.reduce<Record<number, number>>((acc, item) => {
    const nmId = item.nm_id
    const value = getFieldValue(item, props.field)
    acc[nmId] = (acc[nmId] || 0) + value
    return acc
  }, {})

  const currentSumsMap = filteredCurrentData.reduce<Record<number, number>>((acc, item) => {
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

// console.log(sortedItems)
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
