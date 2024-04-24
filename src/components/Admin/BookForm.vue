<template>
  <div class="book-form bg-white p-6 rounded shadow-md max-h-screen overflow-y-auto">
    <!-- Tiêu đề form -->
    <h2 class="text-xl font-bold mb-4">
      {{ isEditing ? 'Chỉnh sửa sách' : 'Thêm sách mới' }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Tiêu đề -->
      <div>
        <label for="title" class="block font-semibold mb-2">Tên sách:</label>
        <input
          type="text"
          id="title"
          v-model="form.TenSach"
          placeholder="Nhập tên sách"
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
          v-model="form.TacGia"
          placeholder="Nhập tên tác giả"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>

      <!-- Nhà xuất bản -->
      <div>
        <label for="publisher" class="block font-semibold mb-2">Nhà xuất bản:</label>
        <select id="publisher" v-model="form.MaNXB" class="w-full p-2 border rounded-md" required>
          <option value="" disabled>Chọn nhà xuất bản</option>
          <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">
            {{ publisher.TenNXB }}
          </option>
        </select>
      </div>

      <!-- Năm xuất bản -->
      <div>
        <label for="year" class="block font-semibold mb-2">Năm xuất bản:</label>
        <input
          type="number"
          id="year"
          v-model="form.NamXuatBan"
          placeholder="Nhập năm xuất bản"
          class="w-full p-2 border rounded-md"
          min="0"
          step="1"
          required
        />
      </div>

      <!-- Đơn giá -->
      <div>
        <label for="price" class="block font-semibold mb-2">Đơn giá:</label>
        <input
          type="number"
          id="price"
          v-model="form.DonGia"
          placeholder="Nhập đơn giá"
          class="w-full p-2 border rounded-md"
          min="0"
          step="1"
          required
        />
      </div>

      <!-- Số quyển -->
      <div>
        <label for="quantity" class="block font-semibold mb-2">Số quyển:</label>
        <input
          type="number"
          id="quantity"
          v-model="form.SoQuyen"
          placeholder="Nhập số quyển sách"
          class="w-full p-2 border rounded-md"
          min="0"
          step="1"
          required
        />
      </div>

      <!-- Hình ảnh -->
      <div>
        <label for="image" class="block font-semibold mb-2">Hình ảnh:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          @change="handleImageChange"
          class="w-full p-2 border rounded-md"
          required
        />
        <img
          v-if="form.HinhAnh"
          :src="form.HinhAnh"
          alt="Book Image"
          class="mt-2 w-40 rounded-md shadow-md"
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
import axios from 'axios'

export default {
  name: 'BookForm',
  props: {
    book: {
      type: Object,
      default: () => ({
        TenSach: '',
        TacGia: '',
        MaNXB: null,
        NamXuatBan: '',
        DonGia: '',
        SoQuyen: '',
        HinhAnh: ''
      })
    }
  },
  data() {
    return {
      form: {
        TenSach: this.book.TenSach,
        TacGia: this.book.TacGia,
        MaNXB: this.book.MaNXB,
        NamXuatBan: this.book.NamXuatBan,
        DonGia: this.book.DonGia,
        SoQuyen: this.book.SoQuyen,
        HinhAnh: this.book.HinhAnh
      },
      imageFile: null,
      publishers: [] // Danh sách nhà xuất bản
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.book && this.book._id)
    }
  },
  methods: {
    // Phương thức để submit thông tin sách sau khi hình ảnh đã được tải lên (nếu có)
    handleSubmit() {
      // Tạo một đối tượng JavaScript chứa dữ liệu sách
      const bookData = {
        TenSach: this.form.TenSach,
        TacGia: this.form.TacGia,
        MaNXB: this.form.MaNXB,
        NamXuatBan: this.form.NamXuatBan,
        DonGia: this.form.DonGia,
        SoQuyen: this.form.SoQuyen,
        HinhAnh: this.form.HinhAnh
      }

      // Emit sự kiện submit với dữ liệu sách dưới dạng JSON
      this.$emit('submit', bookData)
    },
    handleCancel() {
      this.$emit('close')
    },
    // Phương thức để gửi hình ảnh lên server
    async uploadImageToServer() {
      const formData = new FormData()
      formData.append('img', this.imageFile) // Gửi hình ảnh lên server

      try {
        const response = await axios.post('http://localhost:3000/upload', formData)
        // Lưu đường dẫn hình ảnh trả về vào biến form.HinhAnh
        this.form.HinhAnh = response.data.path
      } catch (error) {
        console.error('Đã xảy ra lỗi khi tải lên hình ảnh:', error)
      }
    },

    // Phương thức xử lý sự kiện khi hình ảnh được thay đổi
    handleImageChange(event) {
      this.imageFile = event.target.files[0] // Lưu hình ảnh được chọn vào biến imageFile
      if (this.imageFile) {
        this.uploadImageToServer() // Gửi hình ảnh lên server nếu có hình ảnh được chọn
      }
    },
    // Phương thức để lấy danh sách nhà xuất bản từ API
    fetchPublishers() {
      axios
        .get('http://localhost:3000/api/nhaxuatban/')
        .then((response) => {
          // console.log('Danh sách nhà xuất bản:', response.data)
          this.publishers = response.data
        })
        .catch((error) => {
          console.error('Đã xảy ra lỗi khi lấy danh sách nhà xuất bản:', error)
        })
    }
  },
  mounted() {
    this.fetchPublishers()
  }
}
</script>
