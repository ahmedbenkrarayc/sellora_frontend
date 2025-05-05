export default [
  {
      path: '',
      name: 'adminlayout',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'storeowners',
          name: 'storeowners',
          component: () => import('@/views/admin/StoreOwnersView.vue')
        }
      ]
  },
] 