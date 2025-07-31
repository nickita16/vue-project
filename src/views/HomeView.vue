<script setup lang="ts">
import type { dataOrders } from '@/types/api'
import { getOrders } from '@/utils/api'
import { useOrdersStore } from '@/stores/orders'
import { useMetricsStore } from '@/stores/metrics'
import { useFiltersStore } from '@/stores/filters'
import { computed, onMounted, ref, watch } from 'vue'
import LineChartComponent from '@/components/LineChartComponent.vue'
import DataTableTopArticles from '@/components/DataTableTopArticles.vue'

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = new Date()
const currentTo = ref(formatDate(today))
const currentFrom = ref(formatDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)))
const prevTo = ref(formatDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)))
const prevFrom = ref(formatDate(new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000)))

const store = useOrdersStore()
const storeMetrics = useMetricsStore()
const filters = useFiltersStore()

const filterNmId = computed({
  get: () => filters.filterNmId,
  set: (v) => (filters.filterNmId = v),
})
const filterCategory = computed({
  get: () => filters.filterCategory,
  set: (v) => (filters.filterCategory = v),
})
const filterDate = computed({
  get: () => filters.filterDate,
  set: (v) => (filters.filterDate = v),
})
const filterRegion = computed({
  get: () => filters.filterWarehouseName,
  set: (v) => (filters.filterWarehouseName = v),
})
const filterBrand = computed({
  get: () => filters.filterBrand,
  set: (v) => (filters.filterBrand = v),
})

const currentOrders = ref<dataOrders>({
  data: [],
  links: {
    first: '',
    last: '',
    next: '',
    prev: null,
  },
})
const prevOrders = ref<dataOrders>({
  data: [],
  links: {
    first: '',
    last: '',
    next: '',
    prev: null,
  },
})

const fetchOrders = async () => {
  try {
    const response = await getOrders({
      key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
      dateFrom: currentFrom.value,
      dateTo: currentTo.value,
      limit: '150',
    })

    const responsePrev = await getOrders({
      key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
      dateFrom: prevFrom.value,
      dateTo: prevTo.value,
      limit: '150',
    })

    console.log('currentFrom', currentFrom.value)
    storeMetrics.addDate(currentFrom.value, currentTo.value)

    currentOrders.value = response.data
    store.setCurrentOrders(response.data)
    prevOrders.value = responsePrev.data
    store.setPrevOrders(responsePrev.data)
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
  }
}

onMounted(fetchOrders)

watch([currentFrom, currentTo, prevFrom, prevTo], fetchOrders)

const salesByWarehouse = computed(() => {
  const map = new Map<string, number>()

  for (const item of currentOrders.value.data) {
    const name = item.warehouse_name
    map.set(name, (map.get(name) || 0) + 1)
  }

  return Array.from(map.entries())
})

function resetFilters() {
  filters.$reset()
}
</script>

<template>
  <div class="home">
    <div>
      Filters:
      <input v-model="filterNmId" placeholder="Article (nm_id)" />
      <input v-model="filterCategory" placeholder="Category" />
      <input v-model="filterDate" placeholder="Date (with time)" />
      <input v-model="filterRegion" placeholder="Region (warehouse_name)" />
      <input v-model="filterBrand" placeholder="Brand" />
    </div>
    <button style="font-size: 20px" @click="resetFilters">Сбросить фильтры</button>
    <div>
      <div>Current period:</div>
      To:
      <input type="date" v-model="currentTo" />
      From:
      <input type="date" v-model="currentFrom" />
    </div>
    <div>
      <div>Prev period:</div>
      To:
      <input type="date" v-model="prevTo" />
      From:
      <input type="date" v-model="prevFrom" />
    </div>
    *graphs display the current period
    <div class="tableGraph">
      <div class="symmarGraph">
        <router-link to="/mark/countsales" custom v-slot="{ navigate }">
          <div class="graph" @click="navigate" style="cursor: pointer">
            <LineChartComponent
              :labels="salesByWarehouse.map(([name]) => name)"
              :data="salesByWarehouse.map(([_, count]) => count)"
              data-type="count"
              title-text="count sales"
            />
          </div>
        </router-link>
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="count"
          :filterArticle="filterNmId"
          :filterRegion="filterRegion"
          :filterDate="filterDate"
          :filterCategories="filterCategory"
          :filterBrand="filterBrand"
        />
      </div>
      <div class="symmarGraph">
        <router-link to="/mark/pricesale" custom v-slot="{ navigate }">
          <div class="graph" @click="navigate" style="cursor: pointer">
            <LineChartComponent
              :labels="currentOrders.data.map((item) => item.date.slice(5, 16))"
              :data="currentOrders.data.map((item) => Number(item.total_price))"
              data-type="price"
              title-text="price sale"
            />
          </div>
        </router-link>
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="total_price"
          :filterArticle="filterNmId"
          :filterRegion="filterRegion"
          :filterDate="filterDate"
          :filterCategories="filterCategory"
          :filterBrand="filterBrand"
        />
      </div>
      <div class="symmarGraph">
        <router-link to="/mark/countcancel" custom v-slot="{ navigate }">
          <div class="graph" @click="navigate" style="cursor: pointer">
            <LineChartComponent
              :labels="currentOrders.data.map((item) => item.date.slice(5, 16))"
              :data="
                currentOrders.data.map((item) =>
                  item.cancel_dt == null ? Number(item.cancel_dt) : 1,
                )
              "
              data-type="cancel"
              title-text="count cancel"
            />
          </div>
        </router-link>
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="cancel_count"
          :filterArticle="filterNmId"
          :filterRegion="filterRegion"
          :filterDate="filterDate"
          :filterCategories="filterCategory"
          :filterBrand="filterBrand"
        />
      </div>
      <div class="symmarGraph">
        <router-link to="/mark/discountpercent" custom v-slot="{ navigate }">
          <div class="graph" @click="navigate" style="cursor: pointer">
            <LineChartComponent
              :labels="currentOrders.data.map((item) => item.date.slice(5, 16))"
              :data="currentOrders.data.map((item) => Number(item.discount_percent))"
              data-type="discount"
              title-text="discount percent"
            />
          </div>
        </router-link>
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="discount_percent"
          :filterArticle="filterNmId"
          :filterRegion="filterRegion"
          :filterDate="filterDate"
          :filterCategories="filterCategory"
          :filterBrand="filterBrand"
        />
      </div>
    </div>
  </div>
</template>

<style>
.home {
  flex: 1 0;
  /* background-color: chocolate; */
}
.tableGraph {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.symmarGraph {
  width: 96%;
  /* height: 410px; */
}
.graph {
  height: 300px;
}
</style>
