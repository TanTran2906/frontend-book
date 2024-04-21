<template>
  <div class="sach-page p-6">
    <h1 class="text-2xl font-bold mb-4">Quản lý sách</h1>

    <!-- Thanh tìm kiếm và nút thêm sách -->
    <div class="flex justify-between mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm sách..."
        class="p-2 border rounded-md"
      />
      <button @click="showAddBookForm" class="btn btn-primary">Thêm sách</button>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book.id">
          <td class="border p-2">{{ book.title }}</td>
          <td class="border p-2">{{ book.author }}</td>
          <td class="border p-2">{{ book.publisher }}</td>
          <td class="border p-2">{{ book.genre }}</td>
          <td class="border p-2">{{ book.year }}</td>
          <td class="border p-2">
            <!-- Nút chỉnh sửa và xóa -->
            <button @click="editBook(book)" class="btn btn-secondary mr-2">Sửa</button>
            <button @click="deleteBook(book.id)" class="btn btn-danger">Xóa</button>
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

export default {
  name: 'SachPage',
  components: {
    BookForm
  },
  data() {
    return {
      books: [],
      searchQuery: '',
      showBookForm: false,
      currentBook: null
    }
  },
  //   computed: {
  //     filteredBooks() {
  //       // Lọc danh sách sách dựa trên truy vấn tìm kiếm
  //       return this.books.filter((book) =>
  //         book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
  //       )
  //     }
  //   },
  methods: {
    // fetchBooks() {
    //   // Lấy danh sách sách từ API
    //   axios
    //     .get('/api/books')
    //     .then((response) => {
    //       this.books = response.data
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching books:', error)
    //     })
    // },
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
  }
  //   mounted() {
  //     // Lấy danh sách sách khi component được mount
  //     this.fetchBooks()
  //   }
}
</script>

<style>
/* Áp dụng font chữ Open Sans cho toàn bộ component */
* {
  font-family: 'Open Sans', sans-serif;
}
</style>
