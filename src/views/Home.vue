<template>
  <main id="home">
    <Sidebar class="sidebar" id="sidebar" :style="sidebarStyle" />
    <div id="swipe-container" style="padding: 0.5rem">
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
        sidebarSpeed: 250,
        animation: null,
        isDragging: false,
        isSwipe: false,
        sidebarWidth: 0,
        translate: 0,
        exitVelocity: 0,
        dragFrom: 0,
        translateFrom: 0,
        isDragInitialized: false,
        firstDrag: false,
      },
    };
  },
  methods: {
    closeSidebar() {
      if (this.sidebarStuff.translate == this.sidebarStuff.sidebarWidth) {
        const deez = this
        anime({
          targets: this.sidebarStuff,
          translate: -1,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: this.sidebarStuff.sidebarSpeed,
          complete(){
            deez.resetDrag()
          }
        });
      }
    },
    panHandler(e) {
      if (this.sidebarStuff.isResetting) return false;
      //drag start
      const deez = this;
      const angle = Math.abs(e.angle.toFixed(2));
      if (angle <= 8 && angle !== 0 && !this.sidebarStuff.isDragging) {
        this.sidebarStuff.isDragging = true;
        const dist =
          e.center.x > this.sidebarStuff.sidebarWidth
            ? this.sidebarStuff.sidebarWidth
            : e.center.x;
        this.sidebarStuff.translateFrom = dist;
        this.sidebarStuff.animation = anime({
          targets: this.sidebarStuff,
          translate: this.sidebarStuff.sidebarWidth,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: this.sidebarStuff.sidebarSpeed,
          update() {
            if (deez.sidebarStuff.translate >=   e.center.x) {
              if (deez.sidebarStuff.isSwipe) return 
              this.pause();
              deez.sidebarStuff.translateFrom = deez.sidebarStuff.translate
              deez.sidebarStuff.isDragInitialized = true;
            }
          },
          complete(){
            deez.sidebarStuff.isDragInitialized = true;
          }
        });
        return;
      }
      //is dragging
      if (this.sidebarStuff.isDragInitialized) {
        if (!this.sidebarStuff.firstDrag) {
          this.sidebarStuff.firstDrag = true;
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
        this.sidebarStuff.translate = dist;
      }
    },
    touchEndHandler() {
      if (!this.sidebarStuff.isDragInitialized) {
        return (this.sidebarStuff.isSwipe = true);
      }
      if (this.sidebarStuff.translate === this.sidebarStuff.sidebarWidth)
        return this.resetDrag();

      this.sidebarStuff.isResetting = true;
      const deez = this;
      const animateTo =
        this.sidebarStuff.translate > this.sidebarStuff.sidebarWidth / 2
          ? this.sidebarStuff.sidebarWidth
          : -1;
      this.sidebarStuff.animation = anime({
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
      console.log("reset")
      this.sidebarStuff.isResetting = false;
      this.sidebarStuff.firstDrag = false;
      this.sidebarStuff.isDragInitialized = false;
      this.sidebarStuff.isDragging = false;
      this.sidebarStuff.translateFrom = 0;
      this.sidebarStuff.dragFrom = 0;
      this.sidebarStuff.isDragStarted = false;
      this.sidebarStuff.isSwipe = false;
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
    stage.addEventListener("touchend", () => {
      this.touchEndHandler();
    });
    this.sidebarStuff.animation = anime({
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
