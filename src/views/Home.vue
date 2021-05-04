<template>
  <main id="home">
    <drawer-container>
       <template v-slot:sidebar>
        <h1 v-for="j in 26" :key="j">{{j -26}}</h1>
      </template>
      <template v-slot:content>
        <h1 v-for="i in 100" :key="i">d</h1>
      </template>
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
