<template>
  <div id="sidebar" @touchend="$emit('sidebar-touch-end')">
    <div class="sidebar-header">
    </div>
     <h1 v-for="i in 100" :key="i">{{i}}</h1>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    msg: String
  }
};
</script>

<style scoped>
#sidebar {
  overflow-y: auto;
  height: 100%;
  width: 22rem;
  max-width: calc(100% - 2rem);
  background: white;
  position: fixed;
  z-index: 101;
  transform: translateX(-100%);
}

.sidebar-header {
  height: 8em;
  background: #00d1a4;
}
</style>
