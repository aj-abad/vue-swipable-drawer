<template>
  <div id="sidebar">
    <div class="sidebar-header"></div>
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
  height: 100%;
  width: clamp(20rem, 20rem, 100%);
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
