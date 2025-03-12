import { createRouter, createWebHistory } from 'vue-router';

import { api } from 'src/boot/axios';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token && to.path !== '/login' && to.path !== '/confirm-code') {
    next('/login');
  } else if (token) {
    try {
      const response = await api.get('/session', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.token === token) {
        next();
      } else {
        localStorage.removeItem('token');
        next('/login');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
