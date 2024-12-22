
export default [
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/layout/IndexLayout.vue'),
      children: [
        {
          path: 'list',
          name: 'productList',
          meta: {
            title: '商品列表' // 页面标题
          },
          component: () => import('@/views/product/ProductList.vue')
        },
        {
          path: 'detail',
          name: 'productDetail',
          meta: {
            title: '商品详情' // 页面标题
          },
          component: () => import('@/views/product/ProductDetail.vue')
        }
      ]
    }
];
