<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">
#app {
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
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

body {
  font-family: gotham;
  font-weight: light;
}

#menuopen {
  touch-action: none;
  height: 100vh;
  width: 1em;
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
}

.fade-enter-active, .fade-leave-active {
  transition: 0.25s;
}
</style>
