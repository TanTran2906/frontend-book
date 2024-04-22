<template>
  <div class="sach-page p-6">
    <!-- Hiển thị component Loading khi isLoading là true -->
    <Loading :isLoading="isLoading" />

    <h1 class="text-2xl font-bold mb-4">Quản lý sách</h1>

    <!-- Thanh tìm kiếm và nút thêm sách -->
    <div class="flex justify-between mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm sách..."
        class="p-2 border rounded-md"
      />
      <button
        @click="showAddBookForm"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>

    <!-- Danh sách sách -->
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th class="border p-2">Tên sách</th>
          <th class="border p-2">Hình ảnh</th>
          <th class="border p-2">Đơn giá</th>
          <th class="border p-2">Nhà xuất bản</th>
          <th class="border p-2">Số quyển</th>
          <th class="border p-2">Năm xuất bản</th>
          <th class="border p-2">Tác giả</th>
          <th class="border p-2"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in filteredBooks" :key="book._id">
          <td class="border p-2">{{ book.TenSach }}</td>
          <td class="border p-2 w-36 h-36"><img :src="book.HinhAnh" /></td>

          <td class="border p-2">{{ book.DonGia }}</td>

          <td class="border p-2">{{ book.TenNXB }}</td>
          <td class="border p-2">{{ book.SoQuyen }}</td>

          <td class="border p-2">{{ book.NamXuatBan }}</td>
          <td class="border p-2">{{ book.TacGia }}</td>

          <td class="border p-2">
            <!-- Nút chỉnh sửa và xóa -->
            <div class="flex justify-center">
              <!-- Nút chỉnh sửa -->
              <button
                @click="editBook(book)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7-7-7 7"
                  />
                </svg>
              </button>

              <!-- Nút xóa -->
              <button
                @click="deleteBook(book._id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form thêm/sửa sách -->
    <book-form
      v-if="showBookForm"
      :book="currentBook"
      @submit="handleFormSubmit"
      @close="closeForm"
    />
  </div>
</template>

<script>
import axios from 'axios'
import BookForm from './BookForm.vue'
import Loading from '../Loading.vue'

export default {
  name: 'SachPage',
  components: {
    BookForm,
    Loading
  },
  data() {
    return {
      books: [],
      isLoading: true, // Khởi tạo isLoading là true khi component được mount
      searchQuery: '',
      showBookForm: false,
      currentBook: null
    }
  },
  computed: {
    filteredBooks() {
      // Lọc danh sách sách dựa trên truy vấn tìm kiếm
      return this.books.filter((book) =>
        book.TenSach.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    fetchBooks() {
      axios
        .get('http://localhost:3000/api/sach/')
        .then((response) => {
          console.log('Danh sách sách:', response.data)
          this.books = response.data
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi:', error)
        })
        .finally(() => {
          // Sau khi dữ liệu được tải xong, isLoading sẽ được đặt lại là false
          this.isLoading = false
        })
    },
    showAddBookForm() {
      // Hiển thị form để thêm sách mới
      this.showBookForm = true
      this.currentBook = null
    },
    editBook(book) {
      // Hiển thị form để chỉnh sửa sách
      this.showBookForm = true
      this.currentBook = { ...book }
    },
    deleteBook(bookId) {
      // Xóa sách khỏi danh sách và từ API
      if (confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
        axios
          .delete(`/api/books/${bookId}`)
          .then(() => {
            this.books = this.books.filter((b) => b.id !== bookId)
          })
          .catch((error) => {
            console.error('Error deleting book:', error)
          })
      }
    },
    handleFormSubmit(book) {
      // Xử lý thêm hoặc chỉnh sửa sách
      if (book.id) {
        // Chỉnh sửa sách
        axios
          .put(`/api/books/${book.id}`, book)
          .then((response) => {
            const index = this.books.findIndex((b) => b.id === book.id)
            this.books.splice(index, 1, response.data)
            this.closeForm()
          })
          .catch((error) => {
            console.error('Error editing book:', error)
          })
      } else {
        // Thêm sách mới
        axios
          .post('/api/books', book)
          .then((response) => {
            this.books.push(response.data)
            this.closeForm()
          })
          .catch((error) => {
            console.error('Error adding book:', error)
          })
      }
    },
    closeForm() {
      // Đóng form thêm/sửa sách
      this.showBookForm = false
    }
  },
  mounted() {
    // Lấy danh sách sách khi component được mount
    this.fetchBooks()
    this.isLoading = false // Đặt isLoading là false sau khi dữ liệu đã được tải
  },
  watch: {
    // Watcher để lọc danh sách sách dựa trên từ khóa tìm kiếm
    searchQuery() {
      this.isLoading = true // Đặt isLoading là true khi có sự thay đổi trong từ khóa tìm kiếm
      setTimeout(() => {
        this.isLoading = false // Đặt isLoading là false sau 300ms
      }, 300)
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
