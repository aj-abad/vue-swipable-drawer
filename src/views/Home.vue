<template>
  <main id="home">
    <sidebar
      ref="sidebar"
      :style="`left: ${translate}px`"
      @sidebar-touch-end="touchEndHandler()"
    />
    <div
      ref="swipeContainer"
      style="padding: 0.5rem"
      @touchend="touchEndHandler()"
    >
      <div
        class="sidebar-overlay"
        :style="overlayOpacity"
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
      isOpen: false,
      isResetting: false,
      hasMovedToFinger: false,
      isDragInitialized: false,
      isDragging: false,
      isSwipe: false,
      sidebarSpeed: 300,
      sidebarWidth: 0,
      translate: 0,
      exitVelocity: 0,
      dragFrom: 0,
      translateFrom: 0,
    };
  },
  methods: {
    closeSidebar() {
      if (this.isOpen) {
        this.isResetting = true;
        const deez = this;
        anime({
          targets: this,
          translate: -1,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: this.sidebarSpeed,
          complete() {
            deez.resetSidebar();
          },
        });
      }
    },
    panHandler(e) {
      if (this.isResetting) return false;
      //start drag and set isDragging
      const angle = Math.abs(e.angle.toFixed(2));
      if (angle <= 10 && e.velocityX > 0 && !this.isDragging) {
        const deez = this;
        this.isDragging = true;
        const dist =
          e.center.x > this.sidebarWidth ? this.sidebarWidth : e.center.x;
        this.translateFrom = dist;
        anime({
          targets: this,
          translate: this.sidebarWidth,
          easing: "cubicBezier(.25,.1,.25,1)",
          duration: this.sidebarSpeed,
          update() {
            if (deez.translate >= e.center.x) {
              if (deez.isSwipe) return false;
              deez.translateFrom = deez.translate;
              deez.hasMovedToFinger = true;
              this.pause();
            }
          },
          complete() {
            deez.translateFrom = deez.translate;
            deez.hasMovedToFinger = true;
            if (deez.isSwipe) deez.resetSidebar();
          },
        });
        return;
      }
      //is dragging
      if (this.hasMovedToFinger) {
        if (!this.isDragInitialized) {
          this.isDragInitialized = true;
          this.dragFrom = e.center.x;
          return;
        }
        let dist = this.translateFrom + e.center.x - this.dragFrom;
        dist = dist > this.sidebarWidth ? this.sidebarWidth : dist;
        dist = dist < -1 ? -1 : dist;
        this.exitVelocity = e.velocityX;
        this.translate = dist;
      }
    },
    touchEndHandler() {
      if (this.isResetting || this.isSwipe) return false;
      this.isResetting = true;
      if (this.isDragging && !this.hasMovedToFinger) {
        return (this.isSwipe = true);
      }
      const deez = this;
      let animateTo =
        this.translate > this.sidebarWidth / 2 ? this.sidebarWidth : -1;
      animateTo = this.exitVelocity < -0.2 ? -1 : animateTo;
      animateTo = this.exitVelocity > 0.2 ? this.sidebarWidth : animateTo;
      anime({
        targets: this,
        translate: animateTo,
        easing: "cubicBezier(.25,.1,.25,1)",
        duration:
          (this.sidebarSpeed * Math.abs(this.translate - animateTo)) /
          this.sidebarWidth,
        complete() {
          deez.resetSidebar();
        },
      });
    },
    resetSidebar() {
      this.isOpen = this.translate === this.sidebarWidth;
      this.isResetting = this.isDragInitialized = this.hasMovedToFinger = this.isDragging = this.isDragStarted = this.isSwipe = false;
      this.translateFrom = this.dragFrom = this.exitVelocity = 0;
    },
    sidebarPanHandler(e) {
      if (!this.isOpen || this.isResetting) return false;
      if (!this.isDragStarted) {
        console.log("drag about to start");
        const angle = Math.abs(e.angle.toFixed(2));
        const validAngle =
          Math.abs(e.velocityX) > 0 &&
          ((angle <= 180 && angle >= 170) || angle <= 10);
       
        if (!validAngle) return false;

        this.dragFrom = e.center.x;
        console.log("drag started");
        return (this.isDragStarted = true);
      }
      let dist = e.center.x - this.dragFrom + this.sidebarWidth;
      dist = dist < -1 ? -1 : dist;
      dist = dist > this.sidebarWidth ? this.sidebarWidth : dist;
      this.dragFrom = dist === this.sidebarWidth ? e.center.x : this.dragFrom;
      this.translate = dist;
      this.exitVelocity = e.velocityX;
    },
  },
  computed: {
    overlayOpacity: function () {
      return {
        opacity: (this.translate / this.sidebarWidth) * 0.5,
        pointerEvents: this.translate == this.sidebarWidth ? "all" : "none",
      };
    },
  },
  mounted() {
    this.sidebarWidth = Math.floor(
      document.querySelector("#sidebar").offsetWidth
    );
    const stage = this.$refs.swipeContainer;
    const hammerArea = new Hammer(stage, Hammer.defaults);
    const sidebarArea = new Hammer(
      document.querySelector("#sidebar"),
      Hammer.defaults
    );
    sidebarArea.on("pan", (e) => this.sidebarPanHandler(e));
    hammerArea.on("pan", (e) => {
      this.panHandler(e);
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
