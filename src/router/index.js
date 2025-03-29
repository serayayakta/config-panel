import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import SignIn from '../views/SignIn.vue';
import { auth } from '../services/firebase';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/signin', component: SignIn }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Navigation guard for auth
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
