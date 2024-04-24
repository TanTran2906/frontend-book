import { createRouter, createWebHistory } from 'vue-router'

import SachPage from '@/components/Admin/Sach.vue';
import NhaXuatBanPage from '@/components/Admin/NhaXuatBan.vue'
import LoginAdmin from '@/components/Admin/LoginAdmin.vue'
import HomePage from '@/views/HomeView.vue'
import AppHeaderLayout from '@/layouts/AppHeaderLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { layout: AppHeaderLayout } // Chỉ định layout 'sidebar-only' cho trang HomePage
  },
  {
    path: "/admin/sach",
    component: SachPage,
    // meta: { requiresAuth: true }
  },
  {
    path: "/admin/login",
    name: 'login',
    component: LoginAdmin,
  },

  {
    path: "/admin/nhaxuatban",
    component: NhaXuatBanPage,
    // meta: { requiresAuth: true }

  },
  // Thêm tuyến đường mặc định ở đây
  {
    path: "/admin",
    redirect: "/admin/sach" // Chuyển hướng đến "/admin/sach" nếu không có đường dẫn nào được chỉ định
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// // Hook beforeEach để xác thực trước mỗi lần chuyển route
// router.beforeEach((to, from, next) => {
//   // Kiểm tra nếu đường dẫn hiện tại là trang đăng nhập
//   if (to.path === '/admin/login') {
//     next(); // Cho phép router tiếp tục điều hướng theo đường dẫn hiện tại
//   } else {
//     const isAuthenticated = localStorage.getItem('accessToken');
//     // Kiểm tra xem người dùng đã đăng nhập hay chưa
//     if (isAuthenticated) {
//       next(); // Nếu đã đăng nhập, cho phép router tiếp tục điều hướng
//     } else {
//       // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
//       next('/admin/login');
//     }
//   }
// })

export default router

