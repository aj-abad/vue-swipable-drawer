<template>
  <main id="home">
    <Sidebar :style="sidebarStyle" />
    <div
      id="swipe-container"
      style="padding: 0.5rem"
      @touchend="touchEndHandler()"
    >
      <div
        class="sidebar-overlay"
        :style="opacite"
        @click="closeSidebar()"
      ></div>
      <h1 v-for="i in 20" :key="i">
        <span v-if="i !== 5">Test</span>
        <router-link to="/details">Link</router-link>
      </h1>
    </div>
  </main>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Hammer from "hammerjs";
import anime from "animejs/lib/anime.es.js";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      sidebarStuff: {
        isResetting: false,
        hasMovedToFinger: false,
        isDragInitialized: false,
        isDragging: false,
        isSwipe: false,
        sidebarSpeed: 250,
        sidebarWidth: 0,
        translate: 0,
        exitVelocity: 0,
        dragFrom: 0,
        translateFrom: 0,
      },
    };
  },
  methods: {
    closeSidebar() {
      if (this.sidebarStuff.translate == this.sidebarStuff.sidebarWidth) {
        const deez = this;
        anime({
          targets: this.sidebarStuff,
          translate: -1,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: this.sidebarStuff.sidebarSpeed,
          complete() {
            deez.resetDrag();
          },
        });
      }
    },
    panHandler(e) {
      if (this.sidebarStuff.isResetting) return false;
      //drag start
      const angle = Math.abs(e.angle.toFixed(2));
      if (angle <= 10 && angle !== 0 && !this.sidebarStuff.isDragging) {
        const deez = this;
        this.sidebarStuff.isDragging = true;
        const dist =
          e.center.x > this.sidebarStuff.sidebarWidth
            ? this.sidebarStuff.sidebarWidth
            : e.center.x;
        this.sidebarStuff.translateFrom = dist;
        anime({
          targets: this.sidebarStuff,
          translate: this.sidebarStuff.sidebarWidth,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: this.sidebarStuff.sidebarSpeed,
          update() {
            if (deez.sidebarStuff.translate >= e.center.x) {
              if (deez.sidebarStuff.isSwipe) return false;
              deez.sidebarStuff.translateFrom = deez.sidebarStuff.translate;
              deez.sidebarStuff.hasMovedToFinger = true;
              return this.pause();
            }
          },
          complete() {
            deez.sidebarStuff.translateFrom = deez.sidebarStuff.translate;
            deez.sidebarStuff.hasMovedToFinger = true;
            if (deez.sidebarStuff.isSwipe) deez.resetDrag();
          },
        });
        return;
      }
      //is dragging
      if (this.sidebarStuff.hasMovedToFinger) {
        if (!this.sidebarStuff.isDragInitialized) {
          this.sidebarStuff.isDragInitialized = true;
          this.sidebarStuff.dragFrom = e.center.x;
          return;
        }
        let dist =
          this.sidebarStuff.translateFrom +
          e.center.x -
          this.sidebarStuff.dragFrom;
        dist =
          dist > this.sidebarStuff.sidebarWidth
            ? this.sidebarStuff.sidebarWidth
            : dist;
        dist = dist < -1 ? -1 : dist;
        this.sidebarStuff.exitVelocity = e.velocityX;
        this.sidebarStuff.translate = dist;
      }
    },
    touchEndHandler() {
      if (!this.sidebarStuff.hasMovedToFinger) {
        return (this.sidebarStuff.isSwipe = true);
      }
      if (this.sidebarStuff.translate === this.sidebarStuff.sidebarWidth)
        return this.resetDrag();

      this.sidebarStuff.isResetting = true;
      const deez = this;

      let animateTo =
        this.sidebarStuff.translate > this.sidebarStuff.sidebarWidth / 2
          ? this.sidebarStuff.sidebarWidth
          : -1;
      animateTo = this.sidebarStuff.exitVelocity < -0.2 ? -1 : animateTo;
      animateTo =
        this.sidebarStuff.exitVelocity > 0.2
          ? this.sidebarStuff.sidebarWidth
          : animateTo;

      anime({
        targets: this.sidebarStuff,
        translate: animateTo,
        easing: "cubicBezier(.25,.1,.25,1)",
        duration:
          (this.sidebarStuff.sidebarSpeed *
            Math.abs(this.sidebarStuff.translate - animateTo)) /
          this.sidebarStuff.sidebarWidth,
        complete() {
          deez.resetDrag();
        },
      });
    },
    resetDrag() {
      this.sidebarStuff.isResetting = false;
      this.sidebarStuff.isDragInitialized = false;
      this.sidebarStuff.hasMovedToFinger = false;
      this.sidebarStuff.isDragging = false;
      this.sidebarStuff.isDragStarted = false;
      this.sidebarStuff.isSwipe = false;
      this.sidebarStuff.translateFrom = 0;
      this.sidebarStuff.dragFrom = 0;
    },
  },
  computed: {
    sidebarStyle: function () {
      return {
        left: this.sidebarStuff.translate + "px",
      };
    },
    opacite: function () {
      return {
        opacity:
          (this.sidebarStuff.translate / this.sidebarStuff.sidebarWidth) * 0.5,
        pointerEvents:
          this.sidebarStuff.translate == this.sidebarStuff.sidebarWidth
            ? "all"
            : "none",
      };
    },
  },
  mounted() {
    this.sidebarStuff.sidebarWidth = Math.floor(
      document.querySelector("#sidebar").offsetWidth
    );
    let stage = document.querySelector("#swipe-container");
    var hammertime = new Hammer(stage, Hammer.defaults);
    hammertime.on("pan", (e) => {
      this.panHandler(e);
    });
    anime({
      targets: this.sidebarStuff,
      translate: -1,
      duration:
        (this.sidebarStuff.sidebarSpeed *
          Math.abs(
            this.sidebarStuff.translate - this.sidebarStuff.sidebarWidth
          )) /
        this.sidebarStuff.sidebarWidth,
    });
  },
};
</script>

<style lang="stylus" scoped>
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
