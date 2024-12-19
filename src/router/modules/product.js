
export default [
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/layout/IndexLayout.vue'),
      children: [
        {
          path: 'list',
          name: 'productList',
          component: () => import('@/views/product/ProductList.vue')
        },
        {
          path: 'detail',
          name: 'productDetail',
          component: () => import('@/views/product/ProductDetail.vue')
        }
      ]
    }
];
