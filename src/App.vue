<script setup lang="ts">
import DrawerContainer from './components/DrawerContainer.vue'
import { ref } from 'vue'

const currentTab = ref<'demo' | 'props' | 'usage'>('demo')
</script>

<template>
  <div id="app">
    <DrawerContainer
      width="300px"
      :swipe-threshold="0.25"
      overlay-color="rgb(15, 23, 42)"
      :overlay-opacity="0.7"
      :transition-speed="280"
    >
      <template #sidebar>
        <nav class="h-full bg-linear-to-b from-indigo-600 to-purple-700 text-white">
          <div class="p-6 border-b border-white/10">
            <h2 class="text-xl font-bold">Vue Swipable Drawer</h2>
            <p class="text-sm text-indigo-200 mt-1">v1.0.0</p>
          </div>
          <ul class="p-4 space-y-1">
            <li>
              <a
                href="#"
                @click.prevent="currentTab = 'demo'"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                :class="currentTab === 'demo' ? 'bg-white/20' : 'hover:bg-white/10'"
              >
                <span>🎯</span>
                <span>Demo</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="currentTab = 'props'"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                :class="currentTab === 'props' ? 'bg-white/20' : 'hover:bg-white/10'"
              >
                <span>⚙️</span>
                <span>Props</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="currentTab = 'usage'"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                :class="currentTab === 'usage' ? 'bg-white/20' : 'hover:bg-white/10'"
              >
                <span>📖</span>
                <span>Usage</span>
              </a>
            </li>
          </ul>
          <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <a
              href="https://github.com"
              target="_blank"
              class="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors"
            >
              <span>⭐</span>
              <span>Star on GitHub</span>
            </a>
          </div>
        </nav>
      </template>

      <template #content>
        <main class="max-w-3xl mx-auto px-6 py-8 touch-pan-y">
          <!-- Header -->
          <header class="mb-8">
            <div class="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>←</span>
              <span>Swipe from left edge to open menu</span>
            </div>
            <h1 class="text-4xl font-bold text-slate-900 mb-2">Vue Swipable Drawer</h1>
            <p class="text-lg text-slate-600">
              A native-like swipe gesture drawer for Vue 3 applications.
            </p>
          </header>

          <!-- Demo Tab -->
          <section v-if="currentTab === 'demo'" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-900 mb-4">Features</h2>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-emerald-500 mt-0.5">✓</span>
                  <span class="text-slate-700">Native-like swipe gestures with Hammer.js</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-emerald-500 mt-0.5">✓</span>
                  <span class="text-slate-700">Smooth animations powered by Anime.js</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-emerald-500 mt-0.5">✓</span>
                  <span class="text-slate-700">Fully customizable via props</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-emerald-500 mt-0.5">✓</span>
                  <span class="text-slate-700">TypeScript support</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-emerald-500 mt-0.5">✓</span>
                  <span class="text-slate-700">Vue 3 Composition API</span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-900 mb-4">Try It Out</h2>
              <p class="text-slate-600 mb-4">
                Swipe from the left edge of your screen to open the drawer. You can also drag the
                drawer to any position and release — it will snap open or closed based on velocity
                and position.
              </p>
              <div class="bg-slate-100 rounded-xl p-4 text-center">
                <span class="text-4xl">👈</span>
                <p class="text-sm text-slate-500 mt-2">Swipe from left edge</p>
              </div>
            </div>
          </section>

          <!-- Props Tab -->
          <section v-if="currentTab === 'props'" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div class="p-6 border-b border-slate-200">
                <h2 class="text-xl font-semibold text-slate-900">Available Props</h2>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-slate-50 text-sm text-slate-600">
                    <tr>
                      <th class="px-6 py-3 font-medium">Prop</th>
                      <th class="px-6 py-3 font-medium">Type</th>
                      <th class="px-6 py-3 font-medium">Default</th>
                      <th class="px-6 py-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    <tr>
                      <td class="px-6 py-4 font-mono text-sm text-indigo-600">width</td>
                      <td class="px-6 py-4 text-sm text-slate-600">string</td>
                      <td class="px-6 py-4 font-mono text-sm text-slate-500">'22rem'</td>
                      <td class="px-6 py-4 text-sm text-slate-600">
                        Width of the drawer (CSS value)
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-mono text-sm text-indigo-600">swipe-threshold</td>
                      <td class="px-6 py-4 text-sm text-slate-600">number</td>
                      <td class="px-6 py-4 font-mono text-sm text-slate-500">0.2</td>
                      <td class="px-6 py-4 text-sm text-slate-600">
                        Velocity threshold for swipe detection (0-1)
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-mono text-sm text-indigo-600">overlay-color</td>
                      <td class="px-6 py-4 text-sm text-slate-600">string</td>
                      <td class="px-6 py-4 font-mono text-sm text-slate-500">'rgba(0,0,0,1)'</td>
                      <td class="px-6 py-4 text-sm text-slate-600">Overlay background color</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-mono text-sm text-indigo-600">overlay-opacity</td>
                      <td class="px-6 py-4 text-sm text-slate-600">number</td>
                      <td class="px-6 py-4 font-mono text-sm text-slate-500">0.5</td>
                      <td class="px-6 py-4 text-sm text-slate-600">
                        Maximum overlay opacity (0-1)
                      </td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-mono text-sm text-indigo-600">transition-speed</td>
                      <td class="px-6 py-4 text-sm text-slate-600">number</td>
                      <td class="px-6 py-4 font-mono text-sm text-slate-500">300</td>
                      <td class="px-6 py-4 text-sm text-slate-600">
                        Animation duration in milliseconds
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- Usage Tab -->
          <section v-if="currentTab === 'usage'" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-900 mb-4">Installation</h2>
              <pre
                class="bg-slate-900 text-slate-100 rounded-xl p-4 text-sm overflow-x-auto"
              ><code>npm install vue-swipable-drawer</code></pre>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 class="text-xl font-semibold text-slate-900 mb-4">Basic Usage</h2>
              <pre
                class="bg-slate-900 text-slate-100 rounded-xl p-4 text-sm overflow-x-auto"
              ><code>&lt;template&gt;
  &lt;DrawerContainer
    width="280px"
    :swipe-threshold="0.3"
    overlay-color="rgba(0, 0, 0, 0.9)"
    :overlay-opacity="0.6"
    :transition-speed="250"
  &gt;
    &lt;template #sidebar&gt;
      &lt;!-- Your sidebar content --&gt;
    &lt;/template&gt;
    &lt;template #content&gt;
      &lt;!-- Your main content --&gt;
    &lt;/template&gt;
  &lt;/DrawerContainer&gt;
&lt;/template&gt;</code></pre>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 class="font-semibold text-amber-900 mb-2">⚠️ Important: Touch Action</h3>
              <p class="text-amber-800 text-sm">
                Content elements inside the drawer must have
                <code class="bg-amber-100 px-1.5 py-0.5 rounded">touch-action: pan-y</code>
                to allow horizontal swipe gestures to be captured by the drawer component.
              </p>
            </div>
          </section>

          <!-- Footer -->
          <footer class="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>Built with Vue 3, TypeScript, Hammer.js & Anime.js</p>
          </footer>
        </main>
      </template>
    </DrawerContainer>
  </div>
</template>
