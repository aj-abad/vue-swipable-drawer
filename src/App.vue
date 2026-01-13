<script setup lang="ts">
import DrawerContainer from './components/DrawerContainer.vue'
</script>

<template>
  <div id="app">
    <DrawerContainer>
      <template #sidebar>
        <h1 v-for="j in 26" :key="j">{{ j - 26 }}</h1>
      </template>
      <template #content>
        <h1 v-for="i in 100" :key="i">d</h1>
      </template>
    </DrawerContainer>
  </div>
</template>

<style>
#app {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
