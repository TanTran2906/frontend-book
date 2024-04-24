<template>
  <AppHeaderLayout>
    <div class="home-page p-6">
      <!-- Thanh tìm kiếm -->
      <div class="flex items-center justify-center mb-8 search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Tìm kiếm sách..."
          class="p-2 border border-gray-300 rounded-md w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:border-blue-500"
        />
        <button
          class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Tìm kiếm
        </button>
      </div>

      <!-- Hiển thị component Loading khi isLoading là true -->
      <Loading :isLoading="isLoading" />

      <!-- Danh sách sách -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(book, index) in filteredBooks"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden col-span-1 md:col-span-2 lg:col-span-1"
        >
          <img :src="book.HinhAnh" class="w-full h-64 object-cover rounded-t-lg" alt="Book cover" />
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ book.TenSach }}</h2>
            <p class="text-sm text-gray-600">Tác giả: {{ book.TacGia }}</p>
            <p class="text-sm text-gray-600">Đơn giá: {{ book.DonGia }}</p>
            <p class="text-sm text-gray-600">Năm xuất bản: {{ book.NamXuatBan }}</p>
            <p class="text-sm text-gray-600">Số quyển: {{ book.SoQuyen }}</p>
            <p class="text-sm text-gray-600">Nhà xuất bản: {{ book.TenNXB }}</p>
            <!-- Các thông tin khác của sách -->
          </div>
        </div>
      </div>
    </div>
  </AppHeaderLayout>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading.vue'
import AppHeaderLayout from '../layouts/AppHeaderLayout.vue'

export default {
  name: 'HomePage',
  components: {
    Loading,
    AppHeaderLayout
  },
  data() {
    return {
      books: [],
      isLoading: true,
      searchQuery: ''
    }
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) =>
        book.TenSach?.toLowerCase()?.includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    fetchBooks() {
      axios
        .get('http://localhost:3000/api/sach/')
        .then((response) => {
          this.books = response.data
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi:', error)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  mounted() {
    this.fetchBooks()
  }
}
</script>

<style scoped>
/* Chỉ định kích thước tối thiểu cho home-page */
.home-page {
  min-height: calc(100vh - 64px); /* 64px là chiều cao của AppHeader */
}

/* Đảm bảo thanh tìm kiếm luôn được căng ra toàn bộ */
.search-bar {
  width: 100%;
  max-width: 600px; /* Đặt giá trị tối đa cho thanh tìm kiếm */
}
</style>
