<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <router-link class="redirPage" to="/incomes">incomes</router-link>
        <router-link class="redirPage" to="/">orders</router-link>
        <router-link class="redirPage" to="/sales">sales</router-link>
        <router-link class="redirPage" to="/stocks">stocks</router-link>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  height: 60px;
  background-color: rgb(130, 130, 130);

  display: flex;
  justify-content: center;
  align-items: center;
}
.redirPage {
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}
</style>
