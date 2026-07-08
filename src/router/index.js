import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import AdminLayout from '../admin/layouts/AdminLayout.vue'
import AdminLogin from '../admin/pages/AdminLogin.vue'
import AdminDashboard from '../admin/pages/AdminDashboard.vue'
import AdminHero from '../admin/pages/AdminHero.vue'
import AdminProducts from '../admin/pages/AdminProducts.vue'
import AdminBestSeller from '../admin/pages/AdminBestSeller.vue'
import AdminBrands from '../admin/pages/AdminBrands.vue'
import AdminTrust from '../admin/pages/AdminTrust.vue'
import AdminAbout from '../admin/pages/AdminAbout.vue'
import AdminWhyShop from '../admin/pages/AdminWhyShop.vue'
import AdminTestimonials from '../admin/pages/AdminTestimonials.vue'
import AdminFaq from '../admin/pages/AdminFaq.vue'
import AdminLocation from '../admin/pages/AdminLocation.vue'
import AdminFooter from '../admin/pages/AdminFooter.vue'

const ADMIN_AUTH_KEY = 'minomi-admin-auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin,
    meta: { title: 'Login Admin' },
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'admin-dashboard', component: AdminDashboard, meta: { title: 'Dashboard' } },
      { path: 'hero', name: 'admin-hero', component: AdminHero, meta: { title: 'Hero Section' } },
      { path: 'products', name: 'admin-products', component: AdminProducts, meta: { title: 'Produk Andalan' } },
      { path: 'best-seller', name: 'admin-best-seller', component: AdminBestSeller, meta: { title: 'Best Seller' } },
      { path: 'brands', name: 'admin-brands', component: AdminBrands, meta: { title: 'Brand' } },
      { path: 'trust', name: 'admin-trust', component: AdminTrust, meta: { title: 'Trust Section' } },
      { path: 'about', name: 'admin-about', component: AdminAbout, meta: { title: 'Tentang Toko' } },
      { path: 'why-shop', name: 'admin-why-shop', component: AdminWhyShop, meta: { title: 'Alasan Pelanggan' } },
      { path: 'testimonials', name: 'admin-testimonials', component: AdminTestimonials, meta: { title: 'Testimoni' } },
      { path: 'faq', name: 'admin-faq', component: AdminFaq, meta: { title: 'FAQ' } },
      { path: 'location', name: 'admin-location', component: AdminLocation, meta: { title: 'Lokasi & Kontak' } },
      { path: 'footer', name: 'admin-footer', component: AdminFooter, meta: { title: 'Footer' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const isLoggedIn = window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'admin-login' && isLoggedIn) {
    return { name: 'admin-dashboard' }
  }
})

export { ADMIN_AUTH_KEY }
export default router
