<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
  overflow-y: auto;
  overflow-x: hidden;
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
