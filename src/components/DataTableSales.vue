<script setup lang="ts">
// import apiTypes from '../types/api'
import { computed, ref, watch } from 'vue'
import type { dataSales, dataElemSales } from '../types/api'
import ChartComponent from './ChartComponent.vue'

const props = defineProps<{ items: dataSales }>()
// defineProps<{ items: string }>()

const filterWarehouseName = ref('')
// const filterCategory = ref('')
const minPrice = ref<number | null>(null)

const currentPage = ref(1)
const itemsPerPage = ref(10)

const filteredData = computed(() => {
  return props.items.data.filter((item: dataElemSales) => {
    const matchesName = item.warehouse_name
      ?.toLowerCase()
      .includes(filterWarehouseName.value.toLowerCase())
    // console.log(matchesBrand)
    const matchesPrice = minPrice.value === null || Number(item.for_pay) >= minPrice.value
    // console.log(
    //   item.category,
    //   minPrice.value === null || Number(item.price) >= minPrice.value,
    //   Number(item.price),
    //   minPrice.value,
    // )
    return matchesName && matchesPrice
  })
})

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
</script>

<template>
  <div class="filters">
    <div>Filters:</div>
    <input v-model="filterWarehouseName" placeholder="Warehouse name" />
    <input v-model.number="minPrice" type="number" placeholder="for pay" />
  </div>
  <div style="height: 400px">
    <div v-if="filteredData.length === 0">Нет данных для отображения графика/данных</div>
    <ChartComponent
      v-else
      :labels="filteredData.map((item) => item.warehouse_name)"
      :data="filteredData.map((item) => Number(item.for_pay))"
      :dataType="'for pay'"
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
          <th>for_pay</th>
          <th>barcode</th>
          <th>brand</th>
          <th>category</th>
          <th>date</th>
          <th>discount_percent</th>
          <th>g_number</th>
          <th>income_id</th>
          <th>is_realization</th>
          <th>is_supply</th>
          <th>last_change_date</th>
          <th>nm_id</th>

          <th>is_storno</th>
          <th>last_change_date</th>
          <th>oblast_okrug_name</th>
          <th>subject</th>
          <th>supplier_article</th>
          <th>tech_size</th>
          <!-- <th>warehouse_name</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.barcode + '-' + item.warehouse_name">
          <!-- <td>{{ index }}</td> -->
          <td>{{ item.warehouse_name }}</td>
          <td>{{ item.for_pay }}</td>
          <td>{{ item.barcode }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.discount_percent }}</td>
          <td>{{ item.g_number }}</td>
          <td>{{ item.income_id }}</td>
          <td>{{ item.is_realization }}</td>
          <td>{{ item.is_supply }}</td>
          <td>{{ item.last_change_date }}</td>

          <td>{{ item.nm_id }}</td>

          <td>{{ item.is_storno }}</td>
          <td>{{ item.last_change_date }}</td>
          <td>{{ item.oblast_okrug_name }}</td>
          <td>{{ item.subject }}</td>
          <td>{{ item.supplier_article }}</td>
          <td>{{ item.tech_size }}</td>
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
  min-width: 600px;
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
