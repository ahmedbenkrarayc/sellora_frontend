export default [
    {
        path: '/storeowner',
        name: 'storeownerlayout',
        component: () => import('@/layouts/StoreOwnerLayout.vue'),
        children: [
            {
                path : 'category/create',
                component : () => import('@/views/storeowner/category/CreateCategoryView.vue'),
            },
            {
                path : 'category/list',
                component : () => import('@/views/storeowner/category/CategoryListView.vue'),
            },
        ]
    }
] 