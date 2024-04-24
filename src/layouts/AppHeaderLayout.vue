<!-- AppHeaderLayout.vue -->

<template>
  <div class="app-header-layout">
    <!-- Header -->
    <AppHeader class="bg-white shadow-md w-100-px" />

    <!-- Main content -->
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/Admin/AppHeader.vue'

export default {
  name: 'AppHeaderLayout',
  components: {
    AppHeader
  }
}
</script>

<style>
.w-100-px {
  width: 100%;
}
</style>
