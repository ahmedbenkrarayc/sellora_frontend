export default [
    {
        path: '/storeowner',
        name: 'storeownerlayout',
        component: () => import('@/layouts/StoreOwnerLayout.vue'),
        children: [
            {
                path : 'category/create',
                component : () => import('@/views/HelloView.vue'),
            },
        ]
    }
] 