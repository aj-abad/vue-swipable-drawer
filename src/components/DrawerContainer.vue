<template>
  <div>
    <aside
      id="sidebar"
      ref="sidebar"
      :style="`left: ${translate}px`"
      @touchend="touchEndHandler()"
      :class="{
        'swipable-drawer-hidden': translate === -1,
        'swipable-drawer-unclickable': translate < sidebarWidth,
      }"
    >
     <slot name="sidebar"/>
    </aside>

    <div
      class="sidebar-overlay"
      :style="overlayOpacity"
      @click="closeSidebar()"
    ></div>
    <div class="full-height" ref="swipeContainer" @touchend="touchEndHandler()">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import Hammer from "hammerjs";
import anime from "animejs/lib/anime.es.js";
export default {
  data() {
    return {
      transitionEasing: "cubicBezier(.25,.1,.25,1)",
      transitionSpeed: 300,
      sidebarWidth: 0,
      isOpen: false,
      isResetting: false,
      hasMovedToFinger: false,
      isDragInitialized: false,
      isDragging: false,
      isSwipe: false,
      translate: 0,
      exitVelocity: 0,
      dragFrom: 0,
      translateTo: 0,
      startSidebarDragTo: 0,
    };
  },
  methods: {
    closeSidebar() {
      if (!this.isOpen) return false;
      this.isResetting = true;
      const deez = this;
      anime({
        targets: this,
        translate: -1,
        easing: this.transitionEasing,
        duration: this.transitionSpeed,
        complete() {
          deez.resetSidebar();
        },
      });
    },
    panHandler(e) {
      if (this.isResetting) return false;
      if (this.isDragging && !this.hasMovedToFinger)
        return (this.startSidebarDragTo = e.center.x);
      const angle = Math.abs(e.angle.toFixed(2));
      if (angle <= 10 && e.velocityX > 0 && !this.isDragging) {
        this.startSidebarDragTo = e.center.x;
        this.$refs.sidebar.scrollTop = 0;
        const deez = this;
        this.isDragging = true;
        return anime({
          targets: this,
          translate: this.sidebarWidth,
          easing: this.transitionEasing,
          duration: this.transitionSpeed,
          update() {
            if (deez.isSwipe) return false;
            if (deez.translate > deez.startSidebarDragTo) {
              deez.translateTo = deez.translate;
              deez.hasMovedToFinger = true;
              this.pause();
            }
          },
          complete() {
            deez.translateTo = deez.translate;
            deez.hasMovedToFinger = true;
            if (deez.isSwipe) deez.resetSidebar();
          },
        });
      }
      if (!this.hasMovedToFinger) return false;
      if (!this.isDragInitialized) {
        this.dragFrom =
          e.center.x > this.sidebarWidth ? this.sidebarWidth : e.center.x;

        return (this.isDragInitialized = true);
      }
      if (e.center.x >= this.sidebarWidth) {
        this.dragFrom = this.sidebarWidth;
        this.translateTo = this.sidebarWidth;
      }
      if (
        this.translate === this.sidebarWidth &&
        this.dragFrom <= this.sidebarWidth &&
        this.dragFrom < e.center.x
      ) {
        this.dragFrom = e.center.x;
        this.translateTo = this.sidebarWidth;
      }
      let dist = this.translateTo + e.center.x - this.dragFrom;
      dist = dist > this.sidebarWidth ? this.sidebarWidth : dist;
      dist = dist < -1 ? -1 : dist;
      this.exitVelocity = e.velocityX;
      this.translate = dist;
    },
    touchEndHandler() {
      if (this.isResetting || this.isSwipe) return false;
      if (this.isDragging && !this.hasMovedToFinger) {
        return (this.isSwipe = true);
      }
      this.isResetting = true;
      const deez = this;
      let animateTo =
        this.translate > this.sidebarWidth / 2 ? this.sidebarWidth : -1;
      animateTo = this.exitVelocity < -0.2 ? -1 : animateTo;
      animateTo = this.exitVelocity > 0.2 ? this.sidebarWidth : animateTo;
      anime({
        targets: this,
        translate: animateTo,
        easing: this.transitionEasing,
        duration:
          (this.transitionSpeed * Math.abs(this.translate - animateTo)) /
          this.sidebarWidth,
        complete() {
          deez.resetSidebar();
        },
      });
    },
    resetSidebar() {
      this.isOpen = this.translate === this.sidebarWidth;
      this.isResetting = false;
      this.isDragInitialized = false;
      this.hasMovedToFinger = false;
      this.isDragging = false;
      this.isSwipe = false;
      this.translateTo = 0;
      this.dragFrom = 0;
      this.exitVelocity = 0;
      this.startSidebarDragTo = 0;
    },
    sidebarPanHandler(e) {
      if (!this.isOpen || this.isResetting) return false;
      if (!this.isDragInitialized) {
        const angle = Math.abs(e.angle.toFixed(2));
        const validAngle =
          Math.abs(e.velocityX) > 0 &&
          ((angle <= 180 && angle >= 170) || angle <= 10);
        if (!validAngle) return false;

        this.dragFrom = e.center.x;
        return (this.isDragInitialized = true);
      }
      let dist = e.center.x - this.dragFrom + this.sidebarWidth;
      dist = dist < -1 ? -1 : dist;
      dist = dist > this.sidebarWidth ? this.sidebarWidth : dist;
      this.dragFrom = dist === this.sidebarWidth ? e.center.x : this.dragFrom;
      this.dragFrom =
        this.dragFrom > this.sidebarWidth ? this.sidebarWidth : this.dragFrom;
      this.translate = dist;
      this.exitVelocity = e.velocityX;
    },
  },
  computed: {
    overlayOpacity() {
      return {
        opacity: (this.translate / this.sidebarWidth) * 0.5,
        pointerEvents: this.translate === this.sidebarWidth ? "all" : "none",
      };
    },
  },
  mounted() {
    this.sidebarWidth = Math.floor(
      document.querySelector("#sidebar").offsetWidth
    );
    const stage = this.$refs.swipeContainer;
    const hammerArea = new Hammer(stage, Hammer.defaults);
    const sidebarArea = new Hammer(this.$refs.sidebar, Hammer.defaults);
    sidebarArea.on("pan", (e) => this.sidebarPanHandler(e));
    hammerArea.on("pan", (e) => {
      this.panHandler(e);
    });
  },
};
</script>

<style scoped>
#sidebar {
  overflow-y: auto;
  height: 100%;
  width: 22rem;
  max-width: calc(100%);
  background: white;
  position: fixed;
  z-index: 101;
  transform: translateX(-100%);
}

.full-height {
  min-height: 100vh;
}
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
