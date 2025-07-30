<script setup lang="ts">
import DataTableTopArticles from '@/components/DataTableTopArticles.vue'
import LineChartComponent from '@/components/LineChartComponent.vue'
import { useRoute } from 'vue-router'
import { useOrdersStore } from '@/stores/orders'
import { computed } from 'vue'

const store = useOrdersStore()
const route = useRoute()

console.log(route.path)
console.log(store.currentOrders.data)

const salesByWarehouse = computed(() => {
  const map = new Map<string, number>()

  for (const item of store.currentOrders.data) {
    const name = item.warehouse_name
    map.set(name, (map.get(name) || 0) + 1)
  }

  return Array.from(map.entries())
})
</script>

<template>
  <div>
    Mark Count Sales page

    <div v-if="route.path === `/mark/countsales`">
      <div class="graphBig">
        <LineChartComponent
          :labels="salesByWarehouse.map(([name]) => name)"
          :data="salesByWarehouse.map(([_, count]) => count)"
          data-type="sales"
          title-text="count sales"
        />
      </div>

      <DataTableTopArticles
        :data="store.currentOrders.data"
        :dataPrev="store.prevOrders.data"
        field="count"
        :should-slice="false"
      />
    </div>

    <div v-if="route.path === `/mark/pricesale`">
      это
      <div class="graphBig">
        <LineChartComponent
          :labels="store.currentOrders.data.map((item) => item.date.slice(5, 16))"
          :data="store.currentOrders.data.map((item) => Number(item.total_price))"
          data-type="price"
          title-text="price sale"
        />
      </div>
      <DataTableTopArticles
        :data="store.currentOrders.data"
        :dataPrev="store.prevOrders.data"
        field="total_price"
        :should-slice="false"
      />
    </div>

    <div v-if="route.path === `/mark/countcancel`">
      это
      <div class="graphBig">
        <LineChartComponent
          :labels="store.currentOrders.data.map((item) => item.date.slice(5, 16))"
          :data="
            store.currentOrders.data.map((item) =>
              item.cancel_dt == null ? Number(item.cancel_dt) : 1,
            )
          "
          data-type="cancel"
          title-text="count cancel"
        />
      </div>
      <DataTableTopArticles
        :data="store.currentOrders.data"
        :dataPrev="store.prevOrders.data"
        field="cancel_count"
        :should-slice="false"
      />
    </div>

    <div v-if="route.path === `/mark/discountpercent`">
      это
      <div class="graphBig">
        <LineChartComponent
          :labels="store.currentOrders.data.map((item) => item.date.slice(5, 16))"
          :data="store.currentOrders.data.map((item) => Number(item.discount_percent))"
          data-type="discount"
          title-text="discount percent"
        />
      </div>
      <DataTableTopArticles
        :data="store.currentOrders.data"
        :dataPrev="store.prevOrders.data"
        field="discount_percent"
        :should-slice="false"
      />
    </div>
  </div>
</template>

<style>
.graphBig {
  height: 500px;
}
</style>
