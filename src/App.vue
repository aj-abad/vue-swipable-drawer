<script setup lang="ts">
import DrawerContainer from './components/DrawerContainer.vue'
</script>

<template>
  <div id="app">
    <DrawerContainer
      width="280px"
      :swipe-threshold="0.3"
      overlay-color="rgba(0, 0, 0, 0.9)"
      :overlay-opacity="0.6"
      :transition-speed="250"
    >
      <template #sidebar>
        <nav class="sidebar-content">
          <h2>Menu</h2>
          <ul>
            <li v-for="i in 10" :key="i">
              <a href="#">Menu Item {{ i }}</a>
            </li>
          </ul>
        </nav>
      </template>
      <template #content>
        <main class="main-content">
          <h1>Vue Swipable Drawer</h1>
          <p>Swipe from the left edge to open the drawer →</p>
          <div v-for="i in 20" :key="i" class="card">
            <h3>Card {{ i }}</h3>
            <p>Some content for card {{ i }}.</p>
          </div>
        </main>
      </template>
    </DrawerContainer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

#app {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-x: none;
}

.sidebar-content {
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100%;
  color: white;
}

.sidebar-content h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
}

.sidebar-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-content li {
  margin-bottom: 0.5rem;
}

.sidebar-content a {
  display: block;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s;
}

.sidebar-content a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.main-content {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  touch-action: pan-y;
}

.main-content h1 {
  margin: 0 0 0.5rem;
  color: #333;
}

.main-content > p {
  color: #666;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 0.5rem;
  color: #333;
}

.card p {
  margin: 0;
  color: #666;
}
</style>
