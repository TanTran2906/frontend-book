<template>
  <div>
    <input type="text" v-model="SoDienThoai" placeholder="Số điện thoại" />
    <input type="password" v-model="Password" placeholder="Mật khẩu" />
    <button @click="login">Đăng nhập</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      SoDienThoai: '',
      Password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/admin/login', {
          SoDienThoai: this.SoDienThoai,
          Password: this.Password
        })

        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data.user)) // Lưu thông tin người dùng (nếu có)

        // Xử lý kết quả trả về sau khi đăng nhập thành công
        console.log('Đăng nhập thành công:', response.data)

        // Sau khi lưu thông tin, bạn có thể thực hiện các hành động khác như chuyển hướng trang
      } catch (error) {
        // Xử lý lỗi nếu đăng nhập không thành công
        console.error('Đăng nhập không thành công:', error.response.data.message)
      }
    }
  }
}
</script>
