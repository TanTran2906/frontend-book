<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar class="w-64 bg-gray-800 text-white" />

    <!-- Main content -->
    <!--flex-1: chiếm toàn bộ không gian còn lại không bị chiếm bởi Sidebar -->
    <div class="flex flex-col flex-1">
      <!-- Header -->
      <AppHeader class="bg-white shadow-md" />

      <!-- Main content area -->
      <div class="pl-72">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Admin/AppHeader.vue'
import Sidebar from './components/Admin/Sidebar.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Sidebar
  }
}
</script>

<style>
/* Áp dụng font chữ Open Sans cho toàn bộ component */
* {
  font-family: 'Open Sans', sans-serif;
}
</style>
