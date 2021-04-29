<template>
  <main id="details">
    dddd
    <router-link to="/">Back</router-link>
  </main>
</template>

<script>
export default {
  name: "Details"
};
</script>

<style scoped lang="stylus">
main {
  background-color: lime;
  z-index: 99
}

.fade-enter, .fade-leave-to {

  transform: translateX(100vw);
}

.fade-leave-to{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
