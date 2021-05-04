<template>
  <aside id="sidebar" @touchend="$emit('sidebar-touch-end')">
    <h1 v-for="i in 100" :key="i">{{ i }}</h1>
  </aside>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped>
#sidebar {
  overflow-y: auto;
  height: 100%;
  width: 22rem;
  max-width: calc(100%);
  background: white;
  position: fixed;
  z-index: 101;
  transform: translateX(-100%);
}
</style>
