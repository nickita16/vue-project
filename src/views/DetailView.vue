<script setup lang="ts">
import { useOrdersStore } from '@/stores/orders'
import { useMetricsStore } from '@/stores/metrics'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useOrdersStore()
const storeMetrics = useMetricsStore()

const id = route.params.id
const idNum = Number(route.params.id)

const lastItem = store.currentOrders.data.find((item) => item.nm_id === idNum)
console.log(lastItem)
const items = store.currentOrders.data.filter((item) => item.nm_id === idNum)
items.forEach((item) => console.log(item))

console.log('store.currentValues', storeMetrics.currentValues)
console.log('store.currentValues.cancel_count', storeMetrics.currentValues.cancel_count[idNum])
console.log('store.currentValues.count', storeMetrics.currentValues.count[idNum])

onMounted(() => {
  console.log('ID из URL:', id)
})
</script>

<template>
  <div class="detail">
    <div class="infoForArticle">
      <div class="asdasda">
        <img class="imgArticle" src="@/assets/notImage.png" alt="Описание изображения" />
        <!-- <h1>Article id: {{ id }}</h1> -->
        <div class="idArticle">
          <div>Article id:</div>
          <div>{{ id }}</div>
        </div>
      </div>
      <div class="infoTable">
        <div style="font-size: 28px">Last order info:</div>

        <table>
          <thead>
            <tr>
              <th>Indicator name</th>
              <th>value</th>
            </tr>
          </thead>
          <tr v-for="[key, value] in Object.entries(lastItem || {})" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="tableContainer">
      <h1>Detail page</h1>
      <table>
        <thead>
          <tr>
            <th>Indicator name</th>
            <th>From: (date)</th>
            <th>To: (date)</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>count sales</td>
            <td>{{ storeMetrics.dateFrom }}</td>
            <td>{{ storeMetrics.dateTo }}</td>
            <td>{{ storeMetrics.currentValues.count[idNum] }}</td>
          </tr>
          <tr>
            <td>total price</td>
            <td>{{ storeMetrics.dateFrom }}</td>
            <td>{{ storeMetrics.dateTo }}</td>
            <td>{{ storeMetrics.currentValues.total_price[idNum].toFixed(2) }}</td>
          </tr>
          <tr>
            <td>cancel count</td>
            <td>{{ storeMetrics.dateFrom }}</td>
            <td>{{ storeMetrics.dateTo }}</td>
            <td>{{ storeMetrics.currentValues.cancel_count[idNum] }}</td>
          </tr>
          <tr>
            <td>discount percent</td>
            <td>{{ storeMetrics.dateFrom }}</td>
            <td>{{ storeMetrics.dateTo }}</td>
            <td>{{ storeMetrics.currentValues.discount_percent[idNum] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.detail {
  display: flex;
  height: calc(100vh - 60px);
}
.imgArticle {
  height: 200px;
  border-radius: 10px;
}
.infoForArticle {
  /* background-color: aqua; */
  padding: 10px;
  width: 33vw;
  min-width: 375px;
  border-right: 1px solid #868686;

  display: flex;
  flex-direction: column;
}
.infoTable {
  flex: 1 0;
  overflow-y: auto;
}

.asdasda {
  display: flex;
  padding-bottom: 15px;
}
.idArticle {
  padding: 0 10px;
  font-size: 28px;
}
.tableContainer {
  padding: 10px;
}
.tableContainer td {
  padding: 10px;
}
</style>
