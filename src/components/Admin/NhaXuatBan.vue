<template>
  <div class="publisher-page p-6">
    <!-- Hiển thị component Loading khi isLoading là true -->
    <Loading :isLoading="isLoading" />

    <h1 class="text-2xl font-bold mb-4">Quản lý nhà xuất bản</h1>

    <!-- Thanh tìm kiếm và nút thêm nhà xuất bản -->
    <div class="flex justify-between mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Tìm kiếm nhà xuất bản..."
        class="p-2 border rounded-md"
      />
      <button
        @click="showAddPublisherForm"
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

    <!-- Danh sách nhà xuất bản -->
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th class="border p-2">Tên nhà xuất bản</th>
          <th class="border p-2">Địa chỉ</th>
          <th class="border p-2"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="publisher in filteredPublishers" :key="publisher._id">
          <td class="border p-2">{{ publisher.TenNXB }}</td>
          <td class="border p-2">{{ publisher.DiaChi }}</td>

          <td class="border p-2">
            <!-- Nút chỉnh sửa và xóa -->
            <div class="flex justify-center">
              <!-- Nút chỉnh sửa -->
              <button
                @click="editPublisher(publisher)"
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
                    d="M19 9l-7-7-7 7M5 15l7 7 7-7"
                  />
                </svg>
              </button>

              <!-- Nút xóa -->
              <button
                @click="deletePublisher(publisher._id)"
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

    <!-- Cửa sổ modal -->
    <div
      v-if="showPublisherForm"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-md w-1/2 relative">
        <!-- Dấu X được di chuyển vào bên trong phần chứa của modal -->
        <button
          @click="closeForm"
          class="absolute top-10 right-10 p-2 text-gray-700 hover:text-gray-900"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <!-- Sử dụng component NhaXuatBanForm bên trong modal -->
        <nha-xuat-ban-form
          :publisher="currentPublisher || {}"
          @submit="handleFormSubmit"
          @close="closeForm"
        />
      </div>
    </div>
    <!-- Form thêm/sửa nhà xuất bản -->
    <!-- <nha-xuat-ban-form
        v-if="showPublisherForm"
        :publisher="currentPublisher || {}"
        @submit="handleFormSubmit"
        @close="closeForm"
      /> -->

    <!-- Thông báo nổi -->
    <div
      v-if="notification"
      :class="[
        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500',
        'fixed bottom-0 left-0 right-0 p-4 text-white text-center'
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NhaXuatBanForm from './NhaXuatBanForm.vue'
import Loading from '../Loading.vue'

export default {
  name: 'NhaXuatBanPage',
  components: {
    NhaXuatBanForm,
    Loading
  },
  data() {
    return {
      publishers: [],
      isLoading: true,
      searchQuery: '',
      showPublisherForm: false,
      currentPublisher: null,
      notification: null
    }
  },
  computed: {
    filteredPublishers() {
      return this.publishers.filter((publisher) =>
        publisher.TenNXB?.toLowerCase()?.includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    fetchPublishers() {
      axios
        .get('http://localhost:3000/api/nhaxuatban/')
        .then((response) => {
          this.publishers = response.data
        })
        .catch((error) => {
          console.error('Error fetching publishers:', error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    showAddPublisherForm() {
      this.showPublisherForm = true
      this.currentPublisher = null
    },
    editPublisher(publisher) {
      this.showPublisherForm = true
      this.currentPublisher = { ...publisher }
    },
    deletePublisher(publisherId) {
      if (confirm('Bạn có chắc chắn muốn xóa nhà xuất bản này không?')) {
        axios
          .delete(`http://localhost:3000/api/nhaxuatban/${publisherId}`)
          .then(() => {
            this.publishers = this.publishers.filter((p) => p._id !== publisherId)
            this.notification = { type: 'success', message: 'Xóa nhà xuất bản thành công' }
          })
          .catch((error) => {
            console.error('Error deleting publisher:', error)
            this.notification = { type: 'error', message: 'Xóa nhà xuất bản thất bại' }
          })
          .finally(() => {
            setTimeout(() => {
              this.notification = null
            }, 3000)
          })
      }
    },
    handleFormSubmit(formData) {
      if (this.currentPublisher && this.currentPublisher._id) {
        axios
          .put(`http://localhost:3000/api/nhaxuatban/${this.currentPublisher._id}`, formData)
          .then((response) => {
            const index = this.publishers.findIndex((p) => p._id === this.currentPublisher._id)
            this.publishers.splice(index, 1, response.data)
            this.fetchPublishers()
            this.closeForm()
            this.notification = { type: 'success', message: 'Cập nhật nhà xuất bản thành công' }
          })
          .catch((error) => {
            console.error('Error editing publisher:', error)
          })
          .finally(() => {
            setTimeout(() => {
              this.notification = null
            }, 3000)
          })
      } else {
        axios
          .post('http://localhost:3000/api/nhaxuatban/', formData)
          .then((response) => {
            this.publishers.push(response.data)
            this.fetchPublishers()
            this.closeForm()
            this.notification = { type: 'success', message: 'Thêm nhà xuất bản thành công' }
          })
          .finally(() => {
            setTimeout(() => {
              this.notification = null
            }, 3000)
          })
      }
    },
    closeForm() {
      this.showPublisherForm = false
    }
  },
  mounted() {
    this.fetchPublishers()
    this.isLoading = false
  },
  watch: {
    searchQuery() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
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
