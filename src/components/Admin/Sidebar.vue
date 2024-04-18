<template>
  <div class="h-full w-64 bg-gray-800 text-white fixed top-0 left-0 shadow-md flex flex-col">
    <!-- Sidebar content -->
    <div class="flex flex-col py-4 px-6 h-full">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-8">
        <img
          src="/img/icons/android-chrome-192x192.png"
          alt="Logo"
          class="w-14 h-14 rounded-full"
        />
      </div>

      <!-- Navigation links -->
      <ul class="flex flex-col flex-grow space-y-4">
        <!-- Link to Books -->
        <li>
          <router-link
            to="/admin/sach"
            class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:no-underline text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 mr-2"
              fill="currentColor"
            >
              <path
                d="M6 4a2 2 0 014-2h4a2 2 0 014 2h2v16h-2a2 2 0 01-2-2H8a2 2 0 01-2 2H4V4h2zm1 2h10v14H7V6z"
              />
            </svg>
            <span>Sách</span>
          </router-link>
        </li>

        <!-- Link to Publishers -->
        <li>
          <router-link
            to="/admin/nhaxuatban"
            class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:no-underline text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 mr-2"
              fill="currentColor"
            >
              <path d="M19 3h-4v2h3v16h-3v2h4V3zm-10 3v16H5V5h4zm5 0v16h-3V5h3z" />
            </svg>
            <span>Nhà Xuất Bản</span>
          </router-link>
        </li>

        <!-- Link to Borrow Records -->
        <li>
          <router-link
            to="/borrow-records"
            class="flex items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:hover:no-underline text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-6 h-6 mr-2"
              fill="currentColor"
            >
              <path
                d="M4 4v2H2V4h2zm3 0h3v2H7V4zm6 0h5v2h-5V4zm-6 3h3v2H7V7zm9 0h3v2h-3V7zM7 9v4H4V9h3zm9 0h3v4h-3V9zm-3 3h2v3h-2v-3zm-3 0v3H8v-3h2zm-2 3H5v3h2v-3zm9 0h2v3h-2v-3zm-3 0h2v3h-2v-3zm-6 3H5v3h2v-3zm9 0h3v3h-3v-3zm-3 0v3H9v-3h2z"
              />
            </svg>
            <span>Đơn Mượn Sách</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
/* Sử dụng font chữ cho toàn bộ component */
* {
  font-family: 'Open Sans', sans-serif;
}

.router-link-active {
  background-color: #4b5563;
  color: white;
}

.router-link-active svg {
  fill: white; /* Màu trắng cho biểu tượng đường dẫn đang được chọn */
}
</style>
