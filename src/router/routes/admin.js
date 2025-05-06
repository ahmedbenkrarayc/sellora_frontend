export default [
  {
      path: '',
      name: 'adminlayout',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresRole: 'superadmin' },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/admin/DashboardView.vue')
        },
        {
          path: 'storeowners',
          name: 'storeowners',
          component: () => import('@/views/admin/StoreOwnersView.vue')
        },
        {
          path: 'stores',
          name: 'stores',
          component: () => import('@/views/admin/StoreListView.vue')
        },
        {
          path: 'subscription/history',
          name: 'subscriptionHistory',
          component: () => import('@/views/admin/SubscriptionHistoryView.vue')
        }
      ]
  },
] 