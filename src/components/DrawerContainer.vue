<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Hammer from 'hammerjs'
import anime from 'animejs/lib/anime.es.js'

export interface DrawerProps {
  /** Width of the drawer (CSS value) */
  width?: string
  /** Velocity threshold for swipe detection (0-1) */
  swipeThreshold?: number
  /** Overlay background color */
  overlayColor?: string
  /** Maximum overlay opacity (0-1) */
  overlayOpacity?: number
  /** Transition duration in milliseconds */
  transitionSpeed?: number
}

const props = withDefaults(defineProps<DrawerProps>(), {
  width: '22rem',
  swipeThreshold: 0.2,
  overlayColor: 'rgba(0, 0, 0, 1)',
  overlayOpacity: 0.5,
  transitionSpeed: 300
})

const transitionEasing = 'cubicBezier(.25,.1,.25,1)'

const sidebar = ref<HTMLElement | null>(null)
const swipeContainer = ref<HTMLElement | null>(null)

const sidebarWidth = ref(0)
const isOpen = ref(false)
const isResetting = ref(false)
const hasMovedToFinger = ref(false)
const isDragInitialized = ref(false)
const isDragging = ref(false)
const isSwipe = ref(false)
const translate = ref(0)
const exitVelocity = ref(0)
const dragFrom = ref(0)
const translateTo = ref(0)
const startSidebarDragTo = ref(0)

const overlayStyle = computed(() => ({
  opacity: (translate.value / sidebarWidth.value) * props.overlayOpacity,
  pointerEvents: translate.value === sidebarWidth.value ? 'all' : 'none' as const,
  background: props.overlayColor
}))

const sidebarStyle = computed(() => ({
  left: `${translate.value}px`,
  width: props.width
}))

function resetSidebar() {
  isOpen.value = translate.value === sidebarWidth.value
  isResetting.value = false
  isDragInitialized.value = false
  hasMovedToFinger.value = false
  isDragging.value = false
  isSwipe.value = false
  translateTo.value = 0
  dragFrom.value = 0
  exitVelocity.value = 0
  startSidebarDragTo.value = 0
}

function closeSidebar() {
  if (!isOpen.value) return
  isResetting.value = true
  anime({
    targets: { val: translate.value },
    val: -1,
    easing: transitionEasing,
    duration: props.transitionSpeed,
    update(anim: anime.AnimeInstance) {
      translate.value = (anim.animations[0] as any).currentValue
    },
    complete() {
      translate.value = -1
      resetSidebar()
    }
  })
}

function panHandler(e: HammerInput) {
  if (isResetting.value) return
  if (isDragging.value && !hasMovedToFinger.value) {
    startSidebarDragTo.value = e.center.x
    return
  }
  
  const angle = Math.abs(Number(e.angle.toFixed(2)))
  if (angle <= 10 && e.velocityX > 0 && !isDragging.value) {
    startSidebarDragTo.value = e.center.x
    if (sidebar.value) {
      sidebar.value.scrollTop = 0
    }
    isDragging.value = true
    
    anime({
      targets: { val: translate.value },
      val: sidebarWidth.value,
      easing: transitionEasing,
      duration: props.transitionSpeed,
      update(anim: anime.AnimeInstance) {
        const currentVal = (anim.animations[0] as any).currentValue
        translate.value = currentVal
        
        // Skip finger-catching logic if this is a swipe-through gesture
        if (isSwipe.value) return
        
        if (currentVal > startSidebarDragTo.value) {
          translateTo.value = currentVal
          hasMovedToFinger.value = true
          anim.pause()
        }
      },
      complete() {
        translate.value = sidebarWidth.value
        translateTo.value = sidebarWidth.value
        hasMovedToFinger.value = true
        if (isSwipe.value) resetSidebar()
      }
    })
    return
  }
  
  if (!hasMovedToFinger.value) return
  if (!isDragInitialized.value) {
    dragFrom.value = e.center.x > sidebarWidth.value ? sidebarWidth.value : e.center.x
    isDragInitialized.value = true
    return
  }
  
  if (e.center.x >= sidebarWidth.value) {
    dragFrom.value = sidebarWidth.value
    translateTo.value = sidebarWidth.value
  }
  
  if (
    translate.value === sidebarWidth.value &&
    dragFrom.value <= sidebarWidth.value &&
    dragFrom.value < e.center.x
  ) {
    dragFrom.value = e.center.x
    translateTo.value = sidebarWidth.value
  }
  
  let dist = translateTo.value + e.center.x - dragFrom.value
  dist = dist > sidebarWidth.value ? sidebarWidth.value : dist
  dist = dist < -1 ? -1 : dist
  exitVelocity.value = e.velocityX
  translate.value = dist
}

function touchEndHandler() {
  if (isResetting.value || isSwipe.value) return
  if (isDragging.value && !hasMovedToFinger.value) {
    isSwipe.value = true
    return
  }
  
  isResetting.value = true
  let animateTo = translate.value > sidebarWidth.value / 2 ? sidebarWidth.value : -1
  animateTo = exitVelocity.value < -props.swipeThreshold ? -1 : animateTo
  animateTo = exitVelocity.value > props.swipeThreshold ? sidebarWidth.value : animateTo
  
  anime({
    targets: { val: translate.value },
    val: animateTo,
    easing: transitionEasing,
    duration: (props.transitionSpeed * Math.abs(translate.value - animateTo)) / sidebarWidth.value,
    update(anim: anime.AnimeInstance) {
      translate.value = (anim.animations[0] as any).currentValue
    },
    complete() {
      translate.value = animateTo
      resetSidebar()
    }
  })
}

function sidebarPanHandler(e: HammerInput) {
  if (!isOpen.value || isResetting.value) return
  
  if (!isDragInitialized.value) {
    const angle = Math.abs(Number(e.angle.toFixed(2)))
    const validAngle =
      Math.abs(e.velocityX) > 0 &&
      ((angle <= 180 && angle >= 170) || angle <= 10)
    if (!validAngle) return
    
    dragFrom.value = e.center.x
    isDragInitialized.value = true
    return
  }
  
  let dist = e.center.x - dragFrom.value + sidebarWidth.value
  dist = dist < -1 ? -1 : dist
  dist = dist > sidebarWidth.value ? sidebarWidth.value : dist
  dragFrom.value = dist === sidebarWidth.value ? e.center.x : dragFrom.value
  dragFrom.value = dragFrom.value > sidebarWidth.value ? sidebarWidth.value : dragFrom.value
  translate.value = dist
  exitVelocity.value = e.velocityX
}

onMounted(() => {
  if (sidebar.value) {
    sidebarWidth.value = Math.floor(sidebar.value.offsetWidth)
  }
  
  if (swipeContainer.value) {
    const hammerArea = new Hammer(swipeContainer.value)
    hammerArea.on('pan', panHandler)
    hammerArea.on('panend', touchEndHandler)
  }
  
  if (sidebar.value) {
    const sidebarArea = new Hammer(sidebar.value)
    sidebarArea.on('pan', sidebarPanHandler)
    sidebarArea.on('panend', touchEndHandler)
  }
})
</script>

<template>
  <div>
    <aside
      id="sidebar"
      ref="sidebar"
      :style="sidebarStyle"
      :class="{
        'swipable-drawer-hidden': translate === -1,
        'swipable-drawer-unclickable': translate < sidebarWidth
      }"
      @touchend="touchEndHandler()"
      @mouseup="touchEndHandler()"
    >
      <slot name="sidebar" />
    </aside>

    <div
      class="sidebar-overlay"
      :style="overlayStyle"
      @click="closeSidebar()"
    />
    
    <div class="full-height" ref="swipeContainer" @touchend="touchEndHandler()" @mouseup="touchEndHandler()">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
#sidebar {
  overflow-y: auto;
  height: 100%;
  max-width: 100%;
  background: white;
  position: fixed;
  z-index: 101;
  transform: translateX(-100%);
}

.full-height {
  min-height: 100vh;
  touch-action: pan-y;
  overscroll-behavior-x: none;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  touch-action: none;
  overscroll-behavior: none;
}

.swipable-drawer-hidden {
  display: none !important;
}

.swipable-drawer-unclickable {
  pointer-events: none !important;
}
</style>
