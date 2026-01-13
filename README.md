# Vue Swipable Drawer

A drawer menu for your Vue 3 app that supports native-like swipe gestures.

## Installation

```bash
npm install
npm run dev
```

## Usage

```vue
<template>
  <DrawerContainer
    width="280px"
    :swipe-threshold="0.3"
    overlay-color="rgba(0, 0, 0, 0.9)"
    :overlay-opacity="0.6"
    :transition-speed="250"
  >
    <template #sidebar>
      <!-- Your sidebar content -->
    </template>
    <template #content>
      <!-- Your main content -->
    </template>
  </DrawerContainer>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `'22rem'` | Width of the drawer (any CSS value) |
| `swipe-threshold` | `number` | `0.2` | Velocity threshold for swipe detection (0-1) |
| `overlay-color` | `string` | `'rgba(0, 0, 0, 1)'` | Overlay background color |
| `overlay-opacity` | `number` | `0.5` | Maximum overlay opacity (0-1) |
| `transition-speed` | `number` | `300` | Transition duration in milliseconds |

## To-do

- Convert to NPM module
