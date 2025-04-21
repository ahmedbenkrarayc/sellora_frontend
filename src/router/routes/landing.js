export default [
    {
        path: '/register',
        name: 'RegisterStoreOwner',
        component: () => import('@/views/storeowner/auth/RegisterView.vue')
    },
    {
        path: '/login',
        name: 'LoginStoreOwner',
        component: () => import('@/views/storeowner/auth/LoginView.vue')
    },
    {
        path: '/store/create',
        name: 'CreateStore',
        component: () => import('@/views/storeowner/store/CreateStoreView.vue')
    }
] 