<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Đăng nhập</h2>
      <input
        type="text"
        v-model="DienThoai"
        placeholder="Số điện thoại"
        pattern="[0-9]{10}"
        title="Số điện thoại phải có 10 chữ số"
        required
      />
      <span class="error-message" v-if="!isDienThoaiValid"
        >Số điện thoại phải có đúng 10 chữ số</span
      >

      <input
        type="password"
        v-model="Password"
        placeholder="Mật khẩu"
        pattern="[0-9]{6}"
        title="Mật khẩu phải có 6 chữ số"
        required
      />
      <span class="error-message" v-if="!isPasswordValid">Mật khẩu phải có đúng 6 chữ số</span>

      <button @click="login">Đăng nhập</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      DienThoai: '',
      Password: '',
      isDienThoaiValid: true,
      isPasswordValid: true,
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        if (!this.isDienThoaiValid || !this.isPasswordValid) {
          return // Không thực hiện đăng nhập nếu có lỗi nhập liệu
        }

        const response = await axios.post('http://localhost:3000/api/docgia/login', {
          DienThoai: this.DienThoai,
          Password: this.Password
        })

        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('user', JSON.stringify(response.data)) // Lưu thông tin người dùng (nếu có)

        // Xử lý kết quả trả về sau khi đăng nhập thành công
        // Đăng nhập thành công, điều hướng đến trang /admin/sach
        this.$router.push('/')

        // Sau khi lưu thông tin, bạn có thể thực hiện các hành động khác như chuyển hướng trang
      } catch (error) {
        // Xử lý lỗi nếu đăng nhập không thành công
        console.error('Đăng nhập không thành công:', error)
      }
    }
  },
  watch: {
    DienThoai(value) {
      this.isDienThoaiValid = /^[0-9]{10}$/.test(value)
    },
    Password(value) {
      this.isPasswordValid = /^[0-9]{6}$/.test(value)
    }
  }
}
</script>

<style scoped>
.login-container {
  background-image: url('/path/to/your/animated-background.gif');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Đặt vị trí tương đối để áp dụng z-index */
}

.login-form {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative; /* Đặt vị trí tương đối để áp dụng z-index */
  z-index: 1; /* Đặt z-index cho phần tử chứa form */
}

.login-form h2 {
  margin-bottom: 20px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
  position: absolute; /* Đặt vị trí tuyệt đối để áp dụng z-index */
  top: 0; /* Đặt top để đặt vị trí lỗi ở trên cùng */
  left: 50%; /* Đặt left để căn giữa */
  transform: translateX(-50%); /* Di chuyển lỗi vào giữa */
  z-index: 2; /* Đặt z-index cao hơn phần tử chứa form */
}
</style>
