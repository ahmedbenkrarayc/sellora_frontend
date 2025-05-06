export default [
    {
        path: '/register',
        name: 'RegisterStoreOwner',
        component: () => import('@/views/storeowner/auth/RegisterView.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/login',
        name: 'LoginStoreOwner',
        component: () => import('@/views/storeowner/auth/LoginView.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/store/create',
        name: 'CreateStore',
        component: () => import('@/views/storeowner/store/CreateStoreView.vue'),
        meta: { requiresAuth: true, requiresRole: 'storeowner' }
    }
] 