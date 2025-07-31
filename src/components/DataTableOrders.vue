<script setup lang="ts">
import { computed, watch } from 'vue'
import type { dataOrders, dataElemOrders } from '../types/api'
import ChartComponent from './ChartComponent.vue'
import { useFiltersStore } from '@/stores/filters'

const props = defineProps<{ items: dataOrders }>()
const filters = useFiltersStore()

const filterWarehouseName = computed({
  get: () => filters.filterWarehouseName,
  set: (v) => (filters.filterWarehouseName = v),
})

const filterBrand = computed({
  get: () => filters.filterBrand,
  set: (v) => (filters.filterBrand = v),
})

const filterDate = computed({
  get: () => filters.filterDate,
  set: (v) => (filters.filterDate = v),
})

const filterNmId = computed({
  get: () => filters.filterNmId,
  set: (v) => (filters.filterNmId = v),
})

const filterCategory = computed({
  get: () => filters.filterCategory,
  set: (v) => (filters.filterCategory = v),
})

const minPrice = computed({
  get: () => filters.minPrice,
  set: (v) => (filters.minPrice = v),
})

const currentPage = computed({
  get: () => filters.currentPage,
  set: (v) => (filters.currentPage = v),
})

const itemsPerPage = computed(() => filters.itemsPerPage)

// Фильтрация
const filteredData = computed(() => {
  return props.items.data.filter((item: dataElemOrders) => {
    const matchesName = item.warehouse_name
      ?.toLowerCase()
      .includes(filterWarehouseName.value.toLowerCase())

    const matchesPrice = minPrice.value === null || Number(item.discount_percent) >= minPrice.value

    const matchesBrand =
      !filterBrand.value || item.brand?.toLowerCase().includes(filterBrand.value.toLowerCase())

    const matchesDate = !filterDate.value || item.date === filterDate.value

    const matchesCategory =
      !filterCategory.value ||
      item.category?.toLowerCase().includes(filterCategory.value.toLowerCase())

    const matchesNmId = !filterNmId.value || String(item.nm_id).includes(filterNmId.value)

    return (
      matchesName && matchesPrice && matchesBrand && matchesDate && matchesCategory && matchesNmId
    )
  })
})

// Пагинация
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

watch(filteredData, () => {
  currentPage.value = 1
})

function resetFilters() {
  filters.$reset()
}
</script>

<template>
  <div class="filters">
    <div>Filters:</div>
    <div>
      <input v-model="filterWarehouseName" placeholder="Warehouse name (Регион)" />
      <input v-model.number="minPrice" type="number" placeholder="quantity" />
    </div>
    <input v-model="filterNmId" placeholder="nm_id (артикул)" />
    <input v-model="filterDate" placeholder="date (with time)" />
    <input v-model="filterCategory" placeholder="category" />
    <input v-model="filterBrand" placeholder="brand" />
  </div>
  <button style="font-size: 20px" @click="resetFilters">Сбросить фильтры</button>
  <div style="height: 400px">
    <div v-if="filteredData.length === 0">Нет данных для отображения графика/данных</div>
    <ChartComponent
      v-else
      :labels="filteredData.map((item) => item.warehouse_name)"
      :data="filteredData.map((item) => Number(item.discount_percent))"
      :dataType="'discount percent'"
    />
  </div>
  <div class="pagination" v-if="filteredData.length !== 0">
    <button @click="currentPage--" :disabled="currentPage === 1">Назад</button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>

    <button @click="currentPage++" :disabled="currentPage === totalPages">Вперёд</button>
  </div>

  <div class="table-container">
    <table v-if="filteredData.length !== 0">
      <thead>
        <tr>
          <th>warehouse_name</th>
          <th>discount_percent</th>
          <th>g_number</th>
          <th>date</th>
          <th>last_change_date</th>
          <th>supplier_article</th>
          <th>tech_size</th>
          <th>barcode</th>
          <th>total_price</th>

          <th>oblast</th>
          <th>income_id</th>
          <th>odid</th>
          <th>nm_id</th>

          <th>subject</th>
          <th>category</th>
          <th>brand</th>
          <th>is_cancel</th>
          <th>cancel_dt</th>
          <!-- <th>warehouse_name</th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedData"
          :key="item.barcode + '-' + item.warehouse_name + '-' + item.date"
        >
          <!-- <td>{{ index }}</td> -->
          <td>{{ item.warehouse_name }}</td>
          <td>{{ item.discount_percent }}</td>
          <td>{{ item.g_number }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.last_change_date }}</td>
          <td>{{ item.supplier_article }}</td>
          <td>{{ item.tech_size }}</td>
          <td>{{ item.barcode }}</td>
          <td>{{ item.total_price }}</td>

          <td>{{ item.oblast }}</td>
          <td>{{ item.income_id }}</td>
          <td>{{ item.odid }}</td>

          <td>{{ item.nm_id }}</td>

          <td>{{ item.subject }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.is_cancel }}</td>
          <td>{{ item.cancel_dt }}</td>
          <!-- <td>{{ item.warehouse_name }}</td> -->
        </tr>
        <!-- {{
        items.data[2]?.barcode
      }} -->
      </tbody>
    </table>
  </div>
  <!-- <pre>{{ filteredData }}</pre> -->
</template>

<style>
input {
  background-color: rgb(187, 187, 187);
  font-size: 20px;
}
.table-container {
  overflow-x: auto;
  max-width: 98vw;
  display: block;
}
table {
  min-width: 300px;
  width: 100%;
  border-collapse: collapse;
}
td {
  text-align: center;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.pagination button.active {
  font-weight: bold;
  background-color: #ddd;
}
</style>
