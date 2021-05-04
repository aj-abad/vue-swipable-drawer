<template>
  <main id="home">
    <drawer-container>
      <h1>DDD</h1>
      <h1>DDD</h1>
      <h1>DDD</h1>
      <h1>DDD</h1>
    </drawer-container>
  </main>
</template>

<script>
import DrawerContainer from "../components/DrawerContainer.vue";
export default {
  components: {
    DrawerContainer,
  },
};
</script>

<style lang="stylus" scoped>
.fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 100;
}

swipable-drawer-hidden {
  display: none !important;
}

swipable-drawer-unclickable {
  pointer-events: none !important;
}
</style>
