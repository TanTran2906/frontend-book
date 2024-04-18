<template>
  <div class="book-form bg-white p-6 rounded shadow-md">
    <!-- Tiêu đề form -->
    <h2 class="text-xl font-bold mb-4">
      {{ isEditing ? 'Chỉnh sửa sách' : 'Thêm sách mới' }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Tiêu đề -->
      <div>
        <label for="title" class="block font-semibold mb-2">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Nhập tiêu đề sách"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>

      <!-- Tác giả -->
      <div>
        <label for="author" class="block font-semibold mb-2">Tác giả:</label>
        <input
          type="text"
          id="author"
          v-model="form.author"
          placeholder="Nhập tên tác giả"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>

      <!-- Nhà xuất bản -->
      <div>
        <label for="publisher" class="block font-semibold mb-2">Nhà xuất bản:</label>
        <input
          type="text"
          id="publisher"
          v-model="form.publisher"
          placeholder="Nhập tên nhà xuất bản"
          class="w-full p-2 border rounded-md"
        />
      </div>

      <!-- Thể loại -->
      <div>
        <label for="genre" class="block font-semibold mb-2">Thể loại:</label>
        <input
          type="text"
          id="genre"
          v-model="form.genre"
          placeholder="Nhập thể loại sách"
          class="w-full p-2 border rounded-md"
        />
      </div>

      <!-- Năm xuất bản -->
      <div>
        <label for="year" class="block font-semibold mb-2">Năm xuất bản:</label>
        <input
          type="number"
          id="year"
          v-model="form.year"
          placeholder="Nhập năm xuất bản"
          class="w-full p-2 border rounded-md"
          min="0"
          max="9999"
        />
      </div>

      <!-- Nút submit -->
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Lưu thay đổi' : 'Thêm sách' }}
        </button>
        <button @click="handleCancel" type="button" class="btn btn-secondary ml-4">Hủy</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BookForm',
  props: {
    book: {
      type: Object,
      default: () => ({
        title: '',
        author: '',
        publisher: '',
        genre: '',
        year: ''
      })
    }
  },
  data() {
    return {
      form: {
        title: this.book.title,
        author: this.book.author,
        publisher: this.book.publisher,
        genre: this.book.genre,
        year: this.book.year
      }
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.book && this.book.id)
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.form })
    },
    handleCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* Bạn có thể thêm phong cách CSS tùy chỉnh cho form tại đây */
</style>
