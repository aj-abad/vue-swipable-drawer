<template>
  <div id="app">
    <DrawerContainer>
      <template v-slot:sidebar>
        <h1 v-for="j in 26" :key="j">{{ j - 26 }}</h1>
      </template>
      <template v-slot:content>
        <h1 v-for="i in 100" :key="i">d</h1>
      </template>
    </DrawerContainer>
  </div>
</template>

<script>
import DrawerContainer from "./components/DrawerContainer.vue";

export default {
  name: "App",
  components: {
    DrawerContainer
  }
};
</script>

<style>
#app {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
