<script setup lang="ts">
import type { dataOrders } from '@/types/api'
import { getOrders } from '@/utils/api'
import { computed, onMounted, ref } from 'vue'
import LineChartComponent from '@/components/LineChartComponent.vue'
import DataTableTopArticles from '@/components/DataTableTopArticles.vue'

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

const ordersParams = {
  key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  dateFrom: '2025-06-29',
  dateTo: '2025-07-29',
  limit: '150',
}
const ordersPrevParams = {
  key: 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie',
  dateFrom: '2025-04-29',
  dateTo: '2025-05-29',
  limit: '150',
}

onMounted(async () => {
  try {
    const response = await getOrders(ordersParams)
    const responsePrev = await getOrders(ordersPrevParams)
    currentOrders.value = response.data
    prevOrders.value = responsePrev.data
  } catch (error) {
    console.error('Ошибка при получении заказов:', error)
  }
})

const salesByWarehouse = computed(() => {
  const map = new Map<string, number>()

  for (const item of currentOrders.value.data) {
    const name = item.warehouse_name
    map.set(name, (map.get(name) || 0) + 1)
  }

  return Array.from(map.entries())
})
</script>

<template>
  <div class="home">
    <div>
      Current period:
      <input type="date" value="2025-07-29" />
      <input type="date" value="2025-06-29" />
    </div>
    <div>
      Prev period:
      <input type="date" value="2025-05-29" />
      <input type="date" value="2025-04-29" />
    </div>
    *graphs display the current period
    <div class="tableGraph">
      <div class="symmarGraph">
        <div class="graph">
          <LineChartComponent
            :labels="salesByWarehouse.map(([name]) => name)"
            :data="salesByWarehouse.map(([_, count]) => count)"
            data-type="sales"
            title-text="count sales"
          />
        </div>
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="count"
        />
      </div>
      <div class="symmarGraph">
        <router-link to="/markpricesale" custom v-slot="{ navigate }">
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
        />
      </div>
      <div class="symmarGraph">
        <div class="graph">
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
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="cancel_count"
        />
      </div>
      <div class="symmarGraph">
        <div class="graph">
          <LineChartComponent
            :labels="currentOrders.data.map((item) => item.date.slice(5, 16))"
            :data="currentOrders.data.map((item) => Number(item.discount_percent))"
            data-type="discount"
            title-text="discount percent"
          />
        </div>
        <DataTableTopArticles
          :data="currentOrders.data"
          :dataPrev="prevOrders.data"
          field="discount_percent"
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
