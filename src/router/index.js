import { createRouter, createWebHistory } from 'vue-router'

import SachPage from '@/components/Admin/Sach.vue';
import About from "@/views/AboutView.vue";

const routes = [
  {
    path: "/admin/sach",
    component: SachPage,
  },

  {
    path: "/admin/nhaxuatban",
    component: About,
  },
  // Thêm tuyến đường mặc định ở đây
  {
    path: "/",
    redirect: "/admin/sach" // Chuyển hướng đến "/admin/sach" nếu không có đường dẫn nào được chỉ định
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

