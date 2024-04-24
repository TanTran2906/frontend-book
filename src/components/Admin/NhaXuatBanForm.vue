<template>
  <div class="publisher-form bg-white p-6 rounded shadow-md max-h-screen overflow-y-auto">
    <!-- Tiêu đề form -->
    <h2 class="text-xl font-bold mb-4">
      {{ isEditing ? 'Chỉnh sửa nhà xuất bản' : 'Thêm nhà xuất bản mới' }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Tên nhà xuất bản -->
      <div>
        <label for="name" class="block font-semibold mb-2">Tên nhà xuất bản:</label>
        <input
          type="text"
          id="name"
          v-model="form.TenNXB"
          placeholder="Nhập tên nhà xuất bản"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>

      <!-- Địa chỉ -->
      <div>
        <label for="address" class="block font-semibold mb-2">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          v-model="form.DiaChi"
          placeholder="Nhập địa chỉ"
          class="w-full p-2 border rounded-md"
          required
        />
      </div>

      <!-- Nút submit -->
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Lưu thay đổi' : 'Thêm nhà xuất bản' }}
        </button>
        <button @click="handleCancel" type="button" class="btn btn-secondary ml-4">Hủy</button>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'NhaXuatBanForm',
  props: {
    publisher: {
      type: Object,
      default: () => ({
        TenNXB: '',
        DiaChi: ''
      })
    }
  },
  data() {
    return {
      form: {
        TenNXB: this.publisher.TenNXB,
        DiaChi: this.publisher.DiaChi
      }
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.publisher && this.publisher._id)
    }
  },
  methods: {
    // Phương thức để submit thông tin nhà xuất bản
    handleSubmit() {
      // Tạo một đối tượng JavaScript chứa dữ liệu nhà xuất bản
      const publisherData = {
        TenNXB: this.form.TenNXB,
        DiaChi: this.form.DiaChi
      }

      // Emit sự kiện submit với dữ liệu nhà xuất bản dưới dạng JSON
      this.$emit('submit', publisherData)
    },
    handleCancel() {
      this.$emit('close')
    }
  }
}
</script>
