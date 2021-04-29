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
        sidebarWidth: 0,
        translate: 0,
        exitVelocity: 0,
        dragStartX: 0,
        firstDragX: 0,
        isDragInitialized: false,
        firstDrag: false,
      },
    };
  },
  methods: {
    closeSidebar() {
      if (this.sidebarStuff.translate == this.sidebarStuff.sidebarWidth) {
        anime({
          targets: this.sidebarStuff,
          translate: -1,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: 250,
        });
        this.sidebarStuff.isDragging = false;
      }
    },
    panHandler(e) {
      if (this.sidebarStuff.isResetting) return false;
      //drag start
      const deez = this;
      const angle = Math.abs(e.angle.toFixed(2));
      if (angle <= 8 && angle !== 0 && !this.sidebarStuff.isDragging) {
        console.log(e);
        this.sidebarStuff.isDragging = true;
        const dist =
          e.center.x > this.sidebarStuff.sidebarWidth
            ? this.sidebarStuff.sidebarWidth
            : e.center.x;
        this.sidebarStuff.firstDragX = dist;
        this.sidebarStuff.animation = anime({
          targets: this.sidebarStuff,
          translate: dist,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration:
            (this.sidebarStuff.sidebarSpeed * dist) /
            this.sidebarStuff.sidebarWidth,
          complete() {
            deez.sidebarStuff.isDragInitialized = true;
          },
        });
        return;
      }
      //is dragging
      if (this.sidebarStuff.isDragInitialized) {
        if (!this.sidebarStuff.firstDrag) {
          this.sidebarStuff.firstDrag = true;
          this.sidebarStuff.dragStartX = e.center.x;
          return;
        }
        let dist =
          this.sidebarStuff.firstDragX +
          e.center.x -
          this.sidebarStuff.dragStartX;
        dist =
          dist > this.sidebarStuff.sidebarWidth
            ? this.sidebarStuff.sidebarWidth
            : dist;
        dist = dist < -1 ? -1 : dist;
        this.sidebarStuff.translate = dist;
      }
    },
    touchEndHandler() {
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
          deez.sidebarStuff.isResetting = false;
          deez.sidebarStuff.firstDrag = false;
          deez.sidebarStuff.isDragInitialized = false;
          deez.sidebarStuff.isDragging = false;
        },
      });
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
      easing: "cubicBezier(.25,.1,.25,1)",
      duration: 250,
      complete() {
        console.log("initialized");
      },
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
