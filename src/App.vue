<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <router-link class="redirPage" exact-active-class="active-link" to="/">home</router-link>
        <router-link class="redirPage" exact-active-class="active-link" to="/incomes"
          >incomes</router-link
        >
        <router-link class="redirPage" exact-active-class="active-link" to="/orders"
          >orders</router-link
        >
        <router-link class="redirPage" exact-active-class="active-link" to="/sales"
          >sales</router-link
        >
        <router-link class="redirPage" exact-active-class="active-link" to="/stocks"
          >stocks</router-link
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.active-link {
  font-weight: bold;
  background-color: #5d5d5d;
  border-bottom: 2px solid #42b983;
}
nav {
  height: 60px;
  background-color: rgb(130, 130, 130);

  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  background-color: rgb(187, 187, 187);
  font-size: 20px;
}
.redirPage {
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}
</style>
