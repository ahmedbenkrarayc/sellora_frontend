export default [
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
                path: '/product',
                component : () => import('@/views/store/DetailsView.vue'),
            }
        ]
    },
    {
        path : '/search',
        name: 'catalogview',
        component : () => import('@/views/store/CatalogView.vue'),
    },
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
            }
        ]
    },
] 