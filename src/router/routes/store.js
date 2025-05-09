export default [
    {
        path: '/register',
        component : () => import('@/views/store/RegisterView.vue'),
        meta: { requiresGuest: true },
    },
    {
        path : '/',
        name: 'storelayout',
        component : () => import('@/layouts/StoreLayout.vue'),
        children: [
            {
                path: '',
                component : () => import('@/views/store/HomeView.vue'),
            },
            {
                path: '/search',
                component : () => import('@/views/store/CatalogView.vue'),
            },
            {
                path: '/product/:id',
                component : () => import('@/views/store/DetailsView.vue'),
            },
            {
                path: '/checkout',
                component : () => import('@/views/store/CheckoutView.vue'),
                meta: { requiresAuth: true, requiresRole: 'customer' },
            },
            {
                path: '/orders',
                component : () => import('@/views/store/OrderListView.vue'),
                meta: { requiresAuth: true, requiresRole: 'customer' },
            }
        ]
    },
    // {
    //     path : '/search',
    //     name: 'catalogview',
    //     component : () => import('@/views/store/CatalogView.vue'),
    // },
    {
        path: '/storeowner',
        name: 'storeownerlayout',
        component: () => import('@/layouts/StoreOwnerLayout.vue'),
        meta: { requiresAuth: true, requiresRole: 'storeowner' },
        children: [
            {
                path : '',
                component : () => import('@/views/storeowner/DashboardView.vue'),
            },
            {
                path : 'category/create',
                component : () => import('@/views/storeowner/category/CreateCategoryView.vue'),
            },
            {
                path : 'category/list',
                component : () => import('@/views/storeowner/category/CategoryListView.vue'),
            },
            {
                path : 'category/update/:id',
                component : () => import('@/views/storeowner/category/UpdateCategoryView.vue'),
            },
            {
                path : 'subcategory/create',
                component : () => import('@/views/storeowner/subcategory/SubcategoryCreateView.vue'),
            },
            {
                path : 'subcategory/update/:id',
                component : () => import('@/views/storeowner/subcategory/SubcategoryUpdateView.vue'),
            },
            {
                path : 'subcategory/list',
                component : () => import('@/views/storeowner/subcategory/SubcategoryListView.vue'),
            },
            {
                path : 'product/create',
                component : () => import('@/views/storeowner/product/CreateProductView.vue'),
            },
            {
                path : 'product/update/:id',
                component : () => import('@/views/storeowner/product/UpdateProductView.vue'),
            },
            {
                path : 'product/list',
                component : () => import('@/views/storeowner/product/ProductListView.vue'),
            },
            {
                path : 'store/manage',
                component : () => import('@/views/storeowner/store/ManageStoreView.vue'),
            },
            {
                path : 'customer/list',
                component : () => import('@/views/storeowner/customers/CustomersView.vue'),
            },
            {
                path : 'order/list',
                component : () => import('@/views/storeowner/order/OrderListView.vue'),
            },
            {
                path : 'subscription',
                component : () => import('@/views/storeowner/SubscriptionView.vue'),
            }
        ]
    },
] 