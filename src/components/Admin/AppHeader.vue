<template>
  <nav class="pl-72 flex justify-between items-center shadow-md h-16 w-full">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <img src="/img/icons/android-chrome-192x192.png" alt="Logo" class="w-8 h-8 rounded-full" />
      <span class="text-gray-800 font-bold text-xl">THE SKY</span>
    </div>

    <!-- Logout button -->
    <button
      v-if="isLoggedIn"
      class="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300"
      @click="handleLogout"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-6 h-6"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.72 10.29a1 1 0 010 1.42l-3 3a1 1 0 01-1.42-1.42L13.59 12H6a1 1 0 110-2h7.59l-1.29-1.29a1 1 0 011.42-1.42l3 3zM20 5a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V8a3 3 0 013-3h16z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="ml-2 pr-10">Đăng xuất</span>
    </button>
    <button
      v-else
      class="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md transition duration-300"
      @click="handleLogin"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-6 h-6"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.72 10.29a1 1 0 010 1.42l-3 3a1 1 0 01-1.42-1.42L13.59 12H6a1 1 0 110-2h7.59l-1.29-1.29a1 1 0 011.42-1.42l3 3zM20 5a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V8a3 3 0 013-3h16z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="ml-2 pr-10">Đăng nhập</span>
    </button>
  </nav>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem('user')

      // Chuyển hướng về trang đăng nhập hoặc trang chính
      // Tùy thuộc vào logic chuyển hướng của bạn
      this.$router.push('/admin/login')

      // Log ra console để kiểm tra
      console.log('User logged out')
    },
    handleLogin() {
      // Chuyển hướng đến trang đăng nhập
      this.$router.push('/login')
    }
  },
  computed: {
    isLoggedIn() {
      // Kiểm tra xem localStorage có tồn tại key "user" không
      return localStorage.getItem('user') !== null
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
