<template>
  <div>
    <!-- Kiểm tra nếu đường dẫn là "/" hoặc "/admin/login" thì chỉ hiển thị router-view -->
    <template v-if="isHomePage || isLoginPage || isLoginGuest">
      <div class="h-screen">
        <router-view></router-view>
      </div>
    </template>
    <!-- Nếu không phải trang "/" hoặc "/admin/login" -->
    <template v-else>
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
  </div>
</template>

<script>
import Sidebar from './components/Admin/Sidebar.vue'
import AppHeader from './components/Admin/AppHeader.vue'

export default {
  components: {
    Sidebar,
    AppHeader
  },
  computed: {
    // Kiểm tra nếu đường dẫn là "/"
    isHomePage() {
      return this.$route.path === '/'
    },
    // Kiểm tra nếu đường dẫn là "/admin/login"
    isLoginPage() {
      return this.$route.path === '/admin/login'
    },
    isLoginGuest() {
      return this.$route.path === '/login'
    }
  }
}
</script>

<style>
/* Áp dụng font chữ Open Sans cho toàn bộ component */
* {
  font-family: 'Open Sans', sans-serif;
}
</style>
